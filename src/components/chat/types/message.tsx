export type Attachment = {
    type: "image";
    url: string;
};

export type MessageAuthor = "user" | "agent";

export interface MessageTemplate {
    content: string;
    attachments?: Attachment[];
};

export interface Message extends MessageTemplate {
    sender: MessageAuthor;
};
