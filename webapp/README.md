# Auctioning application - Frontend

> Subfolder: `webapp`

Made with React 16.8, Node >= 8 and `create-react-app`.

## Setup

Install `node`

```sh
$ npm i
$ npm start
```

Now the webapp should be up and running on [localhost:3000](http://localhost:3000/) and should be able to connect if you have set it up yet, if not, go set that up.

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

## Usual development setup to run the webapp

Remember to do the usual git stuff at the start of each session, to keep you in sync with the `master` branch on GitLab. By using the command `npm i` you can install packages the project needs (defined in `package.json`).

In the `webapp` folder:

```sh
$ npm start
```

## Git

### Committing

To fix the codestyle before committing the code, run the following:

```sh
$ npm run prettier
```

and check that your console is free off warnings (e.g. unused variables).

### General process

1. `git status`. Check that you're committing what you think you are committing (through IDE or with `git diff` or something)
2. `git add .`, or `git add example-file.py`, or `git add -A`
3. `git status`
4. `git commit -m "#4 a very good commit message"`
5. `git push`
6. Get conflict, try to fix but lie down and cry. You can avoid this step by working on
   your own branch :)

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
