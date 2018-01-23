export const LOGIN = 'dologin.action';		// do login
export const LOGOUT = 'logout.action';					// do logout
export const AUTHCARD = 'authCardMatrix.action';	// do authencation cart matrix
export const STOCKSEARCH = 'stockSearch.action';	//	get list stock data
export const QUERYACCOUNTSUMARY = 'queryAccountSummary.action';	// get Balance Account
export const ENQUIRYHISTORYORDER = 'enquiryhistoryorder.action';// get order history
export const CASHSTATEMENT = 'queryCashTranHisReport.action'; // Cash Transaction history
export const GETCLIENTDETAIL = 'getclientdetail.action';	//Personal Profile
export const HKSSTOCKTRANSACTIONHISTORY = 'hksStockTransactionHistory.action';	//Stock Transaction History
export const CHECKSESSION = 'checkSession.action';	// Do check Session
export const ENQUIRYPORTFOLIO = 'enquiryportfolio.action';	// Enquiry PortFolio
export const ENQUIRYORDER = 'enquiryorder.action';	// get Enquiry Order
export const CHANGEPASSWORD = 'changepassword.action';		// do chanage password
export const STOCKINFO = 'stockInfo.action';	// get Stock Info
export const GETDYNAMICUPDATEDATA = 'getdynamicupdatedata.action';		// get  account info, margin, balance,...
export const ENTERORDER = 'enterorder.action';		// do enter Order
export const VERIFYORDER = 'verifyOrder.action'
export const ENTERORDERCONFIRM = 'enterorderconfirm.action'; // do cofirm enter order
export const ENTERORDERFAIL = 'enterorderfail.action';	// get info fail in enter order
export const GENENTERORDER = 'genenterorder.action';	// get info order type, bank account,...
export const HKSCANCELORDER = 'hksCancelOrder.action';
export const HKSCANCELORDERFAIL = 'hksCancelOrderFail.action';
export const HKSMODIFYORDER = 'hksModifyOrder.action';
export const HKSMODIFYORDERFAIL = 'hksModifyOrderFail.action';
export const GENFUNDTRANSFER = 'genfundtransfer.action';	//fund transfer info
export const CHECKFUNDTRANSFERTIME = 'checkFundTransferTime.action';	//Check Time For Service Cash Transfer
export const DOFUNDTRANSFER = 'dofundtransfer.action';	// cash transfer place
export const HKSCASHTRANSACTIONHISTORY = 'queryCashTranHistory.action';	//Cash Transfer History
export const HKSCASHTRANHIS = 'hksCashTransactionHistory.action';
export const CANCELFUNDTRANSFER = 'cancelFundTransfer.action';	// Cancel Cash Transfer (Cancel when status == pending)
export const GETLOCALADVANCECREATION = 'getLocalAdvanceCreation.action';	// get advance available
export const GETCASHADVANCEHISTORY = 'getCashAdvanceHistory.action';	// Cash Advance History
export const SUBMITADVANCEPAYMENTCREATION = 'submitAdvancePaymentCreation.action';	// Create advance payment
export const ENQUIRYODDLOT = 'enquiryOddLot.action';	// enquiry odd lot portfolio
export const ODDLOTHISTORYENQUIRY = 'oddLotHistoryEnquiry.action';	//odd lot history
export const GETANNOUNCEMENT = 'getAnnouncement.action';	// get announcement
export const QUERYBANKINFO = 'queryBankInfo.action';	// get Bank Account
export const SUBMITODDLOT = 'submitOddLot.action';		// create oddlot ordder
export const GETALLRIGHTLIST = 'getAllRightList.action';	// get all list entitlement
export const GETADDITIONISSUESHAREINFO = 'getAdditionIssueShareInfo.action'; // get addition Issue share info
export const GETENTITLEMENTHISTORY = 'getEntitlementHistory.action';	// entitlement history
export const GETENTITLEMENTSTOCKLIST = 'getEntitlementStockList.action';	// get Entitlement Stock
export const GETENTITLEMENTDATA = 'getEntitlementData.action';	// get information to exercise the right stocks
export const DOREGISTEREXCERCISE = 'doRegisterExercise.action';	// Register Exercise
export const GETLOANREFUNDHISTORY = 'getLoanRefundHistory.action';	// Loan Refund Transaction History
export const GETLOCALLOANREFUNDCREATION = 'getLocalLoanRefundCreation.action';	// Get available for loan refund
export const CHECKLOANREFUNDTIME = 'checkLoanRefundTime.action';	// check Time for service loan refund
export const SUBMITLOANREFUNDCREATION = 'submitLoanRefundCreation.action';	// request loan refund
export const GETLOANREFUNDDATA = 'getLoanRefundData.action';	// Request Loan Refund
export const AVAIABLEMARGINLIST = 'avaiablemarginlist.action';	// avaiable margin list
export const OVERDUEDEBT = 'overduedebt.action'; 	// get information about overdue debt
export const UPCOMINGDEBT = 'upcomingdebt.action';	// get upcoming debt information
export const CHECKADVANCEPAYMENTTIME = 'checkAdvancePaymentTime.action';	// check time for advance request
export const QUERYSOLDORDERS = 'querySoldOrders.action';	// Get list of sold orders
export const QUERYADVANCEPAYMENTINFO = 'queryAdvancePaymentInfo.action';	// get list of advances
export const SUBMITBANKADVANCEPAYMENT = 'submitBankAdvancePayment.action';	// Request advance using bank account
export const CANCULATEINTERESTAMT = 'canculateInterestAmt.action';
export const ENQUIRYSIGNORDER = 'enquirysignorder.action';
export const SUBMITSIGNORDER = 'submitSignOrder.action';
export const DOLOGIN = 'dologin.action';
export const MARGINLOAN = 'marginLoan.action'
export const CASHADVANCEBANK = ''; // not already support in itrade
export const ACCOUNTBALANCE = 'accountbalance.action' // not already support in itrade
export const ADDORREMOVEACTION = 'addOrRemoveAction.action'; //Add or Remove Stock to WatchList
export const GETMARKETDATA = 'getMarketData.action'; //Get WatchList Data at present
export const UICFGMANAGEMENT = 'UICfgManagement.action';//Get saved layout
export const CALCULATEINTERSETAMT = 'calculateInterestAmt.action'; //calculateInterestAmt
export const QUERYMARKETSTATUSINFO = 'queryMarketStatusInfo.action'
export const GENMODIFYORDER = 'genmodifyorder.action'
export const CHANGELANGUAGE = 'changelanguage.action'
export const GETCUSTOMERSERVICE = 'getCustomerService.action'

// Export Excel actions
export const EXPORTGETCASHTRANSACTIONHISTORY = 'exportGetCashTransactionHistory.action';
export const EXPORTORDERHISTORY = 'exportOrderHistory.action';
export const EXPORTCASHTRANSACTIONHISTORY = 'exportCashTransactionHistory.action';
export const EXPORTTRANSACTIONHISTORY = 'exportTransactionHistory.action';
export const EXPORTORDERCONFIRM = 'exportSignOrder.action';
// Stock Watch Update
export const STOCKWATCHDATAUPDATE = 'getStockWatchInfo.action';





// MDS
export const GETLISTSTOCKINWATCHLIST = 'ITradePushServer/WatchList/{clientID}';