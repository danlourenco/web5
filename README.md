# Web5 Notes

Welcome to Web5 Notes! This is a pnpm monorepo with a sample notes app made to demonstrate some of the basic capabilities of the Web5 JS SDK.

![CleanShot 2023-08-09 at 22 14 36@2x](https://github.com/danlourenco/web5/assets/1965272/519a873b-ea6e-4648-85cc-5ffd8efcfcdd)

## Prerequisites

Before you begin, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 20.0 or later)
- [pnpm](https://pnpm.io/) (version 7.29.1 or later)

## Installation

To install `pnpm` globally on your local machine, follow these steps:

1. Open a terminal or command prompt.
2. Run the following command:

```shell
npm install -g pnpm
```

3. Wait for the installation process to complete.

> Note: If you already have `pnpm` installed globally, you can skip this step.

## Getting Started

To get started with the monorepo and run the available scripts, follow these instructions:

1. Clone the repository:

```shell
git clone https://github.com/danlourenco/web5.git
```

2. Navigate to the project directory:

```shell
cd web5
```

3. Install project dependencies using `pnpm`:

```shell
pnpm install
```

4. Once the installation is complete, you are ready to run the available scripts.

## Scripts

The following scripts are available for running specific tasks within the monorepo:

- `pnpm notes:dev`: Runs the React web5-notes application in development mode

- `pnpm notes:test`: Runs the unit/component tests via Vitest

- `pnpm notes:journey`: Runs the Playwright user journey tests

- `pnpm docs:start`: Runs a local development server for Docusaurus docs
