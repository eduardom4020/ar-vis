import React, { useState, useEffect } from 'react';

let interval;

const Marker = props => {
    const { navigator } = props;

    const [ position, setPosition ] = useState();

    useEffect(() => {
        clearInterval(interval);
        interval = setInterval(() => {
            if(navigator) {
                console.log('On interval')
                navigator.getCameraOrientationAsync()
                    .then(orientation => {
                        // console.log(orientation.forward)
                        navigator.performARHitTestWithRay(orientation.forward).then((results)=>{
                            const [ firstPlane ] = results.filter(res => res.type == "ExistingPlaneUsingExtent").map(res => res.transform);
                            const { position: pos } = firstPlane || {};
                            setPosition(pos);
                            // for (var i = 0; i < results.length; i++) {
                            //     let result = results[i];
                            //     // console.log(result.type)
                            //     if (result.type == "ExistingPlaneUsingExtent") {
                            //         setPointerTransform(result.transform);
                            //     }
                            // }
                        })
                    })
            }
        }, 200);
    }, [ navigator ]);

    // console.log(position);

    return (
        position ?
            <ViroSphere
                heightSegmentCount={20}
                widthSegmentCount={20}
                radius={.01}
                materials={['lineDot']}
                position={position}
            />
        :
            <></>
    );
};

export default Marker;