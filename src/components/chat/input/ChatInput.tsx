import { ActionIcon, Combobox, ScrollArea, Stack, Text, TextInput, Tooltip, useCombobox } from "@mantine/core";
import { useChatContext } from "../ChatContext";
import { IconArrowRight } from "@tabler/icons-react"
import { useState } from "react";
import { Message, MessageTemplate } from "../types/message";
import { CommandResult, CommandsList } from "./commands";
import { AutocompleteSuggestions, calculateAutocompleteInsertions, insertAutocomplete } from "./autocomplete";

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
    const { addMessage } = useChatContext();

    return (
        <ChatInputInner
            sendMessage={(template) => {
                if(!template.content) return;

                addMessage({ ...template, sender: "user" });

                // TODO: remove when out of demo
                setTimeout(() => addMessage(createReply()), 200);
            }}

            getValues={({ content, cursorPosition }) => {
                let beforeCursor = content.slice(0, cursorPosition);

                if(beforeCursor[0] == "/") {
                    if(beforeCursor.includes(" ")) {
                        let [prefix, ...args] = content.split(" ");
                        let commandName = prefix.slice(1);
            
                        let command = CommandsList.find(c => c.name == commandName);
            
                        if(command) {
                            try {
                                return command.run(args);
                            } catch(e: any) {
                                return { errorMessage: (e as Error).message };
                            }
                        } else {
                            return {
                                errorMessage: `Command not found: ${commandName}`,
                            };
                        }
                    } else {
                        return {
                            autocomplete: CommandsList.map(x => x.name)
                                .filter(x => x.toLowerCase().startsWith(content.slice(1).toLowerCase()))
                                .map(value => ({
                                    value: value + " ",
                                    length: content.length-1,
                                    position: 1,
                                })),
                        };
                    }
                } else {
                    let autocomplete = calculateAutocompleteInsertions(
                        AutocompleteSuggestions,
                        content,
                        cursorPosition,
                        (x) => x.toLowerCase(),
                    );

                    return {
                        autocomplete,
                    };
                }
            }}
        />
    )
};

export const ChatInputInner = ({
    sendMessage,
    getValues,
}: {
    sendMessage?: (message: MessageTemplate) => void;
    getValues: (ctx: {
        content: string;
        cursorPosition: number;
    }) => CommandResult;
}) => {
    const [content, setContent] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const combobox = useCombobox();

    let {
        autocomplete,
        errorMessage,
        messageToSend,
        preview,
    } = getValues?.({
        content,
        cursorPosition,
    });

    // TODO: is this a good idea?
    combobox.selectFirstOption();

    const hidden = !(autocomplete || []).length && !preview && !errorMessage;

    const onSubmit = (override?: MessageTemplate) => {
        sendMessage?.(override || messageToSend || {
            content,
        });
        setCursorPosition(0);
        setContent("");
    };

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(index: string) => {
                let i = Number(index);
                let item = (autocomplete || [])[i];
                if(item.sendAsMessage) {
                    onSubmit({
                        content: item.value,
                    });
                } else {
                    setContent(insertAutocomplete(content, item));
                }
            }}
        >
            <Combobox.Dropdown hidden={hidden}>
                <Stack w="100%" gap={0}>
                    <Stack align="center">
                        {preview}
                    </Stack>
                    <Text c="red">
                        {errorMessage}
                    </Text>
                </Stack>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll" offsetScrollbars="y">
                        {(autocomplete || []).map((option, i) => (
                            <Combobox.Option value={i.toString()} key={i}>
                                {option.value}
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
                        if (e.key == "Enter" && (!autocomplete?.length || combobox.getSelectedOptionIndex() == -1)) {
                            onSubmit();
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.currentTarget.selectionStart !== null)
                            setCursorPosition(e.currentTarget.selectionStart);
                    }}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={(
                        <Tooltip label="Send">
                            <ActionIcon
                                onClick={() => onSubmit()}
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
}
