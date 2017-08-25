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
		        id: 'accountno',
		        text: 'accountno',
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
		        id: 'cashadvance(bank)',
		        text: 'cashadvance(bank)',
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
		orderjournal: {i: 'orderjournal', x:0, y:0, w: 22, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15},
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 30, h: 14, minW: 30, minH: 14, maxW: 30, maxH: 15 },
		orderconfirmation: {i: 'orderconfirmation', x:0, y:0, w: 30, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15, static: false},
		porfolio: {i: 'porfolio', x:0, y:0, w: 30, h: 20, minW: 22, minH: 20, maxW: 30, maxH: 25, static: false, isResizable: false},
		ordershistory: {i: 'ordershistory', x:0, y:0, w: 22, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15},
		stockstatement: {i: 'stockstatement', x:0, y:0, w: 30, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15,},
		cashstatement: {i: 'cashstatement',  x:0, y:0, w: 20, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15},
		watchlist: {i: 'watchlist', x:0, y:0, w: 30, h: 14, minW: 20, minH: 14, maxW: 30, maxH: 14},
		stockmarketinform: {i: 'stockmarketinform', x:0, y:0, w: 3, h:6, minW: 3, minH: 6, maxW: 3, maxH: 6, static: false, isResizable: false },
		personalprofile: {i: 'personalprofile', x:0, y:0, w: 23, h:9, minW: 10, minH: 10, maxW: 25, maxH: 14, static: false, isResizable: false },
		oddlottrading: {i: 'oddlottrading',  x:0, y:0, w: 30, h: 20, minW: 22, minH: 20, maxW: 30, maxH: 25, static: false, isResizable: false},
		cashtransfer: {i: 'cashtransfer', x:0, y:0, w: 30, h: 14, minW: 20, minH: 14, maxW: 30, maxH: 14, static: false, isResizable: false},
		cashadvance: {i: 'cashadvance', x:0, y:0, w: 30, h: 14, minW: 20, minH: 14, maxW: 30, maxH: 15,},
		marginloan: {i: 'marginloan', x:0, y:0, w: 30, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15,},
	
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
	]
}

export default config