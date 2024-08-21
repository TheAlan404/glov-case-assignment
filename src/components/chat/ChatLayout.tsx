import { ScrollArea, Stack } from "@mantine/core";
import { useChatContext } from "./ChatContext";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./input/ChatInput";

export const ChatLayout = () => {
    const { messages } = useChatContext();

    return (
        <Stack justify="space-between" w="100%" h="100%" gap={0}>
            <ScrollArea offsetScrollbars>
                <Stack>
                    {messages.map((message, i) => (
                        <ChatMessage
                            message={message}
                            key={i}
                        />
                    ))}
                </Stack>
            </ScrollArea>

            <Stack>
                <ChatInput />
            </Stack>
        </Stack>
    )
};
