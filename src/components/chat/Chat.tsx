import { ChatContextProvider } from "./ChatContext";
import { ChatLayout } from "./ChatLayout";

export const Chat = () => {
    return (
        <ChatContextProvider>
            <ChatLayout />
        </ChatContextProvider>
    )
};
