# GraphQL API

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements 

- Node ^8
- Mongodb ([mongoose](https://github.com/Automattic/mongoose)) default port and configuration.

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

## Warning

The implementation provided in this repo is not production-ready code and it’s not secure enough to integrate in your 
application starightaway. The purpose of this code is to extend the information given in GraphQL documentation. You can read 
a lot of discussions (here or there) about using JWT, its advantages, disadvantages and different ways to store them.

Note: If you use Token Authentication in production you must ensure that your API is only available over https. And also CORS MUST be disabled (enabled here to simplify the example)
