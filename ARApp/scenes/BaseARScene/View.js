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
    ViroSphere,
    ViroMaterials
} from 'react-viro';

import LinePlot from '../../charts/LinePlot';

import LogOBJ from '../../assets/log.obj';
// import Chart from '../../assets/chart-test.png';
// console.log(Chart)
let timeout = null;

ViroMaterials.createMaterials({
    line: {
        shininess: 1.0,
        diffuseColor: '#429bf5'
    //   lightingModel: "Lambert",
    },
    lineDot: {
        shininess: 5.0,
        diffuseColor: '#429bf5'
    },
    axis: {
        diffuseColor: '#000000'
    }
});

const SERIES = [ [0,0,0], [.25,.5,0], [.5,.15,0], [.75,.25,0], [1,1,0] ];
const xAxisRange = [0, 1];
const xAxisTicks = 5;
const yAxisRange = [0, 1];
const yAxisTicks = 5;

const View = props => {
    const { sceneNavigator } = props;
    const [ text, setText ] = useState();

    const onTrackingUpdated = (state, reason) => {
    //     if (state == ViroConstants.TRACKING_NORMAL && text == null){
    //         if(timeout) {
    //             clearTimeout(timeout);
    //             timeout = null;
    //         }
            
    //         setText('Chart Test!');
    //     } else if (state == ViroConstants.TRACKING_NONE && !timeout){
    //         timeout = setTimeout(() => setText(null), 300);
    //     }
    }

    return (
        <ViroARScene onTrackingUpdated={onTrackingUpdated} >           
            <ViroAmbientLight color="#FFFFFF" />
            <LinePlot 
                title='Some Series'
                series={[[0, 5, 0], [3, 15, 10], [10, 2, 10], [11, 5, 5], [18, 8, 0], [20, 1, 5]]}
            />
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