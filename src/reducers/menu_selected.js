import { ActionTypes } from '../core/constants';

const initialState = {
    tabList: [],
    page: '1',
    tabID: localStorage.getItem('lastTabID')!=null?localStorage.getItem('lastTabID'):'tradepage',
    subTabID: localStorage.getItem('lastSubTabID')!=null?localStorage.getItem('lastSubTabID'):'enterorder',
    widgetList: [],
    load: false,

    openSearch: false,
    openMenu: false,
    reloadTrigger: false
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.TABCLICKEVENT:
            return Object.assign({}, state, {
                tabID: action.tabID,
                subTabID: action.subTabID,
            });

        case ActionTypes.RELOADCUSTOM:
            return Object.assign({},state,{
              load: action.load,
            });

        case ActionTypes.SAVELAYOUT:
            return Object.assign({}, state, {});

        case ActionTypes.GETSAVEDCONTENTLAYOUT:
            return Object.assign({}, state, {
                savedcontent: action.savedcontent
            })

        case ActionTypes.OPENSIDEMENU:
            return Object.assign({}, state, {
                openMenu: action.open !== undefined ? action.open : !state.openMenu
            });

        case ActionTypes.OPENSEARCH:
            return Object.assign({}, state, {
                openSearch: action.open !== undefined ? action.open : !state.openSearch
            });

        case ActionTypes.RELOADPAGECONTENT:
            return Object.assign({}, state, {
                reloadTrigger: !state.reloadTrigger
            });
        default:
            break;

    }
    return state;
}
