import { ActionIcon, Combobox, ScrollArea, Stack, Text, TextInput, Tooltip, useCombobox } from "@mantine/core";
import { useChatContext } from "../ChatContext";
import { IconArrowRight } from "@tabler/icons-react"
import { useState } from "react";
import { Message, MessageTemplate } from "../types/message";
import { CommandResult, CommandsList } from "./commands";
import { AutocompleteSuggestions } from "./autocomplete";

// TODO
const agentMessages = [
    "Hello world",
    "Predetermined placeholder message",
    "sudo make me a sandwich",
    "meow",
    "How may I help you today?",
    "Thank you for your input.",
    "This message has been pre-written by Deniz."
];
// Creates a Message sent by the chat agent for demonstration purposes
const createReply = (): Message => ({
    sender: "agent",
    content: agentMessages[Math.floor(Math.random() * agentMessages.length)]
});

export const ChatInput = () => {
    const [content, setContent] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const { addMessage } = useChatContext();
    const combobox = useCombobox();

    let result: CommandResult = {};
    let autocompleteContent = content;
    let submitAutocomplete: (value: string) => void = () => {};
    let autocompleteMode: "startsWith" | "includes" = "includes";

    if (content.startsWith("/")) {
        if(content.includes(" ")) {
            let [prefix, ...args] = content.split(" ");
            let commandName = prefix.slice(1);

            let command = CommandsList.find(c => c.name == commandName);

            if(command) {
                try {
                    result = command.run(args);
                } catch(e: any) {
                    result = { error: (e as Error).message };
                }
            } else {
                result.error = `Command not found: ${commandName}`;
            }

            autocompleteContent = args.join(" ");
            submitAutocomplete = (value: string) => {
                sendMessage(value);
            };
        } else {
            autocompleteContent = content.slice(1);
            result.autocomplete = CommandsList.map(command => ({
                label: command.name,
                value: command.name,
            }));
            submitAutocomplete = (value: string) => {
                setContent("/" + value + " ");
            };
        }
    } else {
        autocompleteContent = content.slice(0, cursorPosition);
        result.autocomplete = AutocompleteSuggestions;
        autocompleteMode = "startsWith";
        submitAutocomplete = (value: string) => {
            // TODO TODO TODO
            setContent(content.slice(cursorPosition) + value);
        };
    }

    const sendMessage = (messageContent?: string) => {
        if(!content) return;

        let message: MessageTemplate = result.messageToSend || {
            content: messageContent || content,
            attachments: [],
        };

        addMessage({ ...message, sender: "user" });
        setContent("");

        // TODO: remove when out of demo
        setTimeout(() => addMessage(createReply()), 200);
    };

    let filteredOptions = (result.autocomplete || [])
        .filter(({ value }) => value.toLowerCase()[autocompleteMode](autocompleteContent.toLowerCase()));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={submitAutocomplete}
        >
            <Combobox.Dropdown hidden={false && !!content && !result.preview && !filteredOptions.length && !result.error}>
                <Stack w="100%" gap={0}>
                    <Stack align="center">
                        {result.preview}
                    </Stack>
                    <Text c="red">
                        {result.error}
                    </Text>
                    <Text c="cyan">
                        {cursorPosition}
                    </Text>
                    <Text c="green">
                        {autocompleteContent}
                    </Text>
                </Stack>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll" offsetScrollbars="y">
                        {filteredOptions.map((option, i) => (
                            <Combobox.Option value={option.value} key={i}>
                                {option.label}
                            </Combobox.Option>
                        ))}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>

            <Combobox.Target>
                <TextInput
                    placeholder="Send a message..."
                    size="lg"
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter" && !filteredOptions.length) sendMessage();
                    }}
                    onKeyUp={(e) => {
                        if (e.currentTarget.selectionStart !== null) setCursorPosition(e.currentTarget.selectionStart);
                    }}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={(
                        <Tooltip label="Send">
                            <ActionIcon
                                onClick={() => sendMessage()}
                                variant="light"
                            >
                                <IconArrowRight />
                            </ActionIcon>
                        </Tooltip>
                    )}
                />
            </Combobox.Target>
        </Combobox>
    )
};
