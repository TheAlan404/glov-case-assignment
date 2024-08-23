import React, { useContext, useState } from "react";
import { Message } from "./types/message";

export interface IChatContext {
    messages: Message[];
    /// Add a message to the store
    addMessage: (msg: Message) => void;
};

export const ChatContext = React.createContext<IChatContext>({
    messages: [],
    addMessage: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }: React.PropsWithChildren) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages(m => [...m, message]);
    };

    return (
        <ChatContext.Provider value={{
            messages,
            addMessage,
        }}>
            {children}
        </ChatContext.Provider>
    )
}
