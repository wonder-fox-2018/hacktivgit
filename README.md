# HacktivGit
Hacktiv8 challenge Phase 2 Week 1 Day 3

# API Documentation
List of Routes:   

Route                            | HTTP | Description                                                       | Input
---------------------------------|------|-------------------------------------------------------------------|--------
/repos/                          | GET  | List all repositories                                             | headers: access_token
/repos/starred                   | GET  | List all starred repositories                                     | headers: access_token
/repos/filter                    | POST | List starred repositories with filter                             | headers: access_token, (one of the list's object keys): (desired value)
/repos/searchByName/:name/:owner | GET  | List all repositories with keyword = :name that's owned by :owner | headers: access_token
/repos/                          | POST | Create a new repository                                           | headers: access_token, name: (repository name), description: (description)
/repos/:username                 | GET  | List all repositories of user with username = :username           | -
/repos/star/:owner/:repo         | GET  | Star a repository of :owner that's named :repo                    | headers: access_token
/repos/unstar/:owner/:repo       | GET  | Unstar a repository of :owner that's named :repo                  | headers: access_token
/users/login                     | GET  | Login with GitHub                                                 | query.code: code from GitHub (it'll be used to ask for an access token)

# Usage
With npm:
```  
npm install
npm start (node) / npm run dev (nodemon)
``` 
##### Access HacktivGit via http://localhost:3000