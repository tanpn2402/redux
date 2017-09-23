const config = {
	menu_items : [
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
		      {
		        id: 'stockmarketinform',
		        text: 'stockmarketinform',
		        link: ''
		      },
		      {
		        id: 'watchlist',
		        text: 'watchlist',
		        link: ''
		      },
		      {
		        id: 'orderjournal',
		        text: 'orderjournal',
		        link: ''
		      },
		      {
		        id: 'accountinfo',
		        text: 'accountinfo',
		        link: ''
		      },
		      {
		        id: 'porfolio',
		        text: 'porfolio',
		        link: ''
		      },
					{
						id: "techanalysis",
						text: "techanalysis",
						link: ''
					},
					{
						id: "orderconfirmation",
						text: "orderconfirmation",
						link: ''
					},	
		    ]
		},
		{
		    id: 'account',
		    text: 'account',
		    link: '',
		    subitems: [
		      {
		        id: 'ordershistory',
		        text: 'ordershistory',
		        link: ''
		      },
		      {
		        id: 'cashtransactionhistory',
		        text: 'cashtransactionhistory',
		        link: ''
		      },
		      {
		        id: 'cashstatement',
		        text: 'cashstatement',
		        link: ''
		      },
		      {
		        id: 'stockstatement',
		        text: 'stockstatement',
		        link: ''
		      },
		      {
		        id: 'marginloan',
		        text: 'marginloan',
		        link: ''
		      },
		      {
		        id: 'personalprofile',
		        text: 'personalprofile',
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
		        id: 'cashtransfer',
		        text: 'cashtransfer',
		        link: ''
		      },
		      {
		        id: 'cashadvance',
		        text: 'cashadvance',
		        link: ''
		      },
		      {
		        id: 'cashadvancebank',
		        text: 'cashadvancebank',
		        link: ''
		      },
		      {
		        id: 'oddlottrading',
		        text: 'oddlottrading',
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
		},
		{
		    id: 'help',
		    text: 'help',
		    link: '',
		    subitems: [
		      {
		        id: 'available',
		        text: 'available',
		        link: ''
		      }
		    ]
		}
	],

	layoutdefault : {
		enterorder: {i: 'enterorder', x:0, y:0, w: 2, h: 6, minW: 1, minH: 6, maxW: 30, maxH: 15, isResizable: false},
		orderjournal: {i: 'orderjournal', x:0, y:0, w: 8, h: 4, minW: 8, minH: 4, maxW: 8, maxH: 10},
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		orderconfirmation: { i: 'orderconfirmation', x: 0, y: 0, w: 8, h: 8, minW: 4, minH: 6, maxW: 8, maxH: 11, static: false },
		porfolio: {i: 'porfolio', x:0, y:0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 20, static: false, isResizable: true},
		ordershistory: { i: 'ordershistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		stockstatement: { i: 'stockstatement', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		cashstatement: { i: 'cashstatement', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		watchlist: {i: 'watchlist', x:0, y:0, w: 6, h: 8, minW: 6, minH: 8, maxW: 8, maxH: 10, static: false, isResizable: true},
		stockmarketinform: {i: 'stockmarketinform', x:0, y:0, w: 3, h:6, minW: 3, minH: 6, maxW: 3, maxH: 6, static: false, isResizable: false },
		personalprofile: {i: 'personalprofile', x:0, y:0, w: 6, h:6, minW: 6, minH: 6, maxW: 6, maxH: 6, static: false, isResizable: false },
		oddlottrading: {i: 'oddlottrading',  x:0, y:0, w: 8, h: 10, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false},
		cashtransfer: {i: 'cashtransfer', x:0, y:0, w: 8, h: 10, minW: 5, minH: 6, maxW: 8, maxH: 10, static: false, isResizable: true},
		cashadvance: {i: 'cashadvance', x:0, y:0, w: 8, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 10, static: false, isResizable: true},
		marginloan: { i: 'marginloan', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		available: { i: 'available', x: 0, y: 0, w: 4, h: 6, minW: 4, minH: 6, maxW: 8, maxH: 8, static: false, isResizable: true },
		accountinfo: {i: 'accountinfo', x:0, y:0, w: 3, h: 6, minW: 3, minH: 6, maxW: 8, maxH: 8, static: false, isResizable: true},
		loanrefund: {i: 'loanrefund',  x:0, y:0, w: 30, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 12, static: false, isResizable: true},
		entitlement: {i: 'entitlement', x:0, y:0, w: 30, h: 12, minW: 8, minH: 8, maxW: 8, maxH: 14, isResizable: true},
		techanalysis: {i: 'techanalysis', x:0, y:0, w: 8, h: 6, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: true},
		cashadvancebank: {i: 'cashadvancebank', x:0, y:0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, static: false, isResizable: true},
		
	},
	layoutdefault_sm : {
		enterorder: {i: 'enterorder', x:0, y:0, w: 2, h: 6, minW: 1, minH: 6, maxW: 30, maxH: 15, isResizable: false},
		orderjournal: {i: 'orderjournal', x:0, y:0, w: 8, h: 4, minW: 8, minH: 4, maxW: 8, maxH: 10},
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 7, h: 9, minW: 5, minH: 10, maxW: 8, maxH: 10 },
		orderconfirmation: {i: 'orderconfirmation', x:0, y:0, w: 8, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15, static: false},
		porfolio: {i: 'porfolio', x:0, y:0, w: 8, h: 16, minW: 6, minH: 16, maxW: 8, maxH: 20, static: false, isResizable: true},
		ordershistory: {i: 'ordershistory', x:0, y:0, w: 22, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15},
		stockstatement: {i: 'stockstatement', x:0, y:0, w: 30, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15,},
		cashstatement: {i: 'cashstatement',  x:0, y:0, w: 20, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15},
		watchlist: {i: 'watchlist', x:0, y:0, w: 6, h: 8, minW: 6, minH: 8, maxW: 8, maxH: 8},
		stockmarketinform: {i: 'stockmarketinform', x:0, y:0, w: 3, h:10, minW: 3, minH: 6, maxW: 3, maxH: 6, static: false, isResizable: false },
		personalprofile: {i: 'personalprofile', x:0, y:0, w: 6, h:6, minW: 6, minH: 6, maxW: 6, maxH: 6, static: false, isResizable: false },
		oddlottrading: {i: 'oddlottrading',  x:0, y:0, w: 8, h: 12, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false},
		cashtransfer: {i: 'cashtransfer', x:0, y:0, w: 8, h: 12, minW: 8, minH: 8, maxW: 8, maxH: 8, static: false, isResizable: false},
		cashadvance: {i: 'cashadvance', x:0, y:0, w: 8, h: 12, minW: 8, minH: 10, maxW: 8, maxH: 10, static: false, isResizable: false},
		marginloan: {i: 'marginloan', x:0, y:0, w: 30, h: 9, minW: 22, minH: 14, maxW: 30, maxH: 15,},
		available : {i: 'available', x:0, y:0, w: 4, h: 8, minW: 4, minH: 8, maxW: 8, maxH: 6, static: false, isResizable: false},
		accountinfo: {i: 'accountinfo', x:0, y:0, w: 3, h: 6, minW: 3, minH: 6, maxW: 8, maxH: 6, static: false, isResizable: true},
		loanrefund: {i: 'loanrefund',  x:0, y:0, w: 30, h: 18, minW: 22, minH: 20, maxW: 30, maxH: 25, static: false, isResizable: false},
		entitlement: {i: 'entitlement', x:0, y:0, w: 30, h: 18, minW: 22, minH: 20, maxW: 30, maxH: 25, isResizable: false},
		techanalysis: {i: 'techanalysis', x:0, y:0, w: 8, h: 6, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: true},
		cashadvancebank: {i: 'cashadvancebank', x:0, y:0, w: 8, h: 16, minW: 8, minH: 6, maxW: 8, maxH: 8, isResizable: false},
		
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
		'all',
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
		'HO': [
			'L',
			'O',
			'C',
			'M'
		],
		'HA': [
			'L',
			'B',
			'Z',
			'R',
			'C',
			'LO'
		]
	},

	marketid: [
		"HA",
		"HO",
		"UPCOM"
	],

	tabbar: [
		{
			id: "trading",
			title: "trading",
			widget: [
				'enterorder',
				'stockmarketinform',
				'orderjournal',
				'accountinfo'
			]
		},
		{
			id: 'portfoliotab',
			title: "portfolio",
			widget: [
				'portfolio'
			]
		},
		{
			id: 'orderjournaltab',
			title: "orderjournal",
			widget: [
				'orderjournal'
			]
		},
		{
			id: 'transhistory',
			title: "transhistory",
			widget: [
				'cashtransactionhistory',
				'ordershistory'
			]
		},
		{
			id: 'management',
			title: "management",
			widget: [
				'cashtransfer',
				'cashadvance',
				'cashadvancebank',
				'oddlottrading',
				'entitlement', 
				'loanrefund',
				// 'available'
				//'management'
			]
		},
		{
			id: 'customization',
			title: "customization",
			widget:['techanalysis']
		}
	],

	default_layout: {
		enterorder: {i: 'enterorder', x:0, y:0, w: 2, h: 6, minW: 1, minH: 6, maxW: 30, maxH: 15, static: true, isResizable: false},
		stockmarketinform: {i: 'stockmarketinform', x:5, y:0, w: 3, h:6, minW: 3, minH: 6, maxW: 3, maxH: 6, static: true, isResizable: false },
		accountinfo: {i: 'accountinfo', x:2, y:0, w: 3, h: 6, minW: 3, minH: 6, maxW: 8, maxH: 8, static: true, isResizable: false},
		orderjournal: {i: 'orderjournal', x:0, y:6, w: 8, h: 4, minW: 8, minH: 4, maxW: 8, maxH: 10, static: true, isResizable: false},


		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11 },
		orderconfirmation: { i: 'orderconfirmation', x: 0, y: 0, w: 8, h: 8, minW: 4, minH: 6, maxW: 8, maxH: 11, static: true },
		portfolio: {i: 'portfolio', x:0, y:0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 20, static: true, isResizable: false},
		ordershistory: { i: 'ordershistory', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11, static: true, isResizable: false },
		stockstatement: { i: 'stockstatement', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11, static: true, isResizable: false },
		cashstatement: { i: 'cashstatement', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11, static: true, isResizable: false },
		watchlist: {i: 'watchlist', x:0, y:0, w: 6, h: 8, minW: 6, minH: 8, maxW: 8, maxH: 10, static: true, isResizable: false},
		personalprofile: {i: 'personalprofile', x:0, y:0, w: 6, h:6, minW: 6, minH: 6, maxW: 6, maxH: 6, static: true, isResizable: false },
		oddlottrading: {i: 'oddlottrading',  x:0, y:0, w: 8, h: 10, minW: 8, minH: 10, maxW: 8, maxH: 10, static: true, isResizable: false},
		cashtransfer: {i: 'cashtransfer', x:0, y:0, w: 8, h: 10, minW: 5, minH: 6, maxW: 8, maxH: 10, static: true, isResizable: false},
		cashadvance: {i: 'cashadvance', x:0, y:0, w: 8, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 10, static: true, isResizable: false},
		marginloan: { i: 'marginloan', x: 0, y: 0, w: 8, h: 8, minW: 6, minH: 6, maxW: 8, maxH: 11, static: true, isResizable: false },
		available: { i: 'available', x: 0, y: 0, w: 4, h: 6, minW: 4, minH: 6, maxW: 8, maxH: 8, static: true, isResizable: false },
		loanrefund: {i: 'loanrefund',  x:0, y:0, w: 30, h: 10, minW: 6, minH: 8, maxW: 8, maxH: 12, static: true, isResizable: false},
		entitlement: {i: 'entitlement', x:0, y:0, w: 30, h: 12, minW: 8, minH: 8, maxW: 8, maxH: 14, static: true, isResizable: false},
		techanalysis: {i: 'techanalysis', x:0, y:0, w: 8, h: 6, minW: 8, minH: 6, maxW: 8, maxH: 8, static: true, isResizable: false},
		cashadvancebank: {i: 'cashadvancebank', x:0, y:0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, static: false, isResizable: true},
		management: {i: 'management', x:0, y:0, w: 8, h: 10, minW: 6, minH: 10, maxW: 8, maxH: 14, static: true, isResizable: false},

		actionRightList: {i: 'actionRightList', x:2, y:0, w: 6, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, static: true, isResizable: false},
		additionSharesInfo: {i: 'additionSharesInfo', x:2, y:5, w: 6, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, static: true, isResizable: false},
		entitlementPanel: {i: 'entitlementPanel', x:0, y:0, w: 2, h: 10, minW: 1, minH: 6, maxW: 30, maxH: 15, static: true, isResizable: false},
		entitlementHistory: {i: 'entitlementHistory', x:2, y:10, w: 6, h: 5, minW: 1, minH: 6, maxW: 30, maxH: 15, static: true, isResizable: false},
		
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
				'blue',
				'dark'
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
}

export default config