export interface AutocompleteItem {
    value: string;
};

export interface AutocompleteInsertion extends AutocompleteItem {
    position: number;
    length: number;
    value: string;
    sendAsMessage?: boolean;
}

/**
 * Compare two strings and see how many characters are the same from the beginning of the string
 * 
 * **Example:** "hello world" and "hello js" both start with the substring "hello ", so it would return 6.
 * **Example:** "hi" and "hello" would return 1.
 * **Example:** "yes" and "no" would return 0.
 * 
 * @returns The amount of characters that are equal
 */
export const equalUntil = (a: string, b: string): number => {
    for(let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i] !== b[i])
            return i;
    }

    return Math.min(a.length, b.length);
};

export const calculateAutocompleteInsertions = (
    items: AutocompleteItem[],
    content: string,
    cursor: number,
    transform: (x: string) => string = (x) => x,
) => {
    let insertions: AutocompleteInsertion[] = [];

    for(let i = 0; i < content.length; i++) {
        let text = content.slice(i, cursor);

        for(let item of items) {
            let eq = equalUntil(transform(text), transform(item.value));
            
            if(eq > 1 && (eq + i) == cursor) {
                insertions.push({
                    position: i,
                    length: eq,
                    value: item.value,
                });
            }
        }

    }

    return insertions.filter(x => x.position <= cursor)
        .filter(x => !content.slice(0, cursor).endsWith(x.value));
}

export const insertAutocomplete = (
    content: string,
    insertion: AutocompleteInsertion
) => {
    let before = content.slice(0, insertion.position);
    let after = content.slice(insertion.position + insertion.length);

    return before + insertion.value + after;
}

export const AutocompleteSuggestions: AutocompleteItem[] = [
    "Hello world",
    "Looks good to me",
    "Thank you",
    "Have a nice day",
    "I dont know",
    "Good morning",
    "Good night",
    "Rest well",
    "My condolences",
    "See you later",
    "Take care",
    "I would like to apologize",
    "You're welcome",
    "Hi!",
    "How are you?",
    "How's it going?",
    "Happy birthday!",
    "Talk to you later",
    "I'll be right back",
    "No problem",
].map(sentence => ({ value: sentence }));
