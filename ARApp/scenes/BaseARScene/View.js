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
                            materials='line' 
                        />
                        {
                            SERIES && SERIES.map(point => (
                                <ViroSphere
                                    heightSegmentCount={20}
                                    widthSegmentCount={20}
                                    radius={0.025}
                                    position={point}
                                    materials='lineDot'
                                />
                            ))
                        }
                        {
                            xAxisRange &&
                                <ViroPolyline 
                                    // position={[0,0,-2]} 
                                    points={xAxisRange.map(xVal => [xVal, -.05, 0])} 
                                    thickness={0.001} 
                                    materials='axis' 
                                />
                        }
                        {
                            xAxisRange && new Array(xAxisTicks + 1).fill(Number((xAxisRange[1] - xAxisRange[0]) / xAxisTicks)).map((tick, index) => (
                                <ViroNode
                                    position={[tick * index, -.05, 0]}
                                >
                                    <ViroPolyline 
                                        // position={[0,0,-2]} 
                                        points={[[0, 0, 0], [0, .01, 0]]} 
                                        thickness={0.002} 
                                        materials='axis' 
                                    />
                                    <ViroText 
                                        text={String(tick * index).slice(0, 4)}
                                        scale={[.2, .2, .2]}
                                        position={[0, -.1, 0]}
                                        textAlign='center'
                                        color='#000000'
                                    />
                                </ViroNode>
                            ))
                        }
                        {
                            yAxisRange &&
                                <ViroPolyline 
                                    // position={[0,0,-2]} 
                                    points={yAxisRange.map(yVal => [-.05, yVal, 0])} 
                                    thickness={0.001} 
                                    materials='axis' 
                                />
                        }
                        {
                            yAxisRange && new Array(yAxisTicks + 1).fill(Number((yAxisRange[1] - yAxisRange[0]) / yAxisTicks)).map((tick, index) => (
                                <ViroNode
                                    position={[-.05, tick * index, 0]}
                                >
                                    <ViroPolyline 
                                        // position={[0,0,-2]} 
                                        points={[[0, 0, 0], [.01, 0, 0]]} 
                                        thickness={0.002} 
                                        materials='axis'  
                                    />
                                    <ViroText 
                                        text={String(tick * index).slice(0, 4)}
                                        scale={[.2, .2, .2]}
                                        position={[-.12, -.08, 0]}
                                        textAlign='right'
                                        color='#000000'
                                    />
                                </ViroNode>
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