## Todo server backend
- The backend server handles various functions like creating todos, reading, editing and deleting them.
- The backend also handles creating users, logging in, managing and verifying jwt token & cookies.
- Based on whether cookie has valid jwt token the middlewares will allow the requests related to the TODOs.
- The DELETE request has additional middleware that allows only 'admin' users to delete todos.

## How to setup
- Clone the repository to your local folder.
- Add database, jwt secret etc in .env file.
- Run 'npm install' cmd to install dependencies.
- Run 'node ./server.js' cmd to start the application.