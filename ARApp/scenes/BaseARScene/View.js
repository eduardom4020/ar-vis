import React, { useState } from 'react';
import { 
    ViroARScene,
    ViroText,
    ViroConstants,
    Viro3DObject,
    ViroAmbientLight
} from 'react-viro';

import LogOBJ from '../../assets/log.obj';

let timeout = null;

const View = props => {
    const [ text, setText ] = useState();

    const onTrackingUpdated = (state, reason) => {
        if (state == ViroConstants.TRACKING_NORMAL && text == null){
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            
            setText('Find Some QR Code');
        } else if (state == ViroConstants.TRACKING_NONE && !timeout){
            timeout = setTimeout(() => setText(null), 300);
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated} >
            <ViroAmbientLight color="#FFFFFF" />
            <ViroText 
                text={text || 'Tracking'}
                scale={[.5, .5, .5]} 
                position={[0, .1, -0.6]} 
            />
            <Viro3DObject 
                source={LogOBJ}
                highAccuracyEvents={true}
                position={[-0.3, 0, -0.2]}
                scale={[.0015, .0015, .0015]}
                rotation={[90, 0, 0]}
                type='OBJ'
                // transformBehaviors={['billboard']}
                onClick={(position, source) => console.log('Bt click!')}
            />
        </ViroARScene>
    );
};

export default View;