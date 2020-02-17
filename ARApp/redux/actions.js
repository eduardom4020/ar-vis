import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const consoleLog = (...params) => ({
    type: 'log',
    logs: [...params]
});

export const useConsoleActions = (params={}) => {
    const dispatch = useDispatch();

    const log = useCallback(
        (...params) => dispatch( consoleLog(...params) ),
        [ dispatch ]
    );

    const Console = {
        log
    };

    return Console;
};