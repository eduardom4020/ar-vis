import { AppRegistry } from 'react-native';
import App from './App.js';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

// window.console.log = texts => console.warn(texts);

const ConnectedApp = (
    <Provider store={store} >
        <App />
    </Provider>
);

AppRegistry.registerComponent('ARApp', () => ConnectedApp);

// The below line is necessary for use with the TestBed App
// AppRegistry.registerComponent('ViroSample', () => App);