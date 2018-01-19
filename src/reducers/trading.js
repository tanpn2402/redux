const {ActionTypes} = require('../core/constants');

const initialState = {
    instrument: "ACB",
    listInstrumentToWatch: ["ACB"],
    listInstrumentData: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGEINSTRUMENT:
            return Object.assign({}, state, {
                instrument: action.instrument,
            });
        case ActionTypes.ADDINSTRUMENTTOWATCH:
            return Object.assign({}, state, {
                listInstrumentToWatch: [...state.listInstrumentToWatch, action.instrument]
            });
        case ActionTypes.REMOVEINSTRUMENTFROMWATCH:
            return Object.assign({}, state, {
                listInstrumentToWatch: state.listInstrumentToWatch.filter(e => e != action.instrument)
            });


        default:
            return state;
    }
};