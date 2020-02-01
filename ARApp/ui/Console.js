import React, { useState, useEffect } from 'react';

import { 
    ViroFlexView,
    ViroText,
    ViroImage,
    ViroQuad,
    ViroSpinner,
    ViroVideo
} from 'react-viro';

const ConsoleLog = props => {
    const { text='', ...extraProps } = props;
    return (
        <ViroText
            {...extraProps}
            text={text.slice(1, -1)}
            textAlign='left'
            textAlignVertical='center'
            color='#000000'
            // width={6} 
            height={.2}
            style={{fontSize:16}}
            // style={{fontFamily:"Arial", fontSize:20, fontWeight:400, fontStyle:"italic", color:"#0000FF"}}
            // position={[0,0,-5]}
        />
    );
};

const Console = props => {
    const { logList=[], style, ...extraProps } = props;
    const logTexts = logList.map(log => JSON.stringify(log));

    return (
        <ViroFlexView 
            {...extraProps}
            style={{
                ...style,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: .25
            }}
            width={6} 
            height={5}
            scale={[.05, .05, .05]}
            backgroundColor='#ffffff'
            opacity={.2}
        >
        { logTexts.map((logText, index) => <ConsoleLog text={logText} key={`log-${index}`} style={{flex: 1}}/>) }
        </ViroFlexView>
    );
}

export default Console;