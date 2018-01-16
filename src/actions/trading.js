import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

export function changeInstrument(ins) {
    return {
        type: ActionTypes.CHANGEINSTRUMENT,
        instrument: ins, // ex: AVC, VNM
    }
}

export function addInstrumentToWatch(ins) {
    return {
        type: ActionTypes.ADDINSTRUMENTTOWATCH,
        instrument: ins, // ex: AVC, VNM
    }
}

export function removeInstrumentFromWatch(ins) {
    return {
        type: ActionTypes.REMOVEINSTRUMENTFROMWATCH,
        instrument: ins, // ex: AVC, VNM
    }
}