---
sidebar_position: 1
---

# Project Intro

Welcome to Web5 Notes! In these docs, you'll learn a little bit about the motivations behind this project, how to run it on your local development machine, and some of the constraints and architectural decisions made.

![Docusaurus logo](/img/web5notes.png)

## Getting Started

Let's get the project up and running!

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20 or later.
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Start the application

Run the development server from the root of this project:

```bash
cd web5-notes
pnpm run dev:notes
```

The `cd` command changes the directory you're working with. In order to work with the web5-notes project, you'll need to navigate the terminal there.

The `pnpm run dev:notes` command builds the web5-notes application locally and serves it through a development server, ready for you to view at http://localhost:5173/.
