const { Contants } = require('../core/constants')
export default
    {
        "lang": "en_US",
        "title": "en_US",
        "page": {
            "tab": {
                "trading": "Trading",
                "portfolio": "Portfolio",
                "daytrade": "Day Trade",
                "orderjournal": "Order Journal",
                "transhistory": "Transaction History",
                "management": "Services",
                "customization": "My Page",
                "mobile": "mobile",
                "orderhistory": "Order History",
                "social": "Social",
                "marketinfo": "Market Information"
            },
            "setting": {
                "language": {
                    "title": "Language",
                    "vi_VN": "Vietnamese",
                    "en_US": "English",
                    "zh_CN": "Simplified Chinese",
                    "zh_TW": "Traditional Chinese"
                },
                "preference": {
                    "title": "Preferences",
                    "defaultTab": "Default Page"
                },
                "appearance": {
                    "title": "Appearence",
                    "light": "Light",
                    "dark": "Dark",
                    "blue": "Blue",
                    "brown": "Brown",
                    "virtual": "Virtual"
                },
                "user": {
                    "title": "User"
                },
                "prompt": {
                    "title": "Prompt"
                }
            },
            "global": {
                "buysell": {
                    "B": "B",
                    "S": "S"
                },
                "bs": {
                    "B": "Buy",
                    "S": "Sell"
                },
                "ordertype": {
                    "L": "Normal",
                    "O": "ATO",
                    "C": "ATC",
                    "P": "Put through",
                    "M": "MP",
                    "B": "MOK",
                    "Z": "MAK",
                    "R": "MTL"
                },
                "status": {
                    "NEW": "New",
                    "CAN": "Cancelled",
                    "REJ": "Rejected",
                    "WA": "Waiting",
                    "FEX": "Fully Executed",
                    "PEX": "Partially Filled",
                    "Q": "Queued",
                    "WC": "Waiting Cancel",
                    "WM": "Waiting Modify",
                    "IAT": "Inactive",
                    "SND": "Sending",
                    "EXP": "Expired",
                    "TRIG": "Trigger Order",
                    "CPD": "Completed",
                    "PXP": "Partially Expired",
                    "FLL": "Fully Filled"
                },
                "filter": {
                    "toggle": "Toggle Filter"
                }
            },
            "menu": {
                "placeorder": "Place Order",
                "trading": "Trading",
                "trandate": "Day Trade",
                "enterorder": "Enter Order",
                "stockmarketinform": "Stock Market Inform",
                "watchlist": "Watch List",
                "orderjournal": "Order Journal",
                "accountinfo": "Account Info",
                "account": "Account",
                "ordershistory": "Order History",
                "cashtransaction": "Cash Transaction History",
                "cashstatement": "Cash Statement",
                "stockstatement": "Stock Statement",
                "marginloan": "Margin Loan Statement",
                "personalprofile": "Profile",
                "otherservice": "Other Service",
                "cashtransfer": "Fund Transfer",
                "cashadvance": "Advance Payment",
                "cashadvancebank": "Bank Advance Payment",
                "oddLot": "Odd Lot Trading",
                "entitlement": "Entitlement",
                "loanrefund": "Loan Refund",
                "help": "Help",
                "available": "Available Margin Loan",
                "defaultgroup": "Default Group",
                "savelayout": "Save Layout",
                "techanalysis": "Technical Analysis",
                "orderconfirmation": "Order Confirmation",
                "actionRightList": "Corporate Action List",
                "additionSharesInfo": "Additional Issue Shares Information",
                "entitlementHistory": "Additional Issue Shares Buying History",
                "entitlementPanel": "Entitlement Place",
                "advancePayment": "Advance Payment",
                "advancePaymentBank": "Bank Advance Payment",
                "fundTransfer": "Fund Transfer",
                "cashTransHistory": "Cash Transaction History",
                "orderHistory": "Order History",
                "portfolio": "Portfolio",
                "sumary": "Sumary",
                "accountsumary": "Account Sumary",
                "clientsumary": "Client Sumary",
                "oddLotOrder": "Odd Lot Order",
                "oddLotHistory": "Odd Lot Transaction History",
                "oddlotHistory": "Odd Lot Transaction History",
                "matchOrderBankList": "Order Matching List",
                "advanceBankHistory": "Cash Advance Transaction",
                "advanceBankPanel": "Cash Advance Place",
                "advanceBankPlace": "Bank Cash Advance Place",
                "matchOrderList": "Order Matching List",
                "advanceHistory": "Cash Advance Transaction",
                "advancePanel": "Cash Advance Place",
                "fundTransPanel": "Cash Transfer",
                "fundTransHistory": "Cash Transfer Transaction",
                "stockmarketinfo": "Stock Info",
                "loanRefundPanel": "Loan Refund Panel",
                "loanRefundHistory": "Loan Refund Transaction History",
                "loanRefundStatus": "Loan Refund Transaction Status",
                "transactionhistory": "Transaction History",
                "accountbalance": "Account Balance",
                "setting": "Setting",
                "assetallocation": 'Asset Allocation',
                "assetallocationchart": 'Asset Allocation Chart',
                "stockinfo": "Stock Info",
                "daytrade": "Day Trade",
                "tradehistory": "Trade Log",
                "recommendation": "Recommendation"
            },
            "searchbar": {
                "search": "Search",
                "startdate": "Start date",
                "enddate": "End date",
                "transtype": "Trans Type",
                "market": "Market",
                "ordertype": "Order Type",
                "cancel": "Cancel",
                "status": "Status",
                "type": "Type",
                "buysell": "Buy/Sell",
                "exchange": "Exchange",
                "stock": "Symbol",
                "persentlength": "% Length",
                "totalfeetax": "Total (Fee+Tax): ",
                "all": "ALL",
                "normal": "Normal",
                "ato": "ATO",
                "atc": "ATC",
                "putthrough": "Put through",
                "mp": "MP",
                "mok": "MOK",
                "mak": "MAK",
                "mtl": "MTL",
                "buy": "Buy",
                "sell": "Sell",
                "ALL": "ALL",
                "FULLYFILLED": "Fully Filled",
                "QUEUE": "Queue",
                "PARTIALLYFILL": "Partially Fill",
                "REJECTED": "Rejected",
                "CANCELLED": "Cancelled",
                "READYTOSEND": "Ready to send",
                "SENDING": "Sending",
                "PENDINGAPPROVAL": "Pending Approval",
                "STOP": "Stop",
                "WAITINGCANCEL": "Waiting Cancel",
                "WAITINGMODIFY": "Waiting Modify",
                "INACTIVE": "Inactive",
                "EXPIRED": "Expired",
                "SCAXW": "Exercise Subscription",
                "SCAC": "Dividend",
                "CCPCW": "Cash Withdrawal",
                "CCPCD": "Cash Desposit",
                "SCSS": "Sold Contract Settlement",
                "SCSB": "Bought Contract Settlement",
                "CCIPOS": "Interest Posting",
                "SCLRD": "Ex_Repos Deposit",
                "ODDAL": "Odd lot allotment",
                "SCLRW": "Ex_Repos Withdraw",
                "SCLRIW": "Ex_Repos Interest Withdraw",
                "SCLAD": "Advance Payment Deposit",
                "SCLAW": "Advance Payment Withdraw",
                "CCFP": "Custodian fee posting",
                "CSFP": "SMS fee posting",

                "mvStatus": "Status",
                "mvBuysell": "B/S",
                "mvTrade": "Trans Type",
                "mvOrderType": "Order Type",
                "mvStockId": "Symbol",
                "mvLending": "% Lending",
                "mvActionType": "Action Type",
                "mvStartDate": "Start Date",
                "mvEndDate": "End Date",
                "tradeType": "Transaction Type",
                "mvStatus": "Order Status",
                "mvMarket": "Market",
                "mvCurrency": "Currency",
                "mvTxnType": "Transaction Type",
                "mvTransStatus": "Transaction Status",

                "CURRENCY_ALL": "ALL",
                "CURRENCY_HKD": "HKS",
                "CURRENCY_CVY": "CVY",
                "CURRENCY_EUR": "EUR",
                "CURRENCY_TWD": "TWD",
                "CURRENCY_USD": "USD",
                
                "MARKET_ALL": "ALL",
                "MARKET_HKEX": "HKEX",
                "MARKET_MAMK": "MAMK",
                "MARKET_SZMK": "SZMK",
                "MARKET_HO": "HO",
                "MARKET_HA": "HA",
                "MARKET_OTC": "OTC",

                "BS_ALL": "ALL",
                "BS_B": "BUY",
                "BS_S": "SELL",
                
                "ORDERTYPE_ALL": "ALL",
                "ORDERTYPE_L": "Normal",
                "ORDERTYPE_O": "ATO",
                "ORDERTYPE_C": "ATC",
                "ORDERTYPE_P": "Put through",
                "ORDERTYPE_M": "MP",
                "ORDERTYPE_B": "MOK",
                "ORDERTYPE_Z": "MAK",
                "ORDERTYPE_R": "MTL",

                "TXNTYPE_ALL": "ALL",
                "TXNTYPE_ORDER": "ORDER",
                "TXNTYPE_DW": "DW",
                "TXNTYPE_TRADE": "TRADE",
                "TXNTYPE_CASHDW": "CASHDW",
                "TXNTYPE_CHEQUEDW": "CHEQUEDW",
                "TXNTYPE_STOCKDW": "STOCKDW",
                "TXNTYPE_INTEREST": "INTEREST",
                "TXNTYPE_CASHSETTLEMENT": "CASHSETTLEMENT",
                "TXNTYPE_STOCKSETTLEMENT": "STOCKSETTLEMENT",
                "TXNTYPE_BANK": "BANK",
                "TXNTYPE_DIVIDEND": "DIVIDEND",
                "TXNTYPE_WARRANT": "WARRANT",
                "TXNTYPE_CONVERSION": "CONVERSION",
                "TXNTYPE_IPO": "IPO",
                "TXNTYPE_OTHERS": "OTHERS",

                "ACTIONLIST_ISSUE_ALL": "ALL",
                "ACTIONLIST_ISSUE_1": "Cash Dividend",
                "ACTIONLIST_ISSUE_2": "Cash Dividend",
                "ACTIONLIST_ISSUE_3": "Cash Dividend",
                "ACTIONLIST_ISSUE_4": "Cash Dividend",
                "ACTIONLIST_ISSUE_5": "Cash Dividend",
                "ACTIONLIST_ISSUE_6": "Interim Dividend",
                "ACTIONLIST_ISSUE_7": "Final Dividend",
                "ACTIONLIST_ISSUE_8": "Special Dividend",
                "ACTIONLIST_ISSUE_9": "Special Interim Dividend",
                "ACTIONLIST_ISSUE_A": "Scrip Option",
                "ACTIONLIST_ISSUE_B": "Bonus Share",
                "ACTIONLIST_ISSUE_C": "Bonus Warrant",
                "ACTIONLIST_ISSUE_D": "Additional Issuance",
                "ACTIONLIST_ISSUE_E": "Bonus Others",
                "ACTIONLIST_ISSUE_G": "Cash Offer",
                "ACTIONLIST_ISSUE_H": "Stock Offer",
                "ACTIONLIST_ISSUE_I": "Stock Dividend"

            },
            "marqueebar": {
                "status": "Status",
                "price": "Price",
                "value": "Value",
                "volume": "Qty",
                "advance": "Advance"
            },
            "orderjournal": {
                "header": {
                    "cancelmodify": "Cancel/Modify",
                    "price": "Price",
                    "quantity": "Qty",
                    "pendingQty": "Pending Qty",
                    "executedQty": "Executed Qty",
                    "avgprice": "Avg Price",
                    "status": "Status",
                    "ordertype": "Type",
                    "feetax": "(Fee + Tax)",
                    "bankid": "Bank ID",
                    "expirydate": "Expiry Date",
                    "rejectreason": "Reject Reason",
                    "time": "Time",
                    "stockid": "Symbol",
                    "buysell": "B/S",
                    "orderID": "Order ID",

                    // for popup table
                    "market": "Market",
                    "tradeId": "Trade Code",
                    "stockName": "Symbol Name",
                    "buysell": "Buy/Sell",
                    "initialPrice": "Initial Price",
                    "newPrice": "New Price",
                    "initialQuantity": "Initial Qty",
                    "matchedQuantity": "Matched Qty",
                    "newQuantity": "New Qty",
                    "totalCash": "Total Amount"
                },
                "popup": {
                    "title": {
                        "modify": "Confirm Modify",
                        "cancel": "Confirm Cancel"
                    }
                },
                "ordertype":{
                  "L":"Normal",
                  "All":"ALL",
                  "O": "ATO",
                  "C": "ATC",
                  "P": "Put through",
                  "M": "MP",
                  "B": "MOK",
                  "Z": "MAK",
                  "R": "MTL",
                },
                "reject":"Detail",
                "action": {
                    "cancelorder": "Cancel"
                },
                "message": {
                    "modifySucces": "Order is sent. Please check again in Order journal.",
                    "modifyFailed": "Modify order failed. Please see detail in Order journal.",
                    "cancelSuccess": "Order is sent. Please check again in Order journal",
                    "cancelFailed": "Cancel order falied. Please contact to support team."
                }
            },
            "daytrade": {
                "header": {
                    "cancelmodify": "Cancel/Modify",
                    "price": "Price",
                    "quantity": "Qty",
                    "status": "Status",
                    "ordertype": "Type",
                    "stockid": "Symbol",
                    "buysell": "BS",
                    "currency": "Currency",
                    "filled": "Filled",
                    "triggerprice": "Trigger Price",
                    "gtd": "GTD",
                    "orderNo": "Order ID",
                    // for popup table
                    "market": "Market",
                    "tradeId": "Trade Code",
                    "stockName": "Symbol Name",
                    "buysell": "Buy/Sell",
                    "initialPrice": "Initial Price",
                    "newPrice": "New Price",
                    "initialQuantity": "Initial Qty",
                    "matchedQuantity": "Matched Qty",
                    "newQuantity": "New Qty",
                    "totalCash": "Total Amount"
                },
                "popup": {
                    "title": {
                        "modify": "Confirm Modify",
                        "cancel": "Confirm Cancel"
                    }
                },
                "message": {
                    "modifySucces": "Order is sent. Please check again in Order journal.",
                    "modifyFailed": "Modify order failed. Please see detail in Order journal.",
                    "cancelSuccess": "Order is sent. Please check again in Order journal",
                    "cancelFailed": "Cancel order falied. Please contact to support team."
                }
            },
            "cashstatement": {
                "header": {
                    "date": "Date",
                    "description": "Description",
                    "beginningbalance": "Beginning Balance",
                    "creditamount": "Credit Amount",
                    "debitamount": "Dedit Amount",
                    "endingbalance": "Ending Balance"
                }
            },
            "cashtransaction": {
                "header": {
                    "transid": "ID",
                    "datetrans": "Date",
                    "transtype": "Type",
                    "stockcode": "Symbol",
                    "stockname": "Symbol Name",
                    "amount": "Amount",
                    "status": "Status",
                    "notes": "Notes",
                    "lastupdate": "Last Update"
                },
                "status": {
                    "P": "Pending",
                    "A": "Approved",
                    "R": "Rejected",
                    "D": "Deleted"
                }
            },
            "transactionhistory": {
                "header": {
                    "transid": "ID",
                    "transdate": "Date",
                    "transtype": "Type",
                    "stockcode": "Symbol",
                    "stockname": "Symbol Name",
                    "quantity": "Qty",
                    "price": "Price",
                    "currency": "CCY",
                    "amount": "Amount"
                },
                "status": {
                    "P": "Pending",
                    "A": "Approved",
                    "R": "Rejected",
                    "D": "Deleted"
                }
            },
            "fundTransHistory": {
                "header": {
                    "transfertype": "Type",
                    "transferamount": "Amount",
                    "beneficiaryaccount": "Beneficiary Account",
                    "beneficiaryfullname": "Beneficiary Fullname",
                    "bankname":"Bank Name",
                    "bankbranch":"Bank Branch",
                    "status": "Status",
                    "approvetime": "Approve Time",
                    "date": "Date"
                }
            },
            "orderconfirmation": {
                "header": {
                    "tradetime": "Time",
                    "marketid": "Market",
                    "price": "Price",
                    "quantity": "Qty",
                    "filledquantity": "Filled Qty",
                    "filledprice": "Filled Price",
                    "cancelquantity": "Canceled Qty",
                    "status": "Status",
                    "ordertype": "Order Type",
                    "stockid": "Symbol",
                    "buysell": "Buy/Sell"
                },
                "popup": {
                    "title": "Order confirmation"
                },
                "message": {
                    "confirmSuccess": "Comfirm Successful.",
                    "confirmFail": "Confirm Fail."
                },
                "status": {
                    "STATUS_FLL": "Fully Filled"
                }
            },
            "ordershistory": {
                "header": {
                    "ordergroupid": "Order ID",
                    "matcheddate": "Matched Date",
                    "matchedorderstatus": "Matched Status",
                    "tradingtype": "Trading Type",
                    "matchedvalue": "Matched Qty",
                    "tradetime": "Trade Time",
                    "marketid": "Market",
                    "price": "Price",
                    "quantity": "Qty",
                    "filledquantity": "Filled Qty",
                    "filledprice": "Filled Price",
                    "cancelquantity": "Cancel Qty",
                    "status": "Status",
                    "ordertype": "Order Type",
                    "stockid": "Symbol",
                    "buysell": "B/S",
                    "quantity": "Qty",
                    "filled": "Filled",
                    "avgprice": "Avg Price",
                    "ordertype": "Order Type",
                    "inputtime": "Input Time"
                },
                 "buysell": {
                    "B": "Buy",
                    "S": "Sell"
                },
                "status": {
                    "NEW":"New",
                    "REJ":"Rejected",
                    "WA":"Waiting",
                    "CAN":"Cancelled",
                    "FEX":"Fully Executed",
                    "PEX":"Partially Filled",
                    "Q": "Queued",
                    "WC":"Waiting Cancel",
                    "WM":"Waiting Modify",
                    "IAT":"Inactive",
                    "SND":"Sending",
                    "EXP":"Expired",
                    "TRIG":"Trigger Order",
                    "CPD":"Completed",
                    "PXP":"Partially Expired",
                    "FLL":"Fully Filled",
                },
                "trandtype":{
                    "L":"Normal",
                    "O":"ATO",
                    "C":"ATC",
                    "P":"Put Throught",
                    "M":"MP",
                    "B":"MOK",
                    "Z":"MAK",
                    "R":"MTL"
            },
            },
            "oddlottrading": {
                "header": {
                    "stockid": "Symbol",
                    "tradingquantity": "Trading Qty",
                    "oddlotquantity": "Odd Lot Qty",
                    "currentprice": "Current Price",
                    "exeprice": "Execution Price",
                    "transdate": "Transaction Date",
                    "approvedate": "Approve Date",
                    "oddlotquantityH": "Odd Lot Qty",
                    "exepriceH": "Execution Price",
                    "type": "Type",
                    "tax": "Tax",
                    "fee": "Fee",
                    "value": "Value",
                    "status": "Status",
                    "register": "Register",
                    "notes": "Notes",
                    "notesinfo": "-  MAS buys odd-lot shares on working days of the second week of every month.  -  MAS makes odd-lot shares transfer procedures with the State Agency and makes payment on Clientï¿½s trading account after odd-lot transaction has been approved by the State Agency."
                },
                "popup": {
                    "title": "Odd Lot Confirmation",
                    "checknum": "Matrix card number",
                    "verifiednum": "Verified matrix card number",
                    "saveauthentication": "Save Authentication",
                    "cancel": "Cancel",
                    "submit": "Submit",
                    "bankaccount": "Bank Account"
                },
                "status": {
                    "approve": "Approved",
                    "waiting": "Waiting approval"
                },
                "message":{
                    "wrongQty":"Error"
                }
            },
            "accountinfo": {
                "title": {
                    "stock": "STOCK",
                    "cash": "CASH",
                    "cashBank": "CASH - BANK",
                    "overduedebt": "OVERDUE DEBT",
                    "upcomingduedebt": "UPCOMING DUEDEBT "
                },
                "header": {
                    "cashbank": "Cash-Bank",
                    "stock": "Symbol",
                    "buyingpower": "Buying Power",
                    "cashblance": "Cash balance(withdrawable)",
                    "availableadvance": "Available advance",
                    "tempholdcash": "Temporary hold cash",
                    "holdexecute": "Hold for executed purchase",
                    "holdpending": "Hold for pending purchase",
                    "pendingapproval": "Pending approval for withdrawal",
                    "duesell": "Due Sell",
                    "withdrawable": "Withdrawable (include advance)",
                    "outstandingloan": "Outstanding loan",
                    "margincall": "Margin call (By Options)",
                    "cashdeposit": "Cash Deposit",
                    "sellstkinmarport": "Selling stock in margin fortfolio",
                    "vol": "Qty",
                    "tradeinday": "Trade in day",
                    "bought": "Bought",
                    "sold": "Sold",
                    "cash": "Cash",
                    "totalassetmaintenance": "Total asset maintenance",
                    "overduedebt": "Overdue Debt",
                    "processeddebt": "Processed debt",
                    "cashreserve": "Cash reserve",
                    "advancerequest": "Advance request",
                    "cashsupplement": "Cash supplement",
                    "sellstockrequest": "Sell stock request",
                    "forcesell": "Force sell",
                    "forceselldays": "Force sell days",
                    "upcomingduedebt": "Up coming due bebt "
                }
            },
            "portfolio": {
                "header": {
                    "mvMarketID": "Market",
                    "sumary": "Sumary",
                    "valuevnd": "Value",
                    "value": "Value",
                    "cashinfo": "Cash information",
                    "portfolioassessment": "Portfolio assessment",
                    "marginposition": "Margin position",
                    "cash": "Cash",
                    "stock": "Symbol",
                    "mvStockName": "Stock Name",
                    "mvStockID": "Symbol",
                    "mvTradableQty": "Total qty",
                    "mvTSettled": "Usable",
                    "mvHoldingAmt": "Hold in day",
                    "mvQueuingBuy": "T0 buy",
                    "mvTT1UnsettleBuy": "T1 buy",
                    "mvTDueBuy": "T2 buy",
                    "mvTMortgageQty": "Mortgage",
                    "mvTManualHold": "Hold",
                    "mvTEntitlementQty": "Pending entitlement",
                    "mvTAwaitingTraceCert": "Await trading",
                    "mvTAwaitingDepositCert": "Await deposit",
                    "mvTAwaitingWithdrawalCert": "Await withdraw",
                    "mvAvgPrice": "Avg price",
                    "mvMarketPrice": "Current price",
                    "mvWAC": "Buy value",
                    "mvMarketValue": "Market value",
                    "mvPL": "P/L",
                    "mvPLPercent": "% P/L",
                    "mvMarginPercentage": "% Lend",
                    "mvMartginValue": "Lending value",
                    "maintenancePercentage": "% Maintenance",
                    "maintenanceValue": "Maintenance value",
                    "totalAsset": "Total asset",
                    "equity": "Equity",
                    "stockValue": "Market value",
                    "profitLoss": "Profit/Loss",
                    "PLPercent": "% Profit/Loss (per equity)",
                    "cashBalance": "Cash balance(withdrawable)",
                    "mvAvailAdvanceMoney": "Cash advanceable",
                    "mvBuyHoldAmount": "Hold for executed purchase",
                    "mvHoldAmount": "Hold for pending purchase",
                    "CPendingWithdrawal": "Pending approval for withdrawal",
                    "soldT0": "Sold T+0",
                    "soldT1": "Sold T+1",
                    "soldT2": "Sold T+2",
                    "equityMar": "Total asset maintenance",
                    "totalAssetMaintenance": "Equity (margin portfolio)",
                    "stockMaintenance": "Stock maintenance",
                    "cashMaintenance": "Cash maintenance",
                    "mvOutstandingLoan": "Outstanding loan",
                    "debtIncByPurchase": "Debt increase by purchase",
                    "debitAccruedInterest": "Accured debit interest",
                    "mvCreditLimit": "Credit limit",
                    "lendableValue": "Lendable value",
                    "minMarginReq": "Minimum margin requirement",
                    "curLiqMargin": "Current liquidating margin",
                    "marginableBalf": "Margin call (by options)",
                    "cashDeposit": "Cash deposit",
                    "sellStkInMarPort": "Selling stock in margin portfolio",
                    "sellStkNotInMarPort": "Selling stock not in margin portfolio",
                    "mvVolume": "Qty",
                    "mvPrice": "Price",
                    "PortfolioAssessment": "Portfolio Assessment",
                    "mvMargin": "Margin"
                }
                // "header": {
                //     "InstrumentID": "Stock Code",
                //     "InstrumentName": "Stock Name",
                //     "MarketID": "Market",
                //     "Currency": "Currency",
                //     "LedgerBalance": "Ledger Balance",
                //     "UsableBalance": "Usable Balance",
                //     "RefPrice": "Ref.Price",
                //     "RefMarketValue": "Ref.MarketValue",

                // }
            },
            "assetallocation": {
                "header": {
                    "creditlimit": "Credit Limit",
                    "buyingpower": "Buying Power",
                    "withdrawablebalance": "Withdrawable Balance",
                    "totalmarketvalue": "Total Market Value",
                    "settled": "Settled",
                    "ledgerbalance": "Ledger Balance"
                }
            },
            "stockstatement": {
                "header": {
                    "order": "Order No",
                    "transactiondate": "TransDate",
                    "stockcode": "Symbol",
                    "action": "Action",
                    "credit": "Credit",
                    "debit": "Debit",
                    "quantity": "Qty",
                    "avgprice": "Avg Price",
                    "amt": "Amt",
                    "feetax": "Fee + Tax",
                    "value": "Value",
                    "percentage": "%",
                    "description": "Description"
                }
            },
            "marginloan": {
                "header": {
                    "rownum": "No.",
                    "transactiondate": "Date",
                    "description": "Description",
                    "marginusage": "Margin Usage",
                    "debt": "Debt",
                    "payment": "Payment",
                    "finaldept": "Final Debt",
                    "margincall": "Margin Call",
                    "forcesell": "Force Sell"
                }
            },
            "enterorder": {
                "header": {
                    "buy": "Buy",
                    "sell": "Sell",
                    "buyAll": "Buy All",
                    "sellAll": "Sell All",
                    "buysell": "Buy/Sell",
                    "buysellall": "Buy all/Sell all",
                    "stock": "Symbol",
                    "stockCode": "Symbol",
                    "stockName": "Stock Name",
                    "quantity": "Quantity",
                    "type": "Type",
                    "totalCash": "Total Cash",
                    "market": "Market",
                    "bank": "Bank",
                    "lending": "Margin",
                    "buyingpower": "Buying Power",
                    "ordertype": "Order Type",
                    "volume": "Quantity",
                    "price": "Price",
                    "triggerPrice": "Trigger Price",
                    "value": "Value",
                    "netfee": "Net Fee",
                    "expirydate": "Expiry date",
                    "goodTill": "Good Till",
                    "grossAmt": "Gross Amt",
                    "netAmt": "Net Amt",
                    "availQty": "Avail Qty",
                    "commissionFees": "Commission Fees",
                    "usable": "Usable"
                },
                "data": {
                    "Buy": "Buy",
                    "Sell": "Sell",
                    "BuyAll": "Buy all",
                    "SellAll": "Sell all",
                    "Up": "Up",
                    "Down": "Down",
                    "enhancedLimit": "Enhanced Limit",
                    "atAuctionLimit": "At Auction Limit",
                    "atAuction": "At Auction",
                    "limit": "Limit",
                    "stoplimit": "Stop Limit",
                    "specialLimit": "Special Limit",
                    "OTLO": "LO",
                    "OTATO": "ATO",
                    "OTATC": "ATC",
                    "OTMP": "MP",
                    "OTMAK": "MAK",
                    "OTMOK": "MOK",
                    "OTMTL": "MTL",
                    "OTLOddLot": "LO(Odd Lot)"
                },
                "value": {
                    "enhancedLimit": "X",
                    "atAuctionLimit": "I",
                    "atAuction": "A",
                    "limit": "L",
                    "stoplimit": "SL",
                    "specialLimit": "S",
                    "OTLO": "L",
                    "OTATO": "O",
                    "OTATC": "C",
                    "OTMP": "M",
                    "OTLOddLot": "LO",
                    "OTMOK": "B",
                    "OTMAK": "Z",
                    "OTMTL": "R"
                },
                "popup": {
                    "title": "Place Order - {0}",
                    "stockname": "Name",
                    "expirydate": "Expiry date",
                    "checknum": "Matrix card number",
                    "verifiednum": "Verified matrix card number",
                    "saveauthentication": "Save Authentication",
                    "comfirm": "Comfirm",
                    "successOrder": "Successfully"
                },
                "error": {
                    "volumeNegative": "Quantity must be greater than 0.",
                    "priceNegative": "Price must be greater than 0.",
                    "invalidLotSize": "Invalid Quantity for lot size {0}.",
                    "invalidLotSizeOddLot": "Invalid Quantity for lot size Oddlot < {0}.",
                    "invaliedPriceOutRange": "Order price is out of price spread (from_value to to_value), please input again!",
                    "ordertypeavailable": "Order Type is unavailable",
                    "sellvolume": "It's out of your stock's volume range",
                    "stockavailable": "Stock Code is unavailable",
                    "money": "You don't have enough money",
                    "bank": "Bank is unavailable",
                    "noitem": "You don't have this stock code",
                    "disablePlaceOrderMarket": "Now, can't place order on market "
                },
                "ordertype": {
                    "L": "LO",
                    "O": "ATO",
                    "C": "ATC",
                    "M": "MP",
                    "LO": "LO(Odd Lot)",
                    "B": "MOK",
                    "Z": "MAK",
                    "R": "MTL"
                }
            },
            "matrixcard": {
                "error": {
                    "isLock": "Your account is locked, please contact us to unlock",
                    "cardnoneexist": "Your Matrix Card is not exist",
                    "attemptlimit": "The remain number of times input is ",
                    "attempt": "You have out of the number of times input. So your account is locked, please contact us to unlock"
                }
            },
            "stockmarketinform": {
                "header": {
                    "Current": "Current",
                    "ChangeRate": "Change Rate(%)",
                    "Ref": "Ref",
                    "FloorCell": "Floor/Cell",
                    "LowHigh": "Low/High",
                    "Open": "Open",
                    "Avg": "Average Price",
                    "Volume": "Qty",
                    "Total": "Total",
                    "ForBuySell": "ForBuy/Sell",
                    "Room": "Room",
                    "BestBid": "Best Bid",
                    "BestAsk": "Best Ask",
                    "MatchingOrderInfo": "Matching Order Info",
                    "Time": "Time",
                    "Price": "Price",
                    "TotalVol": "Total Qty",
                    "openprice": "Open",
                    "lowprice": "Low",
                    "highprice": "High",
                    "floor": "Floor",
                    "cell": "Ceil",
                    "ref": "Ref",
                    "foreigner": "Foreigner",
                    "total": "Total",
                    "Nominal": "Nominal",
                    "netchange": "Net Change"
                }
            },
            "avaiblemarginlist": {
                "header": {
                    "No": "No.",
                    "Stockcode": "Symbol",
                    "Fullname": "Fullname",
                    "Exchange": "Exchange",
                    "psentlending": "% Lending"
                }
            },
            "cashtransfer": {
                "header": {
                    "cashbalance": "Cash balance",
                    "cashwithdrawable": "Cash withdrawable",
                    "transfertype": "Transfer type",
                    "beneficiaryaccountnumber": "Beneficiary account number",
                    "accounttype": "Account type",
                    "beneficiaryfullname": "Beneficiary fullname",
                    "bankname": "Bank name",
                    "bankbranch": "Bank branch",
                    "transferamount": "Transfer amount",
                    "remark": "Remark",
                    "cashtransferplace": "Cash transfer",
                    "cashtransfertransaction": "Cash transfer transaction",
                    "beneficiaryaccount": "Beneficiary account",
                    "status": "Status",
                    "approvetime": "Approve time",
                    "date": "Date",
                    "cancel": "Cancel",
                    "localaccount": "Local account",
                    "bankaccount": "Banking account",
                    "External":"External",
                    "Internal":"Internal",
                },
                "error": {
                    "transtype": "Choose transfer type",
                    "beneficiary": "Beneficiary account number is unavailable",
                    "bank": "Bank is unavailable",
                    "branch": "Bank branch is unavailable"
                },
                "status": {
                    "P": "Pending",
                    "A": "Approved",
                    "R": "Rejected",
                    "D": 'Deleted',
                },
                "message": {
                    "notenoughmoney": "Your amount is not enough to transfer.",
                    "noamount": "Amount should not be blank.",
                    "overtransfer": "Your amount is not enough",
                    "cancelSuccess": "Cash transfer order is cancelled. Please check in History screen.",
                    "cancelFailed": "Cancel cash transfer order is failed. Please contact to support team."
                },
                "popup": {
                    "title": "Cash Transfer",
                    "message": "Do you want to do this action?",
                    "ok": "OK",
                    "cancel": "Cancel"
                },
                "transtype":{
                    "Fund Transfer":"Fund Transfer",
                    "External":"External",
                    "Internal":"Internal",
                    "Withdraw/Internal":"Withdraw/Internal"
                }
            },
            "cashadvance": {
                "header": {
                    "cashadvance": "Cash Advance",
                    "ordermatchinglist": "Order Matching List",
                    "cashadvanceavailable": "Cash Advance Available",
                    "advancefee": "Advance Fee",
                    "advanceamount": "Advance Amount",
                    "cashadvanceplace": "Cash Advance Place",
                    "cashadvancetransaction": "Cash Advance Transaction",
                    "title": "Cash Advance",
                    "date": "Date",
                    "processingstatus": "Processing Status",
                    "lastupdate": "Last Update",
                    "note": "Remark",
                    "id": "ID",
                    "matchingdate": "Matching Date",
                    "paymentdate": "Payment Date",
                    "stock": "Symbol",
                    "volume": "Qty",
                    "value": "Value",
                    "fee": "Fee+Tax"
                },
                "popup": {
                    "title": "Confirm",
                    "message": "Do you want to do this action ?"
                },
                "status": {
                    "STATUS_A": "Authorized",
                    "STATUS_P": "Pending Approval"
                },
                "remark": {
                    "remark": "Your cash advance will not change until it is approved"
                },
                "message": {
                    "insufficientfund": "Insufficient Fund!",
                    "noamount": "Amount should not be blank.",
                    "advancePaymentFailed": "Advance Payment Failed.",
                    "advancePaymentSuccessful": "Advance Payment Successful."
                }
            },
            "watchlist": {
                "toolbar": {
                    "addstock": "Add",
                    "removestock": "Remove"
                },
                "header": {
                    "name": "Name",
                    "reference": "Reference",
                    "bestbid": "Best Bid",
                    "matching": "Match Info",
                    "bestask": "Best Ask",
                    "pricehistory": "Price history",
                    "foreigninvestment": "Foreigner",
                    "stock": "Symbol",
                    "market": "Market",
                    "ce": "Ceil",
                    "fl": "Flr",
                    "ref": "Ref",
                    "pri3": "P3",
                    "vol3": "V3",
                    "pri2": "P2",
                    "vol2": "V2",
                    "pri1": "P1",
                    "vol1": "V1",
                    "price": "Price",
                    "volume": "Volume",
                    "totalvol": "Total Vol",
                    "open": "Open",
                    "high": "High",
                    "low": "Low",
                    "avg": "Avg",
                    "forbuy": "FBuy",
                    "forsell": "FSell",
                    "forroom": "Room",
                    "change": "+/-",
                    "percent": "%",
                    "offer": "Offer",
                    "bid": "Bid",
                    "signal": "Signal"
                }
            },
            "personalprofile": {
                "holderinformation": {
                    "title": "Account Holder Information",
                    "holdername": "Holder Name",
                    "accountno": "Account.No",
                    "email": "E-mail",
                    "telephone": "Telephone",
                    "address": "Address",
                    "personalid": "Personal ID"
                },
                "personinformation": {
                    "title": "Authorized Person Information",
                    "authorizedname": "Authorized Name",
                    "idno": "ID No",
                    "authorization": "Authorization",
                    "telephone": "Telephone"
                },
                "changepassword": {
                    "title": "Change Password",
                    "currentpassword": "Current Password",
                    "newpassword": "New Password",
                    "retypepassword": "Retype New Password",
                    "save": "Save"
                },
                "warning": {
                    "title": "Warning",
                    "expiredate": "-  Expiry date of password : 07/06/2291 16:10:40",
                    "warndetail1": "-  Your password will be efficient in 90 days after the last time you change it.",
                    "warndetail2": "-  After 90 days, you will receive a notice for changing your password"
                },
                "message": {
                    "error": "Error",
                    "notification": "Notification",
                    "changesuccess": "Your password has been changed successfully",
                    "changefailed": "Password change failed",
                    "passwordincorrect": "Password incorrect. Please try again.",
                    "notmatched": "The new password and the verify password do not have the same value.",
                    "newpassunaccepted": "The new Password only accept 6 to 30 characters.",
                    "emptypass": "Old password cannot be empty."
                }
            },
            "entitlement": {
                "header": {
                    "bankaccount": "Bank Account",
                    "cashbalance": "Cash Balance",
                    "cashavailable": "Cash Available",
                    "buyingpower": "Buying Power",
                    "stockcode": "Symbol",
                    "availableqty": "Available Qty",
                    "registerqty": "Register Qty",
                    "actionprice": "Action Price",
                    "amountVND": "Amount",
                    "stock": "Symbol",
                    "actiontype": "Action Type",
                    "recorddate": "Record Date",
                    "owningvolume": "Owning Qty",
                    "ratecash": "Rate Cash",
                    "rate": "Rate (Stock)",
                    "pervalue": "Per value",
                    "recievecash": "Recieved Cash",
                    "receivedstock": "Received Stock",
                    "status": "Status",
                    "payabledate": "Payable Date",
                    "paiddate": "Paid Date",
                    "rightrate": "Right Rate",
                    "actionrate": "Action Rate",
                    "startdate": "Start Date",
                    "transferdeadline": "Transfer Deadline",
                    "registerdeadline": "Register Deadline",
                    "registerdate": "Register Date",
                    "volume": "Qty",
                    "amount": "Amount",
                    "entitlementplace": "Entitlement Place",
                    "corporateactionlist": "Corporate Action List",
                    "additionalissuesharesinformation": "Additional issue shares information",
                    "additionalissuesharesbuyinghistory": "Additional issue shares buying history"
                },
                "status": {
                    "STATUS_W": "Đã đóng tiền",
                    "STATUS_D": "Đã phân bổ",
                    "STATUS_I": "Chưa đóng tiền"
                },
                "rightStatus": {
                    "STATUS_1": "Đã phân bổ",
                    "STATUS_0": "Chờ phân bổ",
                    "STATUS_I": "Chưa đóng tiền",
                    "STATUS_W": "Đã đóng tiền",
                    "STATUS_D": "Đã phân bổ"
                },
                "issueType": {
                    "ISSUE_1": "Cash Dividend",
                    "ISSUE_2": "Cash Dividend",
                    "ISSUE_3": "Cash Dividend",
                    "ISSUE_4": "Cash Dividend",
                    "ISSUE_5": "Cash Dividend",
                    "ISSUE_6": "Interim Dividend",
                    "ISSUE_7": "Final Dividend",
                    "ISSUE_8": "Special Dividend",
                    "ISSUE_9": "Special Interim Dividend",
                    "ISSUE_A": "Scrip Option",
                    "ISSUE_B": "Bonus Share",
                    "ISSUE_C": "Bonus Warrant",
                    "ISSUE_D": "Additional Issuance",
                    "ISSUE_E": "Bonus Others",
                    "ISSUE_G": "Cash Offer",
                    "ISSUE_H": "Stock Offer",
                    "ISSUE_I": "Stock Dividend"
                },
                "exercise": {
                    "STATUS_O": "Mở",
                    "STATUS_C": "Hết hạn"
                }
            },
            "actionRightList":{
                "header":{
                    "stock": "Symbol",
                    "actiontype": "Action Type",
                    "recorddate": "Record Date",
                    "owningvolume": "Owning Qty",
                    "ratecash": "Rate Cash",
                    "rate": "Rate",
                    "pervalue": "Per Value",
                    "receivecash": "Received Cash",
                    "receivedStock": "Received Stock",
                    "status": "Status",
                    "payabledate": "Payable Date",
                    "paiddate": "Paid Date"
                }
            },
            "additionSharesInfo": {
                "header":{
                    "stock": "Symbol",
                    "recorddate": "Record Date",
                    "owningvolume": "Owning Value",
                    "rightrate": "Right Rate",
                    "actionrate": "Action Rate",
                    "availableqty": "Available Qty",
                    "actionprice": "Action Price",
                    "startdate": "Start Date",
                    "transferdeadline": "Transfer Deadline",
                    "registerdeadline": "Register Deadline",
                }
            },
            "entitlementHistory":{
                "header":{
                    "registerdate": "Register Date",
                    "stock": "Symbol",
                    "volume": "Qty",
                    "actionprice": "Action Price",
                    "amount": "Amount",
                    "paiddate": "Paid Date",
                    "status": "Status"
                }
            },
            "matchOrderBankList":{
                "header":{
                    "contractid": "Contract ID",
                    "orderid": "Order ID",
                    "settlementdate": "Settlement Date",
                    "tradedate": "Trade Date",
                    "stockid": "Symbol",
                    "price": "Price",
                    "quantity": "Qty",
                    "value": "Value"
                }
            },
            "advanceBankHistory":{
                "header":{
                    "date": "Date",
                    "advanceamount": "Advance Amount",
                    "advancefee": "Advance Fee",
                    "processingstatus": "Processing Status",
                    "lastupdate": "Last Update",
                    "note": "Note"
                }
            },
            "matchOrderList":{
                "header":{
                    "id": "ID",
                    "matchingdate": "Matching Date",
                    "paymentdate": "Payment Date",
                    "stock": "Symbol",
                    "volume": "Qty",
                    "value": "Value",
                    "fee": "Fee+Tax"
                }
            },
            "advanceHistory":{
                "header":{
                    "date": "Date",
                    "advanceamount": "Advance Amount",
                    "advancefee": "Advance Fee",
                    "processingstatus": "Processing Status",
                    "lastupdate": "Last Update",
                    "note": "Remark"
                }
            },
            "oddLotOrder":{
                "header":{
                    "stockid": "Symbol",
                    "tradingquantity": "Trading Qty",
                    "oddlotquantity": "Oddlot Qty",
                    "currentprice": "Current Price",
                    "exeprice": "Exe Price"
                }
            },
            "oddlotHistory":{
                "header":{
                    "stockid": "Symbol",
                    "oddlotquantityH": "Oddlot Qty",
                    "exepriceH": "Exe Price",
                    "fee": "Tax",
                    "value": "Value",
                    "status": "Status",
                    "transdate": "Trans Date",
                    "approvedate": "Approve Date"
                },
                "status":{
                    "H":"Approved",
                    "D":"Waiting Approval"
                }
            },
            "loanRefundHistory":{
                "header":{
                    "loanID": "ID",
                    "trandate": "Trading Date",
                    "refundamount": "Loan Refund Amount",
                    "type": "Type",
                    "status": "Processing Status",
                    "remark": "Remark",
                    "lastupdate": "Last Update"
                }
            },
            "loanRefundStatus":{
                "header": {
                    "loanID": "ID",
                    "trandate": "Trading Date",
                    "refundamount": "Loan Refund Amount",
                    "type": "Type",
                    "status": "Processing Status",
                    "remark": "Remark",
                    "lastupdate": "Last Update"
                }
            },
            "loanrefund": {
                "header": {
                    "loanID": "ID",
                    "trandate": "Trading Date",
                    "refundamount": "Loan Refund Amount",
                    "type": "Type",
                    "status": "Processing Status",
                    "remark": "Remark",
                    "lastupdate": "Last Update"
                },
                "popup": {
                    "title": {
                        "submitLoanRefund": "Confirm"
                    },
                    "message": "Do you want to do this action ?"
                },
                "type": {
                    "TYPE_A": "Auto Repayment",
                    "TYPE_M": "Repayment by Request"
                },
                "status": {
                    "STATUS_A": "Approved",
                    "STATUS_P": "Pending"
                },
                "remark": {
                    "formargincall": "For Margin Call"
                },
                "message": {
                    "loanRefundSuccessful": "Loan Refund Successful.",
                    "loanRefundFailed": "Loan Refund Failed.",
                    "wrongAmount": "Please input your loan refund money.",
                    "insufficientFund": "Insufficient Fund!.",
                    "aheadMsg": "The end date can not be before start date"
                },
                "form": {
                    "beginningloan": "Beginning Loan",
                    "availablecashforrefund": " Available Cash for Refund",
                    "cashadvanceable": " Cash Advanceable",
                    "loanrefundamount": "Loan Refund Amount",
                    "remark": "Remark",
                    "cashadvanceavailable": "Cash Advance Available",
                    "advancefee": "Advance Fee",
                    "advanceamount": "Advance Amount",
                    "submit": "Submit",
                    "cancel": "Clear"
                }
            },
            "cashadvancebank": {
                "header": {
                    "cashadvanceavailable": "Cash Advance Available",
                    "ordermatchinglist": "Order Matching List",
                    "cashadvancetransaction": "Cash Advance Transaction",
                    "advancefee": "Advance Fee",
                    "advanceamount": "Advance Amount",
                    "cashadvanceplace": "Cash Advance Place",
                    "bankaccount": "Bank Account",
                    "contractid": "Contract ID",
                    "orderid": "Order ID",
                    "settlementdate": "Settlement Date",
                    "tradedate": "Trade Date",
                    "stockid": "Symbol",
                    "price": "Price",
                    "quantity": "Qty",
                    "value": "Value",
                    "date": "Date",
                    "processingstatus": "Processing Status",
                    "lastupdate": "Last Update",
                    "note": "Note"
                },
                "popup": {
                    "title": "Confirm",
                    "message": "Do you want to do this action ?"
                },
                "message": {
                    "insufficientFund": "Insufficient Fund!",
                    "noAmount": "Amount should not be blank.",
                    "wrongAmount": "Please input your advance payment money.",
                    "advancePaymentFailed": "Advance Payment Failed.",
                    "advancePaymentSuccessful": "Advance Payment Successful.",
                    "noRegisterBank": "You don't register to trading via bank.",
                    "differentTradeDate": "You must select orders with have same trade date."
                }
            },
            "accountbalance": {
                "header": {
                    "currency": "Currency",
                    "exrate": "Ex Rate",
                    "holdamount": "Hold Amount",
                    "withdrawable": "Withdrawable",
                    "settledbalance": "Settled Balance",
                    "ledgerbalance": "Ledger Balance"
                }
            },
            "cash": {
                "header": {
                    "cash": "Cash",
                    "withDrawable": "Withdrawable (include advance)",
                    "advanceable": "Advanceable amount",
                    "buyingPower": "Buying power",
                    "total": "Total",
                    "loan": "Loan",
                    "cashBanlance": "Cash balance (withdrawable)",
                    "cashAdvanceable": "Available advance",
                    "temporaryHoldCash": "Temporary hold cash",
                    "cashAvailable": "Cash available",
                    "cashWithdrawable": "Cash withdrawable",
                    "buyingOrderAmt": "Hold for executed purchase",
                    "dueBuy": "Hold for pending purchase",
                    "widthdrawPendingForApproval": "Pending approval for withdrawal",
                    "inday": "Trade in day",
                    "outStandingLoan": "Outstanding loan",
                    "marginCallByOption": "Margin call (By Options):",
                    "cashDeposit": "Cash Deposit",
                    "sellStockInMarPort": "Selling stock in margin portfolio",
                    "sellStockNotInMarPort": "Selling stock not in margin portfolio",
                    "dueSell": "Due Sell"
                }
            },
            "accountBalance": {
                "header": {
                    "settled": "Settled",
                    "waitingRightOffCash": "Waiting right off cash",
                    "penddingSettle": "Pendding Settle",
                    "pendingBuySettle": "Pendding Buy Settle",
                    "moneyinDay": "Money in day",
                    "hoding": "Holding",
                    "freezing": "Freezing",
                    "securities": "Securities",
                    "sellDay": "Sell Date",
                    "buyWaiting": "Buy waiting",
                    "feeTax": "Fee + Tax ",
                    "sellWaiting": "Sell waiting",
                    "buyValue": "Buy Val",
                    "currentValue": "Current Val",
                    "buyPrice": "Buy Prc"
                }
            },
            "overdueDebt": {
                "header": {
                    "overdueDebt": "Overdue Debt",
                    "processedDebt": "Processed Debt",
                    "cashReserve": "Cash Reserve",
                    "forceSell": "Force Sell",
                    "advanceRequest": "Cash Advance Request",
                    "cashSupplement": "Cash Supplement",
                    "sellStockRequest": "Sell Stock Request",
                    "loanDuration": "Loan Duration",
                    "remindDays": "Remind days",
                    "forceSellDays": "Force Sell days",
                    "days": "days",
                    "months": "months",
                    "upcomingDebt": "Upcoming due debt"
                }
            },
            "stockinfo": {
                "header": {

                }
            },
            "trading": {
                "header": {
                    "price": "Price{0}",
                    "qty": "Qty{0}",
                    "amount": "Amount{0}",
                    "total": "Total{0}",
                    "vol": "Qty",
                    "totalvol": "Total Qty",
                    "time": "Time",
                    "bymarket": "BY MARKET",
                    "bycompany": "BY COMPANY"
                    
                },
                "status": {
                    "STATUS_0": "Trading"
                    
                }
            },
            "social": {
                "header": {
                    "top20": "Top 20",
                    "bottom20": "Bottom 20",
                    "game": "Game",
                    "feed": "Feed",
                    "userdetail": "User Detail",
                    "follow": "Follow",
                    "following": "Following",
                    "grossprofit": "Gross Profit",
                    "trades": "Trades",
                    "followers": "Followers",
                    "totalprofit": "My Total Profit",
                    "rank": "Rank",
                    "placeholder": "What's on your mind?",
                    "daily": "Daily",
                    "monthly": "Monthly",
                    "netequity": "Net Enquity",
                    "grossprofitranking": "Gross Profit Ranking",
                    "portfolio": "Portfolio",
                    "positions": "Positions",
                    "history": "History"
                }
            },
            "marketinfo": {
                "header": {
                    "day": "Day",
                    "intro": "Intro",
                    "type": "Type",
                    "intraday": "In Trade Day"
                },
                "tab": {
                    "markettrading": "Trading",
                    "marketnews": "News",
                    "marketfinance": "Finance",
                    "marketreports": "Reports",
                    "markettechnical": "Technical",
                }
            },
            "messagebox": {
                "title": {
                    "confirm": "Confirm",
                    "newGroupName": "New group name",
                    "warningConfiguration": "Warning Configuration",
                    "note": "Note",
                    "info": "Info",
                    "error": "Error",
                    "failed": "Failed",
                    "success": "Success",
                    "orderInformation": "Order information",
                    "confirmCancel": "Confirm cancel",
                    "rejectReason": "Reject reason",
                    "modifiedOrder": "Order Information"
                },
                "message": {
                    "systemMaintain": "System is Maintainning!",
                    "maxWindows": "You only have |NoW| windows in this workspace!",
                    "oneWindow": "You can open only one window",
                    "saveLayoutConfirm": "Do you want to save your work?",
                    "saveLayoutSuccess": "Layout saved successful!",
                    "saveLayoutFail": "There was an error, please try again later....",
                    "invalidStepPrice": "Price must be the multiple of range_value for input price between from_value and to_value.",
                    "invalidStepPriceMaxRange": "Price must be the multiple of range_value for input price greater than to_value.",
                    "invaliedStepPriceWithOutRange": "Price must be the multiple of range_value.",
                    "invaliedPriceOutRange": "Order price is out of price spread (from_value to to_value), please input again!",
                    "newGroupName": "Please enter new group name",
                    "deleteItem": "Are you sure you want to delete ",
                    "enterStopPrice": "Please enter the Stop Price!",
                    "disablePlaceOrderMarket": "Now, can't place order on market ",
                    "stockNotExist": " is not exist,please enter again!",
                    "selectBS": "Please select Buy/Sell!",
                    "enterQty": "Please enter the Quantity!",
                    "invalidQty": "Invalid Quantity!",
                    "enterPrice": "Please enter the Price!",
                    "priceNegative": "Price must be greater than 0.",
                    "enterStockCode": "Please enter the Stock Code!",
                    "invalidStockCode": "Invalid Stock Code!",
                    "selectMarket": "Please selse a Market!",
                    "selectUD": "Please select a Up/Down!",
                    "enterTriPrice": "Please enter the trigger price!",
                    "invalidTriPrice": "Invalid trigger price!",
                    "selectAucType": "Please select Order Type!",
                    "invalidQtyUPCOM": "Quantity must be greater than range_value!",
                    "invalidLotSize": "Invalid Quantity for lot size {0}.",
                    "invalidLotSizeOddLot": "Invalid Quantity for lot size Oddlot < {0}.",
                    "notsupport_UPCOM": "System doesn't support place UPCOM order",
                    "invalidEmail": "Invalid email address. Please input again.",
                    "enterEmail": "Please enter email address.",
                    "invalidPhone": "Invalid phone number. Please input again.",
                    "enterPhone": "Please enter phone number.",
                    "noCardNumber": "User have no card number",
                    "networkError": "Can't connect to server. Please retry later.",
                    "networkFoError": "Can't connect to server. Please retry later.",
                    "networkBoError": "Sorry, services temporary suspended. Please retry later.",
                    "networkQueryError": "Network has some problems, please retry.",
                    "checking": "Checking data...",
                    "noRecordDelete": "Please select at least one order to delete.",
                    "maxOrdersAdded": "Please add 10 orders only.",
                    "priceInvalid": "Stock price is invalid, please input again.",
                    "buySellNoInput": "Please choose buy or sell.",
                    "orderNotSelectToSend": "Please select at least one order to send",
                    "noGoodTillDate": "Please input goodtill date",
                    "insertSuccess": "Add new order success. Please check it in multi order list.",
                    "insertFailed": "Add new order failed. Please check order information.",
                    "deleteSuccess": "Remove orders success. Please check it in multi order list.",
                    "deleteFailed": "Remove orders failed. Please check it again.",
                    "updateSuccess": "Update order success. Please check it in multi order list.",
                    "updateFailed": "Update order failed. Please check it again.",
                    "placeOrderSuccess": "Your orders are entered successful.",
                    "placeOrderFailed": "There are some order failed. Please check it in multi order list",
                    "marketClose_HO": "Out of time for order in HOSE",
                    "marketClose": "Out of time for order",
                    "marketClose_HNX": "Out of time for order in HNX",
                    "marketClose_UPCOM": "Out of time for order in UPCOM",
                    "notsupport_UPCOM": "System doesn't support place UPCOM order",
                    "invalidTime_ATC": "Can't place ATC order in this session",
                    "invalidTime_ATO": "Can't place ATO order in this session",
                    "invalidTime_MP": "Can't place MP order in this session",
                    "cancelSession1": "Cancel order is not permitted in this session.",
                    "isExist": "  already exists,please enter again!",
                    "failSuccess": "Fail remove : ",
                    "removeSuccess": "Success remove : ",
                    "invalidPrice": "Input price is not valid.",
                    "noDataExport": "No data found to export.",
                    "selectStock": "Please select a stock.",
                    "notExistQty": "You are registered to buy maximun issued shares quantity.",
                    "overQuantity": "Not enought existed issued share stock to register to buy.",
                    "invalidStartEndDate": "Missing start date or end date information",
                    "invalidTradeDate": "Trade date is out of range from start date to end date.",
                    "returnError": [
                        "",
                        "Unknow error, please try again or contact support team.",
                        "Your answer is not correct.",
                        "Your account is locked after 3 wrong answer, please unlock your account.",
                        "Your account is have no active token or card.",
                        "Unlock failed. Please contact support team.",
                        "Change type failed. Please contact support team.",
                        "Reset failed. Please contact support team",
                        "Reset failed. User have no active token.",
                        "Your password is locked. Please call our Customer Service Team for assistance."
                    ],
                    "unCheck": "Registration failed. Please input required information(*)",
                    "noAccountToTransfer": "Please select an account to transfer.",
                    "invalidAccountToTransfer": "Target account is invalid",
                    "notEnoughMoney": "Your amount is not enough to transfer",
                    "noAmount": "Amount should not be blank",
                    "overTransfer": "Your amount is not enough",
                    "transferSuccessful": "Transfer successfully. Waiting for approval.",
                    "transferFail": "Transfer fail. Please try again.",
                    "orderNotSelectToSend": "Please select at least one order to send",
                    "notAnnouncement": "We do not register to buy odd-lot stock now",
                    "notChoosenStock": "Please choose one stock at least.",
                    "enterAnswer": "Please enter your answer!",
                    "overQty": "Over odd-lot quantity of stock mvStockCode",
                    "registerFail": "Order is sent failed.",
                    "registerSuccess": "Order is sent successfull. Please waiting for approval.",
                    "vallidLossP_ProfitP": "Stop-loss price must be less than Stop-profit Price",
                    "timeOutIniMsg": "60 Seconds later, System will time out, click 'OK' button to reset.",
                    "timeOutAfterOneMin": " Seconds later, System will time out, click 'OK' button to reset.",
                    "selectToDelete": "Please select!",
                    "lakeCash": "Insufficient funds.",
                    "lakeStock": "Insufficient stock.",
                    "multiUsers": "There are 2 or more users logging in. Logging you out...",
                    "sessionExpired": "Session expired. Logging you out...",
                    "willTimeOut": "Session will expired in 50 seconds",
                    "stockExistInWatch": "Stock already exist in your Watchlist"
                }
            },
            "button": {
                "ok": "OK",
                "submit": "Submit",
                "FTSubmit": "Thực hiện",
                "exportData": "Export",
                "cancel": "Cancel",
                "modify": "Modify",
                "CTTCancel": "Cancel",
                "clear": "Clear",
                "addNew": "Add New",
                "remove": "Remove",
                "edit": "Edit",
                "save": "Save",
                "full": "Hiển thị dạng đầy đủ",
                "compact": "Hiển thị dạng rút gọn",
                "register": "Register",
                "search": "Search",
                "execute": "Execute",
                "next": "Next",
                "debitint": "Thanh toán lãi",
                "saveLayout": "Save Layout",
                "login": "Login",
                "yes": "Yes",
                "no": "No",
                "buy": "Buy",
                "sell": "Sell",
                "reset": "RESET",
                "sure": "Sure",
                "confirmModify": "Confirm Modify",
                "confirmCancel": "Confirm Cancel",
                "close": "Close",
                "complete": "Complete",
                "addWidget": "Add Widget"
            },
            "login": {
                "title": "TRADING ONLINE",
                "username": "Username",
                "clientid": "Client ID",
                "subaccount": "Sub Account ID",
                "password": "Password",
                "securityCode": "Security Code",
                "waiting": "Waiting...",
                "message": {
                    "wrongAccountNo": "Wrong Account Number or Password. Please try again.",
                    "changePasswordRequest": "Please, change your password for the first login",
                    "serviceNotAvailable": "Web services temporarily unavailable. Please call our Customer Service Team at (028) 3848 4472 if you require assistance."
                }
            }
        }
    }