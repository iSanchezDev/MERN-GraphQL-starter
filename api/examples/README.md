## Examples

A few examples were added to use this tool.

Open the browser at `localhost:3001/graphql`

To run GraphQL queries you need to be logged by a bearer token access.

Please, follow these steps!

## Insert a new user

```graphql

mutation AddUser (
  $email: String,
  $password: String,
  $username: String,
  $language: String
) {
 addUser(input: {
    email: $email,
    password: $password,
    username: $username,
    language: $language
 }) {
    email,
  	username,
  	language
  } 
}

<PLACE THIS JSON AT QUERY VARIABLES TAB>

{
  "email": "example@gmail.com",
  "password": "example",
  "username": "example",
  "language": "en"
}
```

## Login

```graphql
mutation LoginUser {
  loginUser(email: "example@gmail.com", password: "example")
}
```

Note: Copy the token given from the response.

Look up the bottom of Apollo web `HTTP HEADERS` tab like:

```json5
{
   "Authorization": "Bearer <_PASTE_YOUR TOKEN_>"
}
```

## Users
```graphql
query GetAllUsers {
  users {
    email,
    username
  }
}
```

## Workspace
Now you can run these queries:

```graphql
query GetWorkspaces {
  workspaces {
    name
  }
}

mutation CreateWorkspace {
  addWorkspace(input: { name: "Workspace" }) {
    name
  }
}

mutation UpdateUserWithWorkspace {
  editUser(id: "<USER_ID_HERE>", input: {
    workspaceId: "<WORKSPACE_ID_HERE>"
  }) {
    workspace {
      name
    } 
  }
}
```
