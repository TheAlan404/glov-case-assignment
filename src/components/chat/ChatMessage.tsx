import { Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Message } from "./types/message"

export const ChatMessage = ({
    message
}: {
    message: Message;
}) => {
    return (
        <Paper
            p="sm"
            radius="sm"
            withBorder
            shadow="md"
        >
            <Stack gap={0}>
                <Text fw="bold">
                    {/* TODO: Replace with username */}
                    {message.sender == "user" ? "You" : "Chat Agent"}
                </Text>
                <Text>
                    {message.content}
                </Text>
                {!!message.attachments?.length && (
                    <SimpleGrid cols={message.attachments.length == 1 ? 1 : 2}>
                        {message.attachments.map((attachment, i) => (
                            <Image
                                key={i}
                                src={attachment.url}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
        </Paper>
    )
}