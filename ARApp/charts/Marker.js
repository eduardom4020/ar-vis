import React, { useState, useEffect, useRef } from 'react';
import {
    ViroSphere,
    ViroConstants
} from 'react-viro';

let interval;

const Marker = props => {
    const { navigator, trackingInfo } = props;

    const [ position, setPosition ] = useState();
    const markerRef = useRef();

    console.log('rendered marker')

    // useEffect(() => {
    //     console.log('On effect')
    //     const { current: marker } = markerRef;
    //     clearInterval(interval);
    //     interval = setInterval(() => {
    //         if(navigator) {
    //             navigator.getCameraOrientationAsync()
    //                 .then(orientation => {
    //                     // console.log(orientation.forward)
    //                     navigator.performARHitTestWithRay(orientation.forward).then((results)=>{
    //                         const [ firstPlane ] = results.filter(res => res.type == "ExistingPlaneUsingExtent").map(res => res.transform);

    //                         if(firstPlane) {
    //                             console.log(`raycast hit plane: ${firstPlane}`)
    //                             const { position: pos } = firstPlane || {};
    //                             marker.setNativeProps({ position: pos });
    //                             clearInterval(interval);
    //                             // setPosition(pos);
    //                         }
    //                         // 
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
    //     }, 5);
    // }, [ navigator, markerRef ]);

    if(ViroConstants.TRACKING_NORMAL) {
        console.log('Tracking normal!')
    }

    return (
        <ViroSphere
            ref={markerRef}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.01}
            materials={['lineDot']}
            position={position}
        />
    );
};

export default Marker;