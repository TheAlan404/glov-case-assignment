import { ActionIcon, Combobox, TextInput, Tooltip, useCombobox } from "@mantine/core";
import { useChatContext } from "../ChatContext";
import { IconArrowRight } from "@tabler/icons-react"
import { useState } from "react";
import { Message } from "../types/message";

export const ChatInput = () => {
    const [content, setContent] = useState("");
    const { addMessage } = useChatContext();
    const combobox = useCombobox();

    const sendMessage = () => {
        if(!content) return;

        let message: Message = {
            content,
            sender: "user",
            attachments: [],
        };

        addMessage(message);

        setContent("");

        // TODO
        let agentMessages = [
            "Hello world",
            "Predetermined placeholder message",
            "sudo make me a sandwich",
            "meow",
            "How may I help you today?",
            "Thank you for your input.",
            "This message has been pre-written by Deniz."
        ];
        setTimeout(() => addMessage({
            sender: "agent",
            content: agentMessages[Math.floor(Math.random() * agentMessages.length)]
        }), 200);
    };

    return (
        <Combobox
            store={combobox}
        >
            <Combobox.Target>
                <TextInput
                    placeholder="Send a message..."
                    size="lg"
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                    onSubmit={() => sendMessage()}
                    onKeyDown={(e) => {
                        if(e.key == "Enter") sendMessage();
                    }}
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
