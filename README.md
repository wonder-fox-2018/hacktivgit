# HacktivGit
Hacktiv8 challenge Phase 2 Week 1 Day 3

# API Documentation
List of Routes:   

Route                            | HTTP | Description                                                       | Input
---------------------------------|------|-------------------------------------------------------------------|--------
/repos/                          | GET  | List all repositories                                             | -
/repos/starred                   | GET  | List all starred repositories                                     | -
/repos/filter                    | POST | List starred repositories with filter                             | (one of the list's object keys): (desired value)
/repos/searchByName/:name/:owner | GET  | List all repositories with keyword = :name that's owned by :owner | -
/repos/                          | POST | Create a new repository                                           | name: (repository name), description: (description)
/repos/:username                 | GET  | List all repositories of user with username = :username           | -
/repos/star/:owner/:repo         | GET  | Star a repository of :owner that's named :repo                    | -
/repos/unstar/:owner/:repo       | GET  | Unstar a repository of :owner that's named :repo                  | -
/users/login                     | GET  | Login with GitHub                                                 | query.code: code from GitHub (it'll be used to ask for an access token)

# Usage
With npm:
```  
npm install
npm start (node) / npm run dev (nodemon)
``` 
##### Access HacktivGit via http://localhost:3000