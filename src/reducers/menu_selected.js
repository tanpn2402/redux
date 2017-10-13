import { ActionTypes } from '../core/constants';

const initialState = {
    tabList: [],
    page: '1',
    tabID: 'trading',
    subTabID: 'enterorder',
    widgetList: [],
    load: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.MENU_SELECTED:
            return Object.assign({}, state, {
                tabList: action.tabList,
                page: action.page,
                reload: action.reload,
            });
        case ActionTypes.TABCLICKEVENT:
            return Object.assign({}, state, {
                tabID: action.tabID,
                subTabID: action.subTabID,
            });

        case ActionTypes.RELOADCUSTOM:
            return Object.assign({},state,{
              load: action.load,
            });

        case ActionTypes.REMOVEWIDGET:
            return Object.assign({}, state, {
                load: action.load
            });

        case ActionTypes.ADDWIDGET:
            return Object.assign({}, state, {
                load: action.load,
                widgetList: state.widgetList.concat(action.widgetList)
            });

        case ActionTypes.SAVELAYOUT:
            return Object.assign({}, state, {});

        case ActionTypes.GETSAVEDCONTENTLAYOUT:
            return Object.assign({}, state, {
                savedcontent: action.savedcontent
            })

        default:
            break;

    }
    return state;
}
