# Case Assignment for Glov

In this assignment I have chosen [Vite](https://vitejs.dev/) as my framework because it's what I'm most familiar with and it fits this use case - a static website.

For components and styling I choose to use [Mantine](https://mantine.dev) because of a couple reasons:
- It's what I'm most familiar with. Honest.
- It's responsive and allows me to enter responsive props
- Supports CSS-in-JS styling props

## Details

- I have written some logic to scroll the message list whenever a new message is added if the user is already at the bottom. I almost used a third party library, [react-scrollable-feed](https://github.com/dizco/react-scrollable-feed), but I've reviewed its code and decided to implement it on my own when I saw that it's using class components. I've written it as a hook, `useAutoScroll`, which conveniently fills a spot in the technical requirement.
- I hope the navbar and message list view width counts as a "significant layout change" - I felt like making more radical changes would ruin UX
- I really dislike my approach to command and autocomplete handling, but this is what I could have come up with in a short timespan. I had a "catch all" approach where all three states (typing command name, in command, normal message typing) changed variables and handlers based on conditions. In the future, I would like to refactor it to have dynamic argument types and parsing/error handling based on those.

## Development

1. Clone repository
2. Install dependencies: `npm install`
3. Run vite dev: `npm run dev`

## Deployment

1. Clone repository
2. Install dependencies: `npm install`
3. Run `npm run build`
4. Serve contents of `dist/` statically

