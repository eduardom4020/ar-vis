import React, { useState, useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { 
    ViroFlexView,
    ViroText,
    ViroImage,
    ViroQuad,
    ViroSpinner,
    ViroVideo
} from 'react-viro';

export const consoleReducer = ( state={}, { type, logs=[] } ) => {
    switch (type) {
      case 'log':
        return { ...state, logs: [...(state.logs || []), ...logs] };
      default:
        return state;
    }
};

const ConsoleLog = props => {
    const { text='', ...extraProps } = props;
    return (
        <ViroText
            {...extraProps}
            text={text.slice(1, -1)}
            textAlign='left'
            textAlignVertical='center'
            color='#000000'
            height={.2}
            style={{fontSize:16}}
        />
    );
};

const Console = props => {
    const { style, ...extraProps } = props;
    // const logTexts = logList.map(log => JSON.stringify(log));

    // const [ state ] = useReducer(consoleReducer, { logs: ['hello', 'world'] });
    const logs = useSelector(state => state.logs);

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
            position={[0, 0, -.4]}
        >
        { logs.map((logText, index) => <ConsoleLog text={logText} key={`log-${index}`} style={{flex: 1}}/>) }
        </ViroFlexView>
    );
}

export default Console;

// export const useConsole = (props={}) => {
//     const { componentProps={} } = props;

//     const [ logList, setLogList ] = useState(['hello', 'world']);

//     const instance = (
//         <Console 
//             {...componentProps}
//             logList={logList}
//             // position={[0, 0, -.4]}
//         />
//     );

//     const log = useCallback(
//         (...params) => {
//             setLogList([...logList, ...params])
//         },
//         [ setLogList, logList ]
//     );

//     return {
//         instance,
//         log
//     };
// };