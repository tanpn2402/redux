const config = {
	menu_items: [
		{
			id: 'tradingplatform',
			text: 'tradingplatform',
			link: '',
			subitems: [
				{
					id: 'enterorder',
					text: 'enterorder',
					link: ''
				},
				// {
				// 	id: 'stockmarketinform',
				// 	text: 'stockmarketinform',
				// 	link: ''
				// },
				// {
				// 	id: 'watchlist',
				// 	text: 'watchlist',
				// 	link: ''
				// },
				{
					id: 'orderjournal',
					text: 'orderjournal',
					link: ''
				},
				// {
				// 	id: 'accountinfo',
				// 	text: 'accountinfo',
				// 	link: ''
				// },
				{
					id: 'portfolio',
					text: 'portfolio',
					link: ''
				},
				{
					id: "techanalysis",
					text: "techanalysis",
					link: ''
				},
				// {
				// 	id: "orderconfirmation",
				// 	text: "orderconfirmation",
				// 	link: ''
				// },
				{
					id: 'transactionhistory',
					text: 'transactionhistory',
					link: ''
				}
			]
		},
		{
			id: 'otherservice',
			text: 'otherservice',
			link: '',
			subitems: [
				{
					id: 'fundTransfer',
					text: 'cashtransfer',
					link: ''
				},
				{
					id: 'advancePayment',
					text: 'cashadvance',
					link: ''
				},
				// {
				// 	id: 'cashadvancebank',
				// 	text: 'cashadvancebank',
				// 	link: ''
				// },
				{
					id: 'oddLot',
					text: 'oddLot',
					link: ''
				},
				{
					id: 'entitlement',
					text: 'entitlement',
					link: ''
				},
				{
					id: 'loanrefund',
					text: 'loanrefund',
					link: ''
				}
			]
		}
	],

	layoutdefault: {
		enterorder: { i: 'enterorder', x: 0, y: 0, w: 2, h: 6, minW: 1, minH: 6, maxW: 30, maxH: 15, isResizable: false },
		orderjournal: { i: 'orderjournal', x: 0, y: 0, w: 8, h: 4, minW: 5, minH: 4, maxW: 8, maxH: 10 },
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		orderconfirmation: { i: 'orderconfirmation', x: 0, y: 0, w: 8, h: 8, minW: 4, minH: 6, maxW: 8, maxH: 11, static: false },
		porfolio: { i: 'porfolio', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 20, static: false, isResizable: true },
		ordershistory: { i: 'ordershistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		stockstatement: { i: 'stockstatement', x: 0, y: 0, w: 8, h: 8, minW: 4, minH: 6, maxW: 8, maxH: 11 },
		cashstatement: { i: 'cashstatement', x: 0, y: 0, w: 8, h: 8, minW: 4, minH: 6, maxW: 8, maxH: 11 },
		watchlist: { i: 'watchlist', x: 0, y: 0, w: 6, h: 8, minW: 6, minH: 8, maxW: 8, maxH: 10, static: false, isResizable: true },
		stockmarketinform: { i: 'stockmarketinform', x: 0, y: 0, w: 3, h: 6, minW: 3, minH: 6, maxW: 3, maxH: 6, static: false, isResizable: false },
		personalprofile: { i: 'personalprofile', x: 0, y: 0, w: 6, h: 6, minW: 6, minH: 6, maxW: 6, maxH: 6, static: false, isResizable: false },
		oddlottrading: { i: 'oddlottrading', x: 0, y: 0, w: 8, h: 10, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false },
		cashtransfer: { i: 'cashtransfer', x: 0, y: 0, w: 8, h: 10, minW: 5, minH: 6, maxW: 8, maxH: 10, static: false, isResizable: true },
		cashadvance: { i: 'cashadvance', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 10, static: false, isResizable: true },
		marginloan: { i: 'marginloan', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		available: { i: 'available', x: 0, y: 0, w: 4, h: 6, minW: 4, minH: 6, maxW: 8, maxH: 8, static: false, isResizable: true },
		accountinfo: { i: 'accountinfo', x: 0, y: 0, w: 3, h: 6, minW: 3, minH: 6, maxW: 8, maxH: 8, static: false, isResizable: true },
		loanrefund: { i: 'loanrefund', x: 0, y: 0, w: 30, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 12, static: false, isResizable: true },
		entitlement: { i: 'entitlement', x: 0, y: 0, w: 30, h: 12, minW: 8, minH: 8, maxW: 8, maxH: 14, isResizable: true },
		techanalysis: { i: 'techanalysis', x: 0, y: 0, w: 8, h: 6, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: true },
		cashadvancebank: { i: 'cashadvancebank', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, static: false, isResizable: true },

	},
	layoutdefault_sm: {
		enterorder: { i: 'enterorder', x: 0, y: 0, w: 2, h: 6, minW: 1, minH: 6, maxW: 30, maxH: 15, isResizable: false },
		orderjournal: { i: 'orderjournal', x: 0, y: 0, w: 8, h: 4, minW: 8, minH: 4, maxW: 8, maxH: 10 },
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 7, h: 9, minW: 5, minH: 10, maxW: 8, maxH: 10 },
		orderconfirmation: { i: 'orderconfirmation', x: 0, y: 0, w: 8, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15, static: false },
		porfolio: { i: 'porfolio', x: 0, y: 0, w: 8, h: 16, minW: 6, minH: 16, maxW: 8, maxH: 20, static: false, isResizable: true },
		ordershistory: { i: 'ordershistory', x: 0, y: 0, w: 22, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15 },
		stockstatement: { i: 'stockstatement', x: 0, y: 0, w: 30, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15, },
		cashstatement: { i: 'cashstatement', x: 0, y: 0, w: 20, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15 },
		watchlist: { i: 'watchlist', x: 0, y: 0, w: 6, h: 8, minW: 6, minH: 8, maxW: 8, maxH: 8 },
		stockmarketinform: { i: 'stockmarketinform', x: 0, y: 0, w: 3, h: 10, minW: 3, minH: 6, maxW: 3, maxH: 6, static: false, isResizable: false },
		personalprofile: { i: 'personalprofile', x: 0, y: 0, w: 6, h: 6, minW: 6, minH: 6, maxW: 6, maxH: 6, static: false, isResizable: false },
		oddlottrading: { i: 'oddlottrading', x: 0, y: 0, w: 8, h: 12, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false },
		cashtransfer: { i: 'cashtransfer', x: 0, y: 0, w: 8, h: 12, minW: 8, minH: 8, maxW: 8, maxH: 8, static: false, isResizable: false },
		cashadvance: { i: 'cashadvance', x: 0, y: 0, w: 8, h: 12, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false },
		marginloan: { i: 'marginloan', x: 0, y: 0, w: 30, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15, },
		available: { i: 'available', x: 0, y: 0, w: 4, h: 8, minW: 4, minH: 8, maxW: 8, maxH: 6, static: false, isResizable: false },
		accountinfo: { i: 'accountinfo', x: 0, y: 0, w: 3, h: 6, minW: 3, minH: 6, maxW: 8, maxH: 6, static: false, isResizable: true },
		loanrefund: { i: 'loanrefund', x: 0, y: 0, w: 30, h: 18, minW: 22, minH: 20, maxW: 30, maxH: 25, static: false, isResizable: false },
		entitlement: { i: 'entitlement', x: 0, y: 0, w: 30, h: 18, minW: 22, minH: 20, maxW: 30, maxH: 25, isResizable: false },
		techanalysis: { i: 'techanalysis', x: 0, y: 0, w: 8, h: 6, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: true },
		cashadvancebank: { i: 'cashadvancebank', x: 0, y: 0, w: 8, h: 16, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: false },

	}
	,
	orderstatus: [
		'ALL',
		'FULLYFILLED',
		'QUEUE',
		'PARTIALLYFILL',
		'REJECTED',
		'CANCELLED',
		'READYTOSEND',
		'SENDING',
		'PENDINGAPPROVAL',
		'STOP',
		'WAITINGCANCEL',
		'WAITINGMODIFY',
		'INACTIVE',
		'EXPIRED',
	],

	transtype: [
		'SCAXW',
		'SCAC',
		'CCPCW',
		'CCPCD',
		'SCSS',
		'SCSB',
		'CCIPOS',
		'SCLRD',
		'ODDAL',
		'SCLRW',
		'SCLRIW',
		'SCLAD',
		'SCLAW',
		'CCFP',
		'CSFP'
	],

	ordertype: {
		'HKEX': [
			{
                label: "At Auction Limit",
                value: "AAL"
            },
            {
                label: "Enhanced Limit",
                value: "EL"
            },
            {
                label: "Odd Lot",
                value: "LOT"
            },
            {
                label: "Trigger",
                value: "TRIGGER"
            }
		],
		'MAMK': [
            {
                label: "Limit",
                value: "Limit"
            }
		],
		'SZMK': [
            {
                label: "Limit",
                value: "Limit"
            }
		]
	},

	marketid: [
		"HKEX",
		"MAMK",
		"SZMK"
	],

	currency: [
		"HKD",
		"CVY",
		"EUR",
		"TWD",
		"USD"
	],
	
	loginBy: "clientID",  // subAccount , username

	language: [
		{flag: "flag_GBP.png", id: "en_US", text: "English"},
		{flag: "flag_viet.jpg", id: "vi_VN", text: "Tiếng Việt"},
		{flag: "flag_china.jpg", id: "zh_TW", text: "中國"},
		{flag: "flag_china.jpg", id: "zh_CN", text: "中国"}		
	],

	widget: [
		{ i: 'enterorder', 				smW: 2, smH: 6, lgW: 2, lgH: 6, minW: 2, minH: 6, maxW: 3, maxH: 6, isDraggable: true, isResizable: false },
		{ i: 'orderjournal', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 5, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'cashTransHistory', 		smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true},
		{ i: 'orderconfirmation', 		smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 4, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true},
		{ i: 'portfolio', 				smW: 8, smH: 10, lgW: 8, lgH: 14, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: true, isResizable: true},
		{ i: 'orderHistory', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'stockstatement', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 4, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'cashstatement', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 4, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'watchlist', 				smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 8, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'stockmarketinform', 		smW: 3, smH: 6, lgW: 3, lgH: 6, minW: 3, minH: 6, maxW: 3, maxH: 9, isDraggable: true, isResizable: false },
		{ i: 'oddLot', 					smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 8, minH: 10, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'fundTransfer', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 5, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'advancePayment', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 8, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'marginloan', 				smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'available', 				smW: 8, smH: 8, lgW: 8, lgH: 9, minW: 4, minH: 6, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'accountinfo', 			smW: 3, smH: 6, lgW: 3, lgH: 6, minW: 3, minH: 6, maxW: 8, maxH: 8, isDraggable: true, isResizable: false },
		{ i: 'loanrefund', 				smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 6, minH: 8, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'entitlement', 			smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 8, minH: 8, maxW: 8, maxH: 9, isDraggable: true, isResizable: true },
		{ i: 'techanalysis', 			smW: 8, smH: 9, lgW: 4, lgH: 12, minW: 4, minH: 6, maxW: 4, maxH: 18, isDraggable: true, isResizable: true },
		{ i: 'advancePaymentBank', 		smW: 8, smH: 9, lgW: 8, lgH: 9, minW: 8, minW: 6, minW: 8, maxH: 9, isDraggable: true, isResizable: true },

	],

	tabbar: [
		{
			id: "trading",
			title: "trading",
			enabled: true,
			widget: [
				{ i: 'enterorder', x: 0, y: 0, w: 2, h: 10, isDraggable: false, isResizable: false },
				{ i: 'stockmarketinform', x: 5, y: 0, w: 3, h: 6, isDraggable: false, isResizable: false },
				{ i: 'accountinfo', x: 2, y: 0, w: 3, h: 6, isDraggable: false, isResizable: false },
				{ i: 'orderjournal', x: 2, y: 6, w: 6, h: 4, minW: 8, maxW: 8, minH: 4, maxH: 8, isDraggable: false, isResizable: true }
			]
		},
		{
			id: 'portfoliotab',
			title: "portfolio",
			enabled: true,
			widget: [
				////{ i: 'portfolio', x: 0, y: 11, w: 8, h: 5, minW: 8, maxW: 8, minH: 5, maxH: 10, isDraggable: false, isResizable: true },
				// { i: 'accountbalance', x: 4, y: 0, w: 4, h: 4, isDraggable: false, isResizable: false },
				// { i: 'assetallocation', x: 0, y: 0, w: 2, h: 4, isDraggable: false, isResizable: false },
				// { i: 'assetallocationchart', x: 2, y:0, w: 2, h: 4, isDraggable: false, isResizable: false}
				//{ i: 'sumary', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'portfolio', x: 0, y: 5, w: 8, h: 5, minW: 8, maxW: 8, minH: 5, maxH: 10, isDraggable: false, isResizable: true },
				{ i: 'sumary', x: 0, y: 0, w: 8, h: 5, isDraggable: false, isResizable: false },
			]
		},
		{
			id: 'orderjournaltab',
			title: "orderjournal",
			enabled: true,
			widget: [
				{ i: 'orderjournal', x: 0, y: 0, w: 8, h: 9, isDraggable: false, isResizable: false }
			]
		},
		{
			id: 'transhistory',
			title: "transhistory",
			enabled: true,
			widget: [
				{ i: 'orderHistory', x: 0, y: 0, w: 8, h: 9, isDraggable: false, isResizable: false },
				{ i: 'cashTransHistory', x: 0, y: 0, w: 8, h: 9, isDraggable: false, isResizable: false }
			]
		},
		{
			id: 'management',
			title: "management",
			enabled: true,
			widget: [

				{ i: 'fundTransfer', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'entitlement', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'advancePaymentBank', x: 0, y: 0, w: 10, h: 8, isDraggable: false, isResizable: false },
				{ i: 'advancePayment', x: 0, y: 0, w: 8, h: 8, isDraggable: false, isResizable: false },
				{ i: 'oddLot', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'loanrefund',  x:0, y:0, w: 30, h: 10, isDraggable: false, isResizable: false},

			]
		},
		{
			id: 'customization',
			title: "customization",
			enabled: true,
			widget: [
				// { i: 'orderconfirmation', smW: 8, smH: 8, lgW: 8, lgH: 8, minW: 4, minH: 6, maxW: 8, maxH: 11, isDraggable: true, isResizable: true }
			]
		}
	],

	mobileTab: [
		{
			id: "trading",
			title: "trading",
			enabled: true,
			widget: [
				{ i: 'enterorder', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'assetallocation-lite', x: 0, y: 10, w: 8, h: 3, isDraggable: false, isResizable: false},
				{ i: 'stockinfo', x: 0, y: 13, w: 8, h: 10, isDraggable: false, isResizable: false },
				{ i: 'orderjournal', x: 0, y: 30, w: 8, h: 8, minW: 8, maxW: 8, minH: 4, maxH: 8, isDraggable: false, isResizable: false }
			]
		},
		{
			id: 'portfoliotab',
			title: "portfolio",
			enabled: true,
			widget: [
				{ i: 'assetallocation', x: 0, y: 0, w: 8, h: 4, isDraggable: false, isResizable: false},
				{ i: 'accountbalance', x: 0, y: 0, w: 8, h: 6, isDraggable: false, isResizable: false },
				{ i: 'portfolio', x: 0, y: 5, w: 8, h: 9, minW: 8, maxW: 8, minH: 5, maxH: 10, isDraggable: false, isResizable: false },
				//{ i: 'sumary', x: 0, y: 0, w: 8, h: 5, isDraggable: false, isResizable: false },
			]
		},
		{
			id: 'orderjournaltab',
			title: "daytrade",
			enabled: true,
			widget: [
				{ i: 'orderjournal', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false }
			]
		},
		{
			id: 'transhistory',
			title: "transhistory",
			enabled: true,
			widget: [
				{ i: 'transactionhistory', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false }
			]
		},
		{
			id: 'orderhistory',
			title: "orderhistory",
			enabled: true,
			widget: [
				{ i: 'orderHistory', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
			]
		}
	],
	default_layout: {

		management: { i: 'management', x: 0, y: 0, w: 8, h: 12, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },
		transhistory: { i: 'transhistory', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },
		orderjournaltab: { i: 'orderjournaltab', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },
		portfoliotab: { i: 'portfoliotab', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },
		trading: { i: 'trading', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },
		customization: { i: 'customization', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, isDraggable: false, isResizable: false },

		actionRightList: { i: 'actionRightList', x: 2, y: 0, w: 6, h: 4, isDraggable: false, isResizable: false },
		additionSharesInfo: { i: 'additionSharesInfo', x: 2, y: 4, w: 6, h: 4, isDraggable: false, isResizable: false },
		entitlementPanel: { i: 'entitlementPanel', x: 0, y: 0, w: 2, h: 8, isDraggable: false, isResizable: false },
		entitlementHistory: { i: 'entitlementHistory', x: 2, y: 8, w: 6, h: 4, maxH: 15, isDraggable: false, isResizable: false },

		oddLotOrder: { i: 'oddLotOrder', x: 0, y: 0, w: 8, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		oddLotHistory: { i: 'oddLotHistory', x: 0, y: 5, w: 8, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },

		matchOrderBankList: { i: 'matchOrderBankList', x: 2, y: 0, w: 6, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		advanceBankHistory: { i: 'advanceBankHistory', x: 0, y: 5, w: 8, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		advanceBankPanel: { i: 'advanceBankPanel', x: 0, y: 0, w: 2, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		advanceBankPlace: { i: 'advanceBankPlace', x: 0, y: 0, w: 8, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },

		matchOrderList: { i: 'matchOrderList', x: 0, y: 5, w: 8, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		advanceHistory: { i: 'advanceHistory', x: 2, y: 0, w: 6, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },
		advancePanel: { i: 'advancePanel', x: 0, y: 0, w: 2, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, isDraggable: false, isResizable: false },

		orderHistory: { i: 'orderHistory', x: 0, y: 0, w: 8, h: 8, isDraggable: false, isResizable: false },
		cashTransHistory: { i: 'cashTransHistory', x: 0, y: 0, w: 8, h: 8, isDraggable: false, isResizable: false },

		fundTransfer: { i: 'fundTransfer', x: 0, y: 0, w: 8, h: 10, isDraggable: false, isResizable: false },
		fundTransPanel: { i: 'fundTransPanel', x: 0, y: 0, w: 2, h: 10, isDraggable: false, isResizable: false },
		fundTransHistory: { i: 'fundTransHistory', x: 2, y: 0, w: 6, h: 10, isDraggable: false, isResizable: false },

		loanRefundHistory: { i: 'loanRefundHistory', x: 2, y: 5, w: 6, h: 5, isDraggable: false, isResizable: false },
		loanRefundPanel: { i: 'loanRefundPanel', x: 0, y: 0, w: 2, h: 5, isDraggable: false, isResizable: false },
		loanRefundStatus: { i: 'loanRefundStatus', x: 2, y: 0, w: 6, h: 5, isDraggable: false, isResizable: false }
	},

	technical_analysis_setting: {
		mainChartSeries: '',
		inChartList: [],
		subChartList: [],
		interactGraph: {}
	},

	settings: [
		{
			id: 'language',
			icon: 'language',
			value: [
				'vi_VN',
				'en_US'
			]
		},
		{
			id: 'preference',
			icon: 'settings_applications',
			value: []
		},
		{
			id: 'appearance',
			icon: 'font_download',
			value: [
				'light',
				//'blue',
				'dark',
				// 'brown'
			]
		},
		{
			id: 'user',
			icon: 'account_box',
			value: []
		},
		{
			id: 'prompt',
			icon: 'notifications',
			value: []
		}
	]
	,
	profiles: [
		{
			id: 'holderinformation',
			icon: 'account_circle',
			value: [
				'holdername',
				'accountno',
				'email',
				'telephone',
				'address',
				'personalid'
			]
		},
		{
			id: 'personinformation',
			icon: 'supervisor_account',
			value: [
				'authorizedname',
				'idno',
				'telephone',
				'authorization'
			]
		},
		{
			id: 'changepassword',
			icon: 'lock',
			value: [
				'currentpassword',
				'newpassword',
				'retypepassword',
				'save'
			]
		},
		// {
		// 	id: 'warning',
		// 	icon: 'warning',
		// 	value: [
		// 		'expiredate',
		// 		'warndetail1',
		// 		'warndetail2'
		// 	]
		// },
		// {
		// 	id: 'message',
		// 	value: [
		// 		'error',
		// 		'notification',
		// 		'changesuccess',
		// 		'changefailed',
		// 		'passwordincorrect',
		// 		'notmatched',
		// 		'newpassunaccepted',
		// 		'emptypass'
		// 	]
		// }
	]
	,
	cache: {
		stockList: [],
		lang: 'vi_VN',
		theme: 'light'
	},
	tableColReorder: [],
	tableColWidth: [],
	websockID: null,
}

export default config