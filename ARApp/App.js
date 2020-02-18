import React, { useState, useCallback } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import BaseARScene from './scenes/BaseARScene';
import OverlayForm from './inputs/OverlayForm';


const API_KEY = '3DB06101-0AB9-43F0-9F43-3F3CDC9F3BE8';

const App = props => {
    // const [ addPoint, setAddPointFun ] = useState();

    return (
        <>
            <ViroARSceneNavigator
                apiKey={API_KEY}
                initialScene={{ scene: BaseARScene }}
                // viroAppProps={{
                //     callback: ({series=[], setSeries=()=>null}) => setAddPointFun((params={}) => {
                //         const {x, y, z} = params;
                //         if(x != null && y != null && z != null) setSeries([...series, [x, y, z]]);
                //     })
                // }}
            />
            <OverlayForm /*addPoint={addPoint}*/ />
        </>
    );
};

export default App;