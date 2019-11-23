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

const LinePlot = props => {
    const { title, series=SERIES } = props;

    return (
        <ViroNode
            position={[-0.17, -.15, -0.6]}
            scale={[.25, .25, .25]}
        >
            <ViroText 
                text={title}
                scale={[.2, .2, .2]} 
                position={[0, 1.1, 0]}
                textAlign='center'
            />
            <ViroPolyline 
                points={series} 
                thickness={0.005} 
                materials='line' 
            />
            {
                series.map(point => (
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
    );
};

export default LinePlot;