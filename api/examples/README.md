## Examples

A few examples were added to use this tool.

Open the browser at `localhost:3001/graphql`

To run GraphQL queries you need a token access.

You must create a login to catch up this session token:

## Login

Note: *Sorry, the user should have been inserted on the interface beforehand.*

```graphql
mutation loginUser {
  loginUser(email: "example@gmail.com", password: "example")
}
```

Note: Copy the token given

Look up the bottom of Apollo web `HTTP HEADERS` label like:

```json5
{
   "Authorization": "Bearer <_PASTE_YOUR TOKEN_>"
 }
```

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
