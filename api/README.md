# GraphQL API

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements 

- Use mongodb with [mongoose](https://github.com/Automattic/mongoose) for data validation.

## Install

Install the dependencies.

```sh
npm install
```

Run the server in development mode.

```sh
npm run dev
```

While in development mode; the app will listen for changes and reload automatically.

## Production

This repository uses [TypeScript](https://www.typescriptlang.org/). As such, you will need to compile it before you run the production version.

```sh
npm run compile && npm run start
```

Or alternatively, use typescript in production (this uses [ts-node](https://github.com/TypeStrong/ts-node)).

```sh
npm run start:ts
```

## Examples
  

`./examples/README.md` 
