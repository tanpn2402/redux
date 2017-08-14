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
		        text: 'portfolio',
		        link: ''
		      }
		    ]
		},
		{
		    id: 'account',
		    text: 'account',
		    link: '',
		    subitems: [
		      {
		        id: 'matchingordershistory',
		        text: 'matchingordershistory',
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
		        id: 'marginloanstatement',
		        text: 'marginloanstatement',
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
		enterorder: {i: 'enterorder', x:0, y:0, w: 8, h: 14, minW: 8, minH: 14, maxW: 30, maxH: 15},
		orderjournal: {i: 'orderjournal', x:0, y:0, w: 22, h: 14, minW: 22, minH: 14, maxW: 30, maxH: 15},
		cashtransactionhistory: { i: 'cashtransactionhistory', x: 0, y: 0, w: 30, h: 14, minW: 30, minH: 14, maxW: 30, maxH: 15 },
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