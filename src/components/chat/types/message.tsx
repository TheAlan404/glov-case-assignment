export type Attachment = {
    type: "image";
    url: string;
};

export type MessageAuthor = "user" | "agent";

export type Message = {
    sender: MessageAuthor;
    content: string;
    attachments?: Attachment[];
};
