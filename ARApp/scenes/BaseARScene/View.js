import React, { useState, useRef, useEffect, useReducer } from 'react';
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
import Marker from '../../charts/Marker';

import LogOBJ from '../../assets/log.obj';

import Console from '../../ui/Console';
import { useConsoleActions } from '../../redux/actions';

// import Chart from '../../assets/chart-test.png';
// console.log(Chart)
let interval = null;

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

// let timeout = null;

const View = props => {
    const { sceneNavigator } = props;
    const [ text, setText ] = useState();
    const [ trackingInfo, setTrackingInfo ] = useState({});
    const [ cameraTransform, setCameraTransform ] = useState({});
    const [ navigator, setNavigator ] = useState(); 

    // const Console = useConsole({componentProps: {position: [0, 0, -.4]}});

    const ref = useRef();

    useEffect(
        () => {
            if(ref && ref.current) {
                setNavigator(ref.current);
            }
        },
        [ ref ]
    );

    const onTrackingUpdated = (state, reason) => {
        console.log('Updated track')
        setTrackingInfo({state, reason});
    }

    const onCameraTransformUpdate = cameraTransform => setCameraTransform(cameraTransform);

    // clearInterval(interval);
    // useEffect(() => {
    //     interval = setInterval(() => {
    //         if(ref && ref.current) {
    //             ref.current.getCameraOrientationAsync()
    //                 .then(orientation => {
    //                     // console.log(orientation.forward)
    //                     ref.current.performARHitTestWithRay(orientation.forward).then((results)=>{
    //                         const [ firstPlane ] = results.filter(res => res.type == "ExistingPlaneUsingExtent").map(res => res.transform);
    //                         const { position } = firstPlane || {};
    //                         console.log(position)
    //                         // for (var i = 0; i < results.length; i++) {
    //                         //     let result = results[i];
    //                         //     // console.log(result.type)
    //                         //     if (result.type == "ExistingPlaneUsingExtent") {
    //                         //         setPointerTransform(result.transform);
    //                         //     }
    //                         // }
    //                     })
    //                 })
    //         }
    //     }, 200)
    // });

    // if(pointerTransform) {
    //     console.log(pointerTransform.position)
    // }

    // setInterval( () => { Console.log('test') }, 2000 )

    const Console = useConsoleActions();

    setTimeout(() => Console.log('hi!'), 2000);

    return (
        <ViroARScene 
            ref={ref} 
            onTrackingUpdated={onTrackingUpdated}
            onCameraTransformUpdate={onCameraTransformUpdate}
        >           
            {/* { Console.instance } */}
            <ViroAmbientLight color="#FFFFFF" />
            <Console />
            {/* <Console 
                logList={[
                    'hello',
                    'world'
                ]}
                position={[0, 0, -.4]}
            /> */}

            {/* <LinePlot 
                title='Some Series'
                series={[[0, 5, 0], [3, 15, 10], [10, 2, 10], [11, 5, 5], [18, 8, 0], [20, 1, 5]]}
            /> */}
            {/* {
                trackingInfo &&
                    <Marker 
                        navigator={navigator}
                        trackingInfo={trackingInfo}
                    />
            } */}

            {/* <ViroImage
                height={.5}
                width={.5}
                source={Chart}
                position={[0.3, 0, -0.4]} 
            /> */}
            {/* <Viro3DObject 
                source={LogOBJ}
                highAccuracyEvents={true}
                position={[0, 0, -0.5]}
                scale={[.0015, .0015, .0015]}
                rotation={[90, 0, 0]}
                type='OBJ'
                // transformBehaviors={['billboard']}
                // onClick={(position, source) => sceneNavigator.takeScreenshot('test', true)}
            /> */}
        </ViroARScene>
    );
};

export default View;