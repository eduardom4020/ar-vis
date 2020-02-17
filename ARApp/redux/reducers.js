const INITIAL_STATE = {
  logs: ['hello', 'world']
};

export const consoleReducer = ( state=INITIAL_STATE, { type, logs=[] } ) => {
    switch (type) {
      case 'log':
        return { ...state, logs: [...state.logs, ...logs] };
      default:
        return state;
    }
};