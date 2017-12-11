export const ActionTypes = {
  DOLOGINACTION: 'DOLOGINACTION',
  SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
  SWITCH_THEME: 'SWITCH_THEME',
  CONFIGUATIONS: 'CONFIGUATIONS',
  TABCLICKEVENT: 'TABCLICKEVENT',

  STOCKSEARCH: 'STOCKSEARCH',
  ENQUIRYORDER: 'ENQUIRYORDER',
  CASHTRANSHISTORY: 'CASHTRANSHISTORY',
  
  CANELORDER: 'CANELORDER',
  CANCELSUBMIT: 'CANCELSUBMIT',
  MODIFYSUBMIT: 'MODIFYSUBMIT',
  GETMODIFYDATA: 'GETMODIFYDATA',
  OPENPOPUP: 'OPENPOPUP',

  // menu_selected
  TABCLICKEVENT: 'TABCLICKEVENT',
  OPENSIDEMENU: 'OPENSIDEMENU',
  OPENSEARCH: 'OPENSEARCH',
  RELOADPAGECONTENT: 'RELOADPAGECONTENT',
  
  // cash transaction history
  CASHTRANSHISTORY: 'CASHTRANSHISTORY',

  // configuration
  SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
  SWITCH_THEME: 'SWITCH_THEME',

  // LOGIN
  DOLOGINACTION: 'DOLOGINACTION',
  CHECKAUTH: 'CHECKAUTH',

  // account info
  GETSTOCKINFO: 'GETSTOCKINFO',
  ACCOUNTBALANCEINFO: 'ACCOUNTBALANCEINFO',
  ACCOUNTBALANCEBANKINFO: 'ACCOUNTBALANCEBANKINFO',
  OVERDUEDEBT: 'OVERDUEDEBT',
  UPCOMINGDEBT: 'UPCOMINGDEBT',

  GETLOCALADVANCECREATION: 'GETLOCALADVANCECREATION',

  // order confirmation
  ENQUIRYCONFIRMORDER: 'ENQUIRYCONFIRMORDER',

  // cash advance ( advance payment )
  GETCASHADVANCEHISTORY: 'GETCASHADVANCEHISTORY',
  QUERYSOLDORDERS: 'QUERYSOLDORDERS',


  // cash advance bank ( advance payment bank )
  QUERYADVANCEPAYMENTINFO: 'QUERYADVANCEPAYMENTINFO',
  QUERYBANKINFO: 'QUERYBANKINFO',
  CALCULATEINTERSETAMT: 'CALCULATEINTERSETAMT',
  PAYMENTSELECTED: 'PAYMENTSELECTED',

  // portfolio
  PORFOLIO: 'PORFOLIO',

  // order history
  ENQUIRYORDERHISTORY: 'ENQUIRYORDERHISTORY',

  // cash transaction history
  ENQUIRYCASHTRANSACTION: 'ENQUIRYCASHTRANSACTION',

  // stock statement
  ENQUIRYSTOCKSTATEMENT: 'ENQUIRYSTOCKSTATEMENT',

  // cash statement
  CASHSTATEMENT: 'CASHSTATEMENT',

  // watch list
  LOADWATCHLIST: 'LOADWATCHLIST',
  ADDSTOCK: "ADDSTOCK",
  REMOVESTOCK: "REMOVESTOCK",
  ADDSTOCKTOLOCALSTORE: 'ADDSTOCKTOLOCALSTORE',
  REMOVESTOCKFROMLOCALSTORE: 'REMOVESTOCKFROMLOCALSTORE',
  GETSTOCKSFROMLOCALSTORE: 'GETSTOCKSFROMLOCALSTORE',
  UPDATESTOCKINFO: 'UPDATESTOCKINFO',

  // personal profile
  PROFILE: 'PROFILE',
  CHANGEPASSWORD: 'CHANGEPASSWORD',

  // odd lot tranding
  ODDLOTENQUIRY: 'ODDLOTENQUIRY',
  ODDLOTHISTORY: 'ODDLOTHISTORY',
  ODDLOTSUBMIT: 'ODDLOTSUBMIT',
  CASHTRANSFER: 'CASHTRANSFER',
  CASHDATATABLE: 'CASHDATATABLE',

  MODIFYERROR: 'MODIFYERROR',
  MODIFYSUCCESS: 'MODIFYSUCCESS',

  // enter orer
  ENTERORDER: 'ENTERORDER',
  GENENTERORDER: 'GENENTERORDER',
  GOTOORDERPLACE: 'GOTOORDERPLACE',

  // notification + poup
  NOTIFICATION: 'NOTIFICATION',
  FLASHPOPUP: 'FLASHPOPUP',
  MESSAGEBOX: 'MESSAGEBOX',
  POPUP: 'POPUP',

  // margin loan
  ENQUIRYMARGINLOAN: 'ENQUIRYMARGINLOAN',
  AVAIBLEMARGINLIST: 'AVAIBLEMARGINLIST',
  BANKINFO: 'BANKINFO',

  // loan refund
  LOANREFUNDHISTORY: 'LOANREFUNDHISTORY',
  LOCALADVANCE: 'LOCALADVANCE',
  LOCALREFUND: 'LOCALREFUND',
  LOANREFUNDDATA: 'LOANREFUNDDATA',

  // entitlement
  ENTITLEMENTRIGHTLIST: 'ENTITLEMENTRIGHTLIST',
  ENTITLEMENTADDITIONALSHARELIST: 'ENTITLEMENTADDITIONALSHARELIST',
  ENTITLEMENTHISTORYLIST: 'ENTITLEMENTHISTORYLIST',
  ENTITLEMENTSTOCKLIST: 'ENTITLEMENTSTOCKLIST',
  DYNAMICDATA: 'DYNAMICDATA',

  // fund transfer
  FUNDTRANSFER: 'FUNDTRANSFER',
  HKSCASHTRANHIS: 'HKSCASHTRANHIS',
  GENFUNDTRANSFER: 'GENFUNDTRANSFER',
  CANCELFUNDTRANSFER: 'CANCELFUNDTRANSFER',

  SAVELAYOUT: 'SAVELAYOUT',
  GETSAVEDCONTENTLAYOUT: 'GETSAVEDCONTENTLAYOUT',

  CHECKSESSION: 'CHECKSESSION',


  GENMODIFYORDER: 'GENMODIFYORDER',
  // Excel
  EXPORTGETCASHTRANSACTIONHISTORY: 'EXPORTGETCASHTRANSACTIONHISTORY',
  EXPORTORDERHISTORY: 'EXPORTORDERHISTORY',
  EXPORTCASHTRANSACTIONHISTORY: 'EXPORTCASHTRANSACTIONHISTORY',
  EXPORTTRANSACTIONHISTORY: 'EXPORTTRANSACTIONHISTORY',
  EXPORTORDERCONFIRM: 'EXPORTORDERCONFIRM',

  ///
  RELOADCUSTOM: 'RELOADCUSTOM',

  ///
  GETCAPTCHAIMAGE: 'GETCAPTCHAIMAGE',

  ///
  STOCKWATCHDATAUPDATE: 'STOCKWATCHDATAUPDATE',




  // GSL MOBILE VERSION
  ACCOUNTBALANCEENQUIRY: 'ACCOUNTBALANCEENQUIRY',
  CANCELORDER: 'CANCELORDER',
  MODIFYORDER: 'MODIFYORDER',
  PORTFOLIOENQUIRYBYINSTRUMENT: 'PORTFOLIOENQUIRYBYINSTRUMENT',
  QUERYORDERINFO: 'QUERYORDERINFO',
  TRANSACTIONHISTORY: 'TRANSACTIONHISTORY',
}

export const Contants = {
  dateFormat: 'DD/MM/YYYY',
  searchElement: {
    STARTDATE: 'mvStartDate',
    ENDDATE: 'mvEndDate',
    TRADETYPE: 'tradeType',
    STATUS: 'mvStatus',
    MARKET: 'mvMarket',
    CURRENCY: 'mvCurrency',
    TXNTYPE: 'mvTxnType',
    TRANSSTATUS: 'mvTransStatus'
  }
}
