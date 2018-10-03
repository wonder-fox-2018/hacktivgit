# HacktivGit
Hacktiv8 challenge Phase 2 Week 1 Day 3

# API Documentation
List of Routes:   

Route                            | HTTP | Description                                                       | Input
---------------------------------|------|-------------------------------------------------------------------|--------
/repos/                          | GET  | List all repositories                                             | headers: access_token
/repos/starred                   | GET  | List all starred repositories                                     | headers: access_token
/repos/filter                    | POST | List starred repositories with filter                             | headers: access_token, body: { (one of the list's object keys): (desired value) }
/repos/searchByName/:name/:owner | GET  | List all repositories with keyword = :name that's owned by :owner | headers: access_token
/repos/                          | POST | Create a new repository                                           | headers: access_token, body: { name: (repository name), description: (description) }
/repos/:username                 | GET  | List all repositories of user with username = :username           | -
/repos/star/:owner/:repo         | GET  | Star a repository of :owner that's named :repo                    | headers: access_token
/repos/unstar/:owner/:repo       | GET  | Unstar a repository of :owner that's named :repo                  | headers: access_token

# Usage
With npm:
```  
npm install
npm start (node) / npm run dev (nodemon)
```
To get the **access_token**, please open this site:  
https://github.com/login/oauth/authorize?client_id=876f765966df86b22f36&scope=user,repo  

##### Access HacktivGit via http://localhost:3000