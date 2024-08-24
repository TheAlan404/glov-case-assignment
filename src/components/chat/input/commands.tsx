import React from "react";
import { MessageTemplate } from "../types/message";
import { Image } from "@mantine/core";
import { AutocompleteInsertion } from "./autocomplete";

export interface CommandResult {
    preview?: React.ReactNode;
    messageToSend?: MessageTemplate;
    autocomplete?: AutocompleteInsertion[];
    errorMessage?: string;
};

export interface Command {
    name: string;
    description?: string;
    run: (args: string[]) => CommandResult;
};

// Utility function
const error = (errorMessage: string) => ({ errorMessage });

// TODO
const IMAGE_PROVIDER = "https://picsum.photos";
const getImageURL = (id: number) => `${IMAGE_PROVIDER}/id/${(id + 1) * 12}/200`;

export const CommandsList: Command[] = [
    {
        name: "image",
        description: "Image Display Demo",
        run: (args) => {
            if(args.length !== 1 || !args[0]) return error("Usage: /image <number>");

            let number = Number(args[0]);
            if(isNaN(number)) return error(`${args[0]} is not a number`);

            const url = getImageURL(number);

            return {
                messageToSend: {
                    content: "",
                    attachments: [
                        { type: "image", url }
                    ]
                },
                preview: (
                    <Image
                        src={url}
                        w="10em"
                        radius="sm"
                    />
                ),
            };
        },
    },
    {
        name: "select",
        description: "Combobox Selection Demo",
        run: () => {
            return {
                autocomplete: [
                    "Banana",
                    "Apple",
                    "Mango",
                    "Waffle",
                    "Tea",
                    "A bottle of water",
                ].map(word => ({
                    value: word,
                    length: 0,
                    position: 0,
                    sendAsMessage: true,
                })),
            }
        },
    },
];
