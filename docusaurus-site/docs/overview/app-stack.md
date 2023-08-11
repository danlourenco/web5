---
sidebar_position: 2
---

# Tech Stack

On this page, we'll discuss the tech stack used to build the Web5 application, as well as the reasoning behind the choices.

## React (v18.x)

I chose to opt for React on this applications for a couple of reasons:

- _Familiarity_ - I've worked with React professionally for a number of years now, and although I've detoured into Vue-land since the beginning of the year, it is a trusted tool in my toolbelt.
- _Project Needs_ - I understand that React, TypeScript, and Docusaurus are tools used by the TBD development team, and I felt it was important to demonstrate proficiency and adopt team norms, rather than chart my own path here.
- _Right-Sized_ - It's neither too lightweight or over-engineered for an application of this nature. I had originally considered opting for a React metaframework like Next.js or Remix, but given the time constraints (roughly 2 hours), I felt like it might be overkill.

It would be nice as a development exercise to make routable notes, such that I could bookmark a URL and instancely load a note in question, but that could always be a future enhancement.

## Tailwind CSS

When I first learned about Tailwind, I was skeptical. (OK, I hated it.) Of course, I hadn't even given it a shot yet, but its philosophy seemed to fly in the face of common CSS practices established before its time.

Still, I kept hearing good things about it from developers I trusted.

![Ryan Florence tweet](/img/florence.png)
Eventually, I broke down and gave it a spin. After a few days, my opinion changed.

Yes, it's ugly and clutters up your markup, but if you're building a component-based web application, any repetition is minimized, and the gains in speed outweigh the aesthetic concerns.

## Web5 SDK

The goal of this project was to learn about and explore the capability of Web5 technology, so this should not be a surprise.

## Vite

Though Vite hasn't been on the block very long compared to Webpack, it's a formidable (and preferable) alternative. The ecosystem is growing, and the unit test framework chosen, Vitest, can leverage Vite's config files to cut down on sprawling config.

## Playwright

I've opted for Playwright for user journey (aka E2E) testing. Though I've primarily used Cypress in the past, I have some recent experience with Playwright, and I have found it to be a solid tool. I like the fact that it can be used with Chromium, Firefox, or Safari (something I believe Cypress was not able to do last I checked), and the codegen feature is very compelling.
