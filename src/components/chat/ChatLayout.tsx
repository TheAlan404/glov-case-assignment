import { ScrollArea, Stack } from "@mantine/core";
import { useChatContext } from "./ChatContext";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./input/ChatInput";
import { useAutoScroll } from "../../hooks/useAutoScroll";

export const ChatLayout = () => {
    const { messages } = useChatContext();
    const ref = useAutoScroll([messages]);

    return (
        <Stack justify="space-between" w="100%" h="100%" gap={0}>
            <ScrollArea offsetScrollbars viewportRef={ref}>
                <Stack align="center">
                    <Stack w={{ base: "100%", xs: "70%", sm: "100%", md: "70%", xl: "50%" }}>
                        {messages.map((message, i) => (
                            <ChatMessage
                                message={message}
                                key={i}
                            />
                        ))}
                    </Stack>
                </Stack>
            </ScrollArea>


            <Stack>
                <ChatInput />
            </Stack>
        </Stack>
    )
};
