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
    ViroMaterials,
    ViroQuad
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
    },
    bg: {
        // shininess: 2.0,
        diffuseColor: '#ffffff',
        // blendMode: 'Add',
        // bloomThreshold: 0.8
    }
});

const SERIES = [ [0,0,0], [.25,.5,0], [.5,.15,0], [.75,.25,0], [1,1,0] ];
// const xAxisRange = [0, 1];
const xAxisTicks = 5;
// const yAxisRange = [0, 1];
const yAxisTicks = 5;
const zAxisTicks = 5;

const normalize = series => {
    const xPoints = series.map(point => point[0]);
    const yPoints = series.map(point => point[1]);
    const zPoints = series.map(point => point.length > 2 ? point[2] : 0);
    
    const maxX = Math.max(...xPoints);
    const minX = Math.min(...xPoints);
    const maxY = Math.max(...yPoints);
    const minY = Math.min(...yPoints);
    const maxZ = Math.max(...zPoints);
    const minZ = Math.min(...zPoints);

    return {
        normSeries: series.map(point => ([
            ((point[0] - minX) / (maxX - minX)) || 0,
            ((point[1] - minY) / (maxY - minY)) || 0,
            ((point[2] - minZ) / (maxZ - minZ)) || 0
        ])),
        xPoints, yPoints, zPoints,
        maxX, minX,
        maxY, minY,
        maxZ, minZ
    };
}

const LinePlot = props => {
    const { title, series=SERIES } = props;
    const { normSeries, ...scale } = normalize(series);

    const is3D = scale.maxZ - scale.minZ !== 0;

    const xAxisRange = [scale.minX, scale.maxX];
    const yAxisRange = [scale.minY, scale.maxY];
    const zAxisRange = [scale.minZ, scale.maxZ];

    return (
        <ViroNode
            position={[0, 0, -0.5]}
            scale={[.25, .25, .25]}
        >
            <ViroQuad
                position={[.5, .55, -.15]}
                // rotation={[90, 0, 0]}
                height={1.4} 
                width={1.3}
                materials={['bg']}
                opacity={.4}
            />
            <ViroQuad
                position={[.5, -.15, .55]}
                rotation={[-90, 0, 0]}
                height={1.4} 
                width={1.3}
                materials={['bg']}
                opacity={.4}
            />
            <ViroQuad
                position={[-.15, .55, .55]}
                rotation={[0, 90, 0]}
                height={1.4} 
                width={1.4}
                materials={['bg']}
                opacity={.4}
            />
            <ViroQuad
                position={[1.15, .55, .55]}
                rotation={[0, -90, 0]}
                height={1.4} 
                width={1.4}
                materials={['bg']}
                opacity={.4}
            />
            <ViroText 
                text={title}
                scale={[.2, .2, .2]} 
                position={[0, 1.1, 0]}
                textAlign='center'
            />
            <ViroPolyline 
                points={normSeries} 
                thickness={0.005} 
                materials='line' 
            />
            {
                normSeries.map(point => (
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
                        points={[0, 1].map(xVal => [xVal, -.05, 0])} 
                        thickness={0.001} 
                        materials='axis' 
                    />
            }
            {
                xAxisRange && new Array(xAxisTicks + 1).fill(Number(1 / xAxisTicks)).map((tick, index) => (
                    <ViroNode
                        position={[tick * index, -.05, 0]}
                    >
                        <ViroPolyline
                            points={[[0, 0, 0], [0, .01, 0]]} 
                            thickness={0.002} 
                            materials='axis' 
                        />
                        <ViroText 
                            text={String((xAxisRange[1] - xAxisRange[0]) * tick * index).slice(0, 4)}
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
                        points={[0, 1].map(yVal => [-.05, yVal, 0])}
                        thickness={0.001} 
                        materials='axis' 
                    />
            }
            {
                yAxisRange && new Array(yAxisTicks + 1).fill(Number(1 / yAxisTicks)).map((tick, index) => (
                    <ViroNode
                        position={[-.05, tick * index, 0]}
                    >
                        <ViroPolyline
                            points={[[0, 0, 0], [.01, 0, 0]]} 
                            thickness={0.002} 
                            materials='axis'  
                        />
                        <ViroText 
                            text={String((yAxisRange[1] - yAxisRange[0]) * tick * index).slice(0, 4)}
                            scale={[.2, .2, .2]}
                            position={[-.12, -.08, 0]}
                            textAlign='right'
                            color='#000000'
                        />
                    </ViroNode>
                ))
            }
            {
                is3D && zAxisRange &&
                    <ViroPolyline
                        points={[0, 1].map(zVal => [-.05, -.05, zVal])}
                        thickness={0.001} 
                        materials='axis' 
                    />
            }
            {
                is3D && zAxisRange && new Array(zAxisTicks + 1).fill(Number(1 / zAxisTicks)).map((tick, index) => (
                    <ViroNode
                        position={[-.05, -.05, tick * index]}
                    >
                        <ViroPolyline
                            points={[[0, 0, 0], [.01, 0, 0]]} 
                            thickness={0.002} 
                            materials='axis'  
                        />
                        <ViroText 
                            text={String((zAxisRange[1] - zAxisRange[0]) * tick * index).slice(0, 4)}
                            scale={[.2, .2, .2]}
                            position={[.03, -.07, .01]}
                            textAlign='center'
                            color='#000000'
                        />
                    </ViroNode>
                ))
            }
        </ViroNode>
    );
};

export default LinePlot;