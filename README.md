# React CapTP Experiment 1

Experimenting with doing React state management via [CapTP](https://github.com/Agoric/agoric-sdk/tree/master/packages/captp), rather than Redux or something else.

You can see the setup shared state "bootstrap" being constructed in `src/App.js`. It includes a name getter, setter, and a promise-queue to allow components to continuously subscribe to updating values (but only as it's able to, in a way that could reasonably manage back-pressure if the host were on a separate machine with higher update speed, for example).

You can see how a component consuming a CapTP object works in `src/NameComponent.js`. Just using regular hooks, this component is able to both get and set data, without having to emit an "action", but instead calling a regular promise-returning JS function, and subscribing to updates.

Since the updating is triggered from the hook now instead of the props, we may actually be side-stepping some of the core benefits of React, and so this is mostly an exepriment to see what it's like to write with these two tools together, it isn't a prescription of a new way to build apps.

For some reason, still having issues on the [demo page](https://danfinlay.github.io/react-captp-experiment/), but works if you pull it and build it locally.

In some ways this feels like a sequel to my [Caputi](https://github.com/danfinlay/caputi) module, which was experimenting with making a data model framework that would then be easy to pass to a rendering system like this one. It didn't include promise queues, though, just event emitters, so it wouldn't be as efficient at many clients as this approach would be. I really recommend reading/watching [GTOR](https://github.com/kriskowal/gtor/) to get a sense of that difference.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
