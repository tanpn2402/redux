import { ActionTypes } from '../core/constants';
import * as api from '../api/web_service_api';
import * as ACTION from '../api/action_name';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import $ from 'jquery';
import config from '../core/config';
import { showMessageBox } from './notification';
import { getLanguage } from '../utils';
import * as fsAction from "./derivatives";

import * as tanpn from "../api/fetch"

let isFSDone = false
let isNODone = false
let fsLoginRes = null

let fsclientID = ""
let clientID = ""

function loginDone(id, res, params) {
    if(id == "FS") {
        isFSDone = true
        fsLoginRes = res
        if(isNODone) {

       
            if(res && res.sessionID) {
                console.log("FSSSSSSSSSSSSS")
                localStorage.setItem("clientFSID", params.clientID)
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: {
                        mvMessage: res.errorMessage,
                        needChangePwd: "",
                        success: true
                    }
                }
            } else {
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: {
                        mvMessage: res.errorMessage,
                        needChangePwd: "",
                        success: false
                    }
                }
            }
        } else {
            return {
                type: 0
            }
        }
    } else {
        isNODone = true
        if(isFSDone) {
            if(res && res.success) {
                localStorage.setItem("clientID", params.mvClientID.substring(3, params.mvClientID.length))
            }

            if(fsLoginRes && fsLoginRes.sessionID) {
                localStorage.setItem("clientFSID", fsclientID)
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: {
                        mvMessage: fsLoginRes.errorMessage,
                        needChangePwd: "",
                        success: true
                    }
                }
            } else {
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: {
                        mvMessage: fsLoginRes.errorMessage,
                        needChangePwd: "",
                        success: false
                    }
                }
            }
        } else {
            return {
                type: 0
            }
        }
    }
}

export function doLogin(params) {
    return (dispatch) => {
        tanpn.post("FSServer", "dologin", {clientID: params.mvClientID, password: params.mvPassword}, dispatch,
            function (responseForLogin) {
                fsclientID = params.mvClientID
                dispatch(loginDone("FS", responseForLogin, {clientID: params.mvClientID, password: params.mvPassword}))
            },
            function (err) {
                // login ERROR
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: err
                }
            }
        )

        api.login(ACTION.DOLOGIN, {mvClientID: "077C080001", mvPassword: "123456", securitycode: "", language: "en_US"}, dispatch,
            function (responseForLogin) {
                clientID = "077C080001"
                dispatch(loginDone("NO", responseForLogin, {mvClientID: "077C080001", mvPassword: "123456", securitycode: "", language: "en_US"}))
            },
            function (err) {
                // login ERROR
                return {
                    type: ActionTypes.DOLOGINACTION,
                    loginResult: err
                }
            }
        )
    }
}

export function doLogout(id) {
    //Clear socketID
    localStorage.removeItem('socketID')
    //Clear localstorage
    localStorage.removeItem('lastTab')
    localStorage.removeItem('lastTheme')
    // localStorage.removeItem('lastLang')
    localStorage.removeItem('lastTabID')
    localStorage.removeItem('lastSubTabID')
    localStorage.removeItem('favs')
    localStorage.removeItem('clientID')
    localStorage.removeItem('accountType')
    clearInterval(id)

    return (dispatch) => {
        api.post(ACTION.LOGOUT, { force: 1, fromIndexPage: "Y", sessionID: "<s:property value='mvSessionID'/>" }, dispatch,
            function (response) {
                localStorage.removeItem("curClientID");
                
                window.location.assign('/login');
            },
            function (err) {
                console.log(err)
            })
    }
}


function checkAuthFS(dispatch) {
    return (dispatch) => {
        tanpn.get("FSServer", "checksession", {}, dispatch,
            function (res) {
                console.log(res)
                if(res && res.success == true) {
                    let subaccount = {  
                        "mvTradingAccountBean":{  
                        "baseCCY":"VND",
                        "clientID":"",
                        "clientName":"",
                        "fullName":"",
                        "isHouse":"",
                        "tradingAccountSelection":[  
                            {  
                                "investorGroupID":"KOREAN",
                                "aeID":"ALEX",
                                "productID":"HKS",
                                "subAccountName":"Derivates Account",
                                "subAccountID": localStorage.getItem("clientID"),
                                "enableMargin":"N",
                                "tradingAccSeq":"1",
                                "investorClassID":"NORMAL.01",
                                "investorType": "DERIVATIVES",
                                "accountSeq":"1"
                            }
                            ]
                        }
                    }

                    return {
                        type: ActionTypes.CHECKAUTH,
                        userSavedData: {},
                        userService: {},
                        tradingAccount: subaccount,
                        status: "SUCCESS",
                    }
                } else {
                    return {
                        type: ActionTypes.CHECKAUTH,
                        status: "FAIL"
                    }
                }
                    
            },
            function (err) {
                // login ERROR
                return {
                    type: ActionTypes.CHECKAUTH,
                    status: "ERROR"
                }
            }
        )
    }
}

export function checkAuthNO(dispatch) {
    var params = {
        mvTimelyUpdate: "N",
        key: (new Date()).getTime()
    }

    return (dispatch) => {
        api.post(ACTION.CHECKSESSION, params, dispatch,
            function (response) {

                var lvResult = response.mvResult;

                if (response.mvResult_2 == "SESSION_EXPIRED" ||
                    response.mvResult_2 == "MULTI_USERS_LOGIN" ||
                    response.mvResult_2 == "SYSTEM_MAINTENANCE" ||
                    response.mvResult == "Time Out" ||
                    response.mvResult == "Will time Out") {
                    // not login
                    return {
                        type: ActionTypes.CHECKAUTH,
                        status: "FAIL",
                    }
                }
                else {
                    // already login

                    // -> get user saved data
                    return (dispatch) => {
                        api.post(ACTION.UICFGMANAGEMENT, { mvAction: 'QUERYDEFAULT' }, dispatch, function (responseForGetUserData) {
                            // get user saved data SUCCESS
                            // console.log('asdads', config.tabbar)
                            // save to config
                            if (responseForGetUserData && responseForGetUserData.mvCfgList.length > 0) {
                                try {
                                    var savedContent = $.parseJSON(responseForGetUserData.mvCfgList[0].SAVEDCONTENT)
                                    config.savedContent = savedContent
                                    if (savedContent.layout) {
                                        config.tabbar = Object.assign(config.tabbar, savedContent.layout)
                                        // config.tabbar = savedContent.layout
                                        // console.log(config.tabbar)
                                    }
                                    if(savedContent.technicalAnalysisSetting){
                                        config.technical_analysis_setting = Object.assign(config.technical_analysis_setting, savedContent.technicalAnalysisSetting)
                                    }
                                    if (savedContent.lang) {
                                        let params = {
                                            mvCurrentLanguage: savedContent.lang,
                                            request_locale: savedContent.lang,
                                            key: (new Date()).getTime()
                                        }
                                        api.fetch(ACTION.CHANGELANGUAGE, params, "GET", function(response) {})
                                        // if saved content has language element
                                        if (localStorage.getItem("lastLang"))
                                            // and if localStorage has lastLang (from before session, when user reload WEB) 
                                            config.cache.lang = localStorage.getItem("lastLang")
                                        else
                                            // or if localStorage doesnt have lastLang (when user login done!)
                                            config.cache.lang = savedContent.lang

                                    } else {
                                        let defaultLang = "en_US"
                                        let params = {
                                            mvCurrentLanguage: defaultLang,
                                            request_locale: defaultLang,
                                            key: (new Date()).getTime()
                                        }
                                        api.fetch(ACTION.CHANGELANGUAGE, params, "GET", function(response) {})
                                        // if saved content has language element
                                        if (localStorage.getItem("lastLang"))
                                            // and if localStorage has lastLang (from before session, when user reload WEB) 
                                            config.cache.lang = localStorage.getItem("lastLang")
                                        else
                                            // or if localStorage doesnt have lastLang (when user login done!)
                                            config.cache.lang = defaultLang
                                    }
                                    if (savedContent.theme) {
                                        if (localStorage.getItem("lastTheme") != undefined)
                                            config.cache.theme = localStorage.getItem("lastTheme")
                                        else
                                            config.cache.theme = savedContent.theme

                                    } else {
                                        let defaultTheme = "light"
                                        if (localStorage.getItem("lastTheme") != undefined)
                                            config.cache.theme = localStorage.getItem("lastTheme")
                                        else
                                            config.cache.theme = defaultTheme
                                    }
                                    if (savedContent.tableColWidth) {
                                        config.tableColWidth = savedContent.tableColWidth
                                    }
                                    if (savedContent.tableColReorder) {
                                        config.tableColReorder = savedContent.tableColReorder
                                    }
                                    if(savedContent.favourite){
                                        config.cache.favourite = savedContent.favourite
                                    }
                                    if(savedContent.defaultTab){
                                        config.cache.defaultTab = savedContent.defaultTab
                                        localStorage.setItem("lastTabID", savedContent.defaultTab)
                                    }else{
                                        config.cache.defaultTab = 'tradepage'
                                        localStorage.setItem("lastTabID", 'tradepage')
                                    }
                                    if(savedContent.defaultSubTab){
                                        config.cache.defaultSubTab = savedContent.defaultSubTab
                                        localStorage.setItem("lastSubTabID", savedContent.defaultSubTab)
                                    }
                                }
                                catch (ex) {
                                    console.log("EXCEPTION: "+ ex)
                                }

                                // console.log(config.cache, savedContent, localStorage.getItem("lastLang"))
                            }

                            // -> get client trading account
                            return (dispatch) => {
                                api.post(ACTION.GETTRADINGACCLIST, {}, dispatch, 
                                    function (responseForTradingAcc) {
                                        // get trading account SUCCESS

                                        // -> get customer service
                                        return (dispatch) => {
                                            api.post(ACTION.GETCUSTOMERSERVICE, {}, dispatch, 
                                                function (responseForGetCustomerService) {
                                                    // get customer service SUCCESS
                                                    return {
                                                        type: ActionTypes.CHECKAUTH,
                                                        userSavedData: responseForGetUserData,
                                                        userService: responseForGetCustomerService,
                                                        tradingAccount: responseForTradingAcc,
                                                        status: "SUCCESS",
                                                    }
                                                },
                                                function (err) {
                                                    // get customer service ERROR
                                                    return {
                                                        type: ActionTypes.CHECKAUTH,
                                                        userSavedData: responseForGetUserData,
                                                        tradingAccount: responseForTradingAcc,
                                                        status: "SUCCESS",
                                                    }
                                                })
                                        }
                                    },
                                    function (err) {
                                        // get trading account ERROR
                                        return {
                                            type: ActionTypes.CHECKAUTH,
                                            userSavedData: responseForGetUserData,
                                            status: "SUCCESS",
                                        }
                                    })
                            
                                // dispatch to derivates actions
                                dispatch(fsAction.getFSSubAccount())
                            }

                            
                                        
                        },
                            function (err) {
                                // get user saved data ERROR
                                return {
                                    type: ActionTypes.CHECKAUTH,
                                    status: "SUCCESS",
                                }
                            })
                    }
                }
            },
            function (err) {
                return {
                    type: ActionTypes.CHECKAUTH,
                    status: "ERROR",
                }
            })
    }
}

export function checkAuth() {
    
    // return {
    //     type: ActionTypes.CHECKAUTH,
    //     status: "SUCCESS",
    // }
    return dispatch => {
        // dispatch(checkAuthFS(dispatch))
        dispatch(checkAuthNO(dispatch))
    }
}



export function checkSession(handleCheckSessionID) {
    return (dispatch) => {
        const id = setInterval(function () {
            var params = {
                mvTimelyUpdate: "N",
                key: (new Date()).getTime()
            }
            const responseCheckSessionAndClearInterval = (response) => {
                return responseCheckSession(response, id)
            }
            return api.login(ACTION.CHECKSESSION, params, dispatch, responseCheckSessionAndClearInterval)
        }, 30000);
        handleCheckSessionID(id)
    }
}

function responseCheckSession(response, id) {
    if (response) {
        if (response.success) {
            // some problems with login

            clearInterval(id)
            const logout = () => { return dispatch => dispatch(doLogout(id)) }
            var language = getLanguage(config.cache.lang)
            var message = ''

            switch (response.mvResult_2) {
                case 'SYSTEM_MAINTENANCE':
                    message = language.page.messagebox.message.systemMaintain
                    break
                case "MULTI_USERS_LOGIN":
                    message = language.page.messagebox.message.multiUsers
                    break
                case "SESSION_EXPIRED":
                    message = language.page.messagebox.message.sessionExpired
                case "Time Out":
                    message = language.page.messagebox.message.sessionExpired
                    break
                case "Will time Out":
                    message = language.page.messagebox.message.willTimeOut
                    break
            }
            return (dispatch) => {
                dispatch(showMessageBox(language.page.messagebox.title.info, message,
                    function () {
                        api.fetch(ACTION.LOGOUT, { force: 1, fromIndexPage: "Y", sessionID: "<s:property value='mvSessionID'/>" }, "POST",
                            function (response) {

                                localStorage.removeItem('lastTab')
                                localStorage.removeItem('lastTheme')
                                localStorage.removeItem('lastLang')
                                localStorage.removeItem('lastTabID')
                                localStorage.removeItem('lastSubTabID')
                                window.location.assign('/login');
                            },
                            function (err) {
                                console.log(err)
                            })

                    }))
            }
        } else {
            return {
                type: 1
            }
        }


    }
    else {
        return {
            type: 1
        }
    }
}


export function switchAccount(account) {
    return {
        type: ActionTypes.SWITCHACCOUNT,
        account
    }
}