## Examples

A few examples were added to start using this tool.

Make sure you are running the browser at localhost:4000  

Here are some example queries which you can use as a starting point when using the playground.

## Insert a new user

```graphql

mutation AddUser (
  $email: String,
  $password: String,
  $firstName: String,
  $language: String
) {
 addUser(input: {
    email: $email,
    password: $password,
    firstName: $firstName,
    language: $language
 }) {
    id
  } 
}

query GetAllUsers {
  users {
    email
  }
}

PLACE AT QUERY VARIABLES TAB

{
  "email": "example@gmail.com",
  "password": "example",
  "firstName": "exam",
  "language": "en"
}
```

# Workspace

```graphql
query GetWorkspaces {
  workspaces {
    id
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

## Login
```graphql
mutation loginUser {
  loginUser(email: "example@gmail.com", password: "example")
}

query isUserLogged {
  isUserLogged(
    token: "<INSERT_YOUR_TOKEN_SESSION>"
  )
}
```
