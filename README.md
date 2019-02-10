### React + Redux + Material UI + JWT Authentication + GraphQL API (boilerplate)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## API

The API designed for GraphQL has JWT authorization implemented for users from the client app and also for Apollo Client 
web tool. You can exec queries on this tool even in your production environment. 

I have a REST service on express for login and logout users in a secure mode isolated from GraphQL.

## Client

The client allows you to connect with the GraphQL API requesting a user list and workspaces as example in how to work 
with React and GraphQL at the frontend side. 

## Features of Client and Server (WIP)

-	React application with [create-react-app](https://github.com/facebook/create-react-app)
- [Redux](https://es.redux.js.org)
- [Material Design](https://material-ui.com/) 
-	Sign Up, Sign In, Sign Out (REST isolated service using redux for react)
- API [GraphQL](https://graphql.org) with [Apollo Client](https://www.apollographql.com/docs/react/essentials/get-started.html)
-	Node.js with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) on TypeScript
-	Queries, Mutations, Subscriptions + examples
-	Entities: users and workspaces
-	Authentication powered by [JWT](https://jwt.io/) (React client)
- Protected server endpoints by middleware + Apollo interface
- WIP - React router
- WIP - fetch users and workspaces from GraphQL service

## Installation

Go to `./app` and `./api` folders and follow their READMEs files

😊👍

## Demo Gif

![apollo graphql](https://user-images.githubusercontent.com/25980900/52540450-bf042480-2d89-11e9-99b4-6535e035097b.gif)

![React Login](https://user-images.githubusercontent.com/25980900/52540451-bf9cbb00-2d89-11e9-8b2d-3392d0e2ca18.gif)
