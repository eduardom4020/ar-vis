import React, { useState } from 'react';
import { 
    ViroARScene,
    ViroText,
    ViroConstants,
    Viro3DObject,
    ViroAmbientLight,
    ViroImage,
    ViroPolyline,
    ViroNode,
    ViroSphere
} from 'react-viro';

import LogOBJ from '../../assets/log.obj';
import Chart from '../../assets/chart-test.png';
console.log(Chart)
let timeout = null;

const SERIES = [ [0,0,0], [.25,.5,0], [.5,.15,0], [.75,.25,0], [1,1,0] ];

const View = props => {
    const { sceneNavigator } = props;
    const [ text, setText ] = useState();

    const onTrackingUpdated = (state, reason) => {
        if (state == ViroConstants.TRACKING_NORMAL && text == null){
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            
            setText('Chart Test!');
        } else if (state == ViroConstants.TRACKING_NONE && !timeout){
            timeout = setTimeout(() => setText(null), 300);
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated} >           
            <ViroAmbientLight color="#FFFFFF" />
            <ViroText 
                text={text || 'Loading Scene'}
                scale={[.5, .5, .5]} 
                position={[0, .15, -0.6]} 
            />
            {
                text && 
                    <ViroNode
                        position={[-0.17, -.15, -0.6]}
                        scale={[.25, .25, .25]}
                    >
                        <ViroPolyline 
                            // position={[0,0,-2]} 
                            points={SERIES} 
                            thickness={0.005} 
                            // materials='red' 
                        />
                        {
                            SERIES && SERIES.map(point => (
                                <ViroSphere
                                    heightSegmentCount={20}
                                    widthSegmentCount={20}
                                    radius={0.025}
                                    position={point}
                                />
                            ))
                        }
                    </ViroNode>
            }
            {/* <ViroImage
                height={.5}
                width={.5}
                source={Chart}
                position={[0.3, 0, -0.4]} 
            /> */}
            {/* <Viro3DObject 
                source={LogOBJ}
                highAccuracyEvents={true}
                position={[-0.3, 0, -0.2]}
                scale={[.0015, .0015, .0015]}
                rotation={[90, 0, 0]}
                type='OBJ'
                // transformBehaviors={['billboard']}
                onClick={(position, source) => console.log('Took screenshot!') || sceneNavigator.takeScreenshot('test.jpg', true)}
            /> */}
        </ViroARScene>
    );
};

export default View;