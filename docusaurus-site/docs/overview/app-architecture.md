---
sidebar_position: 3
---

# Architecture

![Web5 App Components](/img/components.png)

Other than the top-level `<App />` component, the application is broken up into three components:

1. `<Header />`. This is an incredibly simple component that does not even take props, but it cuts down on a few lines of markup in the `<App />` component.

2. `<Pane />`. This is the area of the application in which the user will be able to preview and select their created notes.

3. `<PaneItem />`. This represents the note itself. Users will be able to see a preview of there not here. Clicking on it will select the note, and the note text will be updated into the text area on the right, and can save their updates. Clicking on the trash icon will delete the note.

## Key Files

### src/hooks/useNotes.tsx

The `useNotes` hook is responsible for:

- connecting to the Web5Agent and return a DID and Web5 Class instance.
- assigning the Web5 Class instance to a ref.

> `useRef` can be useful when working with external libraries or APIs that expect a mutable value. You can store the reference to an external library instance or any other value that needs to persist across renders. - [Harnessing the Power of useRef in React: A Guide to Efficient State Management](https://medium.com/@prashantblogs/harnessing-the-power-of-useref-in-react-a-guide-to-efficient-state-management-d1766affeaf)

- establishing Web5 CRUD functions and the handler functions that call them

### src/App.tsx

- coming soon
