# Case Assignment for Glov

A react chat application as part of an assignment.

**Note:** Here are some autocomplete phrases since I've made the threshold 2 matching characters minimum and its hard to check if the feature exists upon first glance.
- See you later
- Happy birthday!
- Hello world

The site should be live at [https://deniz.blue/glov-case-assignment](https://deniz.blue/glov-case-assignment)

## Details

- I have chosen [Vite](https://vitejs.dev/) as my framework because it's what I'm most familiar with and it fits this use case - a static website.
- For components and styling I choose to use [Mantine](https://mantine.dev) because of a couple reasons:
  - It's what I'm most familiar with. Honest.
  - It's responsive and allows me to enter responsive props
  - Supports CSS-in-JS styling props
- I have written some logic to scroll the message list whenever a new message is added if the user is already at the bottom. I almost used a third party library, [react-scrollable-feed](https://github.com/dizco/react-scrollable-feed), but I've reviewed its code and decided to implement it on my own when I saw that it's using class components. I've written it as a hook, `useAutoScroll`, which conveniently fills a spot in the technical requirement. It uses react refs to calculate if the user has already scrolled to the bottom before an update to the component tree occurs.
- I hope the navbar collapsing and message list view width counts as a "significant layout change" - I felt like making more radical changes would ruin UX
- I really dislike my approach to command and autocomplete handling, but this is what I could have come up with in a short timespan. First, I had a "catch all" approach where all three states (typing command name, in command, normal message typing) changed variables and handlers based on conditions. I've now refactored it to be dependent on a deterministic function passed into ChatInputInner. I don't know if splitting it into Inner was a good idea or not but the code is still badly structured in my opinion. Hey, atleast it's somewhat dynamic!
- The normal message autocomplete uses a lot of string manipulation and it took me some time to get it right.
- There's still a ton of improvements I want to make:
  - Additional UX features when the chat recieves a new message, for example a sound effect or a visual flash.
  - An image popup for messages with images
  - Completely rewrite the autocomplete/suggestions logic to be cleaner
  - A better command handling system

## Development

1. Clone repository
2. Install dependencies: `npm install`
3. Run vite dev: `npm run dev`

## Deployment

1. Clone repository
2. Install dependencies: `npm install`
3. Run `npm run build`
4. Serve contents of `dist/` statically


