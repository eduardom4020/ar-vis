import React, { useRef, useCallback } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import BaseARScene from './scenes/BaseARScene';
import { RNCamera } from 'react-native-camera';

const API_KEY = '3DB06101-0AB9-43F0-9F43-3F3CDC9F3BE8';

const App = props => {
    return (
        <ViroARSceneNavigator
            apiKey={API_KEY}
            initialScene={{ scene: BaseARScene }}
        />
    );
};

export default App;