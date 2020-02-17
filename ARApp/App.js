import React, { useRef, useCallback } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import BaseARScene from './scenes/BaseARScene';
import { RNCamera } from 'react-native-camera';

import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();


const API_KEY = '3DB06101-0AB9-43F0-9F43-3F3CDC9F3BE8';

const App = props => {
    return (
        <StoreProvider store={store} >
            <PaperProvider>
                <ViroARSceneNavigator
                    apiKey={API_KEY}
                    initialScene={{ scene: BaseARScene }}
                />
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;