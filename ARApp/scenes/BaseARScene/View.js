import React, { useState } from 'react';
import { 
    ViroARScene,
    ViroText,
    ViroConstants
} from 'react-viro';

let timeout = null;

const View = props => {
    const [ text, setText ] = useState();

    const onTrackingUpdated = (state, reason) => {
        if (state == ViroConstants.TRACKING_NORMAL && text == null){
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            
            setText('Hello AR');
        } else if (state == ViroConstants.TRACKING_NONE && !timeout){
            timeout = setTimeout(() => setText(null), 300);
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated} >
            <ViroText 
                text={text || 'Tracking'}
                scale={[.5, .5, .5]} 
                position={[0, 0, -1]} 
            />
        </ViroARScene>
    );
};

export default View;