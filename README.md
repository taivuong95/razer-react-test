## Simple React-Redux Project (React Version 16.8.3)

This project includes Node Sass (Be capable of using css preprocessor sass/scss ), Axios, React Router, Redux and Redux Thunk ( middleware for side-effect ).
See React Redux usage (https://redux.js.org/basics/usage-with-react) for more information.
Add Redux and React developer tools (chrome extensions) for debugging better.

## If you want to use CSS Modules

Using the extension .module.css ( change file name _.css to _.module.css )
See CSS Modules (https://github.com/css-modules/css-modules) for more information.

## If you want to use SASS (SCSS) or SASS (SCSS) Modules

Using the extension .sass (.scss) ( change file name _.css to _.sass (_.scss) )
If you want to use SASS (SCSS) Modules. Using the extension .module.sass (.module.scss) ( change file name _.sass (_.scss) to _.module.sass (\*.module.scss) )
Note: If you can't use SASS. Please `npm rebuild node-sass` or `npm install node-sass` again

## React-add-sass-support-to-create-react-app-2-0

create-react-app version 2.0 added a lot of new features. One of the new features is support for Sass, use SASS (SCSS) or SASS (SCSS) Modules.

https://egghead.io/lessons/react-add-sass-support-to-create-react-app-2-0

## Some good extensions of VSC support development conveniently

Bracket pair colorizer, Indent rainbow, Dracula Official, Gitlens, Live server, Material Icon Theme, Vscode icons, Fira Code, Rest Client.

## Detect errors and format your code in react app automatically

-Step 1 Add Eslint and Prettier extensions (only VSC)

-Step 2: Install Eslint and Prettier plugins. (`npm install --save-dev prettier eslint-plugin-prettier`)

-Step 3: Create .eslintrc file with the following contents (at root folder):
`{ "extends": "react-app", "plugins": ["prettier"], "rules": { "prettier/prettier": "error" } }`

-Step 4: Create .prettierrc file with the following contents (at root folder):
`{ "singleQuote": true, "trailingComma": "es5" }`

-Final step: add the following to your Visual Studio Code Workspace Settings:
`"editor.formatOnSave": true`
or you can create your own settings.json file by creating .vscode folder ( at root folder ) and create settings.json in the folder with the following contents:
`{ "editor.tabSize": 2, "editor.wordWrap": "on", "editor.formatOnSave": true, "files.exclude": { "**/.git": true, "**/.svn": true, "**/.hg": true, "**/CVS": true, "**/.DS_Store": true, "**/node_modules": true } }`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
