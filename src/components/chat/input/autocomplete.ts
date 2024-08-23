export interface AutocompleteItem {
    label: string;
    value: string;
};

export const AutocompleteSuggestions: AutocompleteItem[] = [
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
    "Have a nice day!",
    "No problem",
].map(sentence => ({ value: sentence, label: sentence }));
