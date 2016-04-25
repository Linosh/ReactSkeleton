Few steps before you start development:

1. Install NodeJS and Node Package Manager (node and npm)
    [Link to downloads](https://nodejs.org/en/download/)
1. Now you need to check in your terminal that everything is set 
    run `npm --version` command
    expected result is kinda
    `3.6.0`
1. Than you need to install application using
    `npm install` command
    This command will download all dependencies into project local folder **node_modules**
1. To run embedded server you need to execute next command
    `npm start`
1. Brief description of available commands (to run command use `npm run COMMAND_NAME`) :
    * **start** - start embedded server with specified configuration in `server.dev.js` file  
    * **lint** - run code style check on all `*.js *.jsx` files
    * **clean** - built files are located in _public__ folder, this command will clean _public_ forlder
    * **build** - build project into _public_ folder
    * **prod** - run server with specified configuration in `server.prod.js` file 