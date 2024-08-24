import { calculateAutocompleteInsertions, insertAutocomplete } from "./autocomplete";

test("autocomplete computation", () => {
    expect(calculateAutocompleteInsertions(
        [
            { value: "hello world" },
            { value: "suspicious" },
        ],
        "sus",
        3,
    )).toBe({
        value: "suspicious",
        position: 0,
        length: 3,
    })
});

test("autocomplete insertion", () => {
    expect(insertAutocomplete("hel asdf", { position: 0, length: 3, value: "hello world" }))
        .toBe("hello world asdf")
})
