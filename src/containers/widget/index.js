import React from 'react'

import Entitlement from './Entitlement'
import AdvancePayment from './AdvancePayment'
import AdvancePaymentBank from './AdvancePaymentBank'

// import PortfolioTab from '../view/PortfolioX'
// import Trading from '../view/Trading'
// import Management from '../view/Management'
// import Customization from '../view/Customization'
// import TransHistory from '../view/TransHistory'
// import OrderJournalTab from '../view/OrderJournalX'

import ActionRightList from './ActionRightList'
import AdditionSharesInfo from './AdditionSharesInfo'
import EntitlementPanel from './EntitlementPanel'
import EntitlementHistory from './EntitlementHistory'
import OddLotOrder from './OddLotOrder'
import OddLot from './OddLot'
import OddLotHistory from './OddLotHistory'

import AdvanceBankPanel from './AdvanceBankPanel'
import MatchOrderBankList from './MatchOrderBankList'
import AdvanceBankHistory from './AdvanceBankHistory'
import AdvanceBankPlace from './AdvanceBankPlace'

import LoanRefund from './LoanRefund'
import LoanRefundPanel from './LoanRefundPanel'
import LoanRefundHistory from './LoanRefundHistory'
import LoanRefundStatus from './LoanRefundStatus'

import AdvancePanel from './AdvancePanel'
import MatchOrderList from './MatchOrderList'
import AdvanceHistory from './AdvanceHistory'
import CashTransHistory from './CashTransHistory'
import OrderHistory from './OrderHistory'
import EnterOrder from './EnterOrder_v3'
import OrderJournal from './OrderJournal'
import StockMarketInfo from './StockMarketInfo'
import AccountInfo from './AccountInfo'
import StockInfo from './StockInfo'

import FundTransfer from './FundTransfer'
import FundTransferHistory from './FundTransferHistory'
import FundTransferPanel from './FundTransferPanel'

import Portfolio from './Portfolio'
import Sumary from './Sumary'
import AccountBalance from './AccountBalance'
import AssetAllocation from './AssetAllocation'
import AssetAllocationChart from './AssetAllocationChart'
import ClientSumary from './ClientSumary'

import TechAnalysis from './TechAnalysis'
import OrderConfirmation from './OrderConfirmation'
import WatchList from './WatchList'
import StockStatement from './StockStatement'
import CashStatement from './CashStatement'
import MarginLoanStatement from './MarginLoanStatement'
import AvailableMargin from './AvailableMargin'
import TransactionHistory from './TransactionHistory'

import BidAskTable from './BidAsk'
import TradeHistory from './TradeHistory'
import WatchListSmall from './WatchListSmall'
import TradeHeader from './TradeHeader'
import TradingChart from './TradingChart'
import PlaceOrder from './PlaceOrder'
import PortfolioSmall from './PortfolioSmall'

// social
import NewsFeed from "./social/NewsFeed"
import MyFiles from "./social/MyFiles"
import GameBoard from "./social/GameBoard"
import UserDetail from "./social/UserDetail"

export default function (menuid, props){
	// console.log(menuid)
	switch(menuid){
		case 'entitlement':
			return (
				<Entitlement language={props.language} theme={props.theme} stockList={props.stockList}/>
			)

		case 'advancePayment':
			return (
				<AdvancePayment language={props.language} theme={props.theme}/>
            )
        case 'advancePaymentBank':
			return (
				<AdvancePaymentBank language={props.language} theme={props.theme}/>
			)


		case 'actionRightList':
			return (
				<ActionRightList stockList={props.stockList} language={props.language} theme={props.theme} stockList={props.stockList}/>
			)
		case 'additionSharesInfo':
			return (
				<AdditionSharesInfo language={props.language} theme={props.theme} theme={props.theme}/>
            )
        case 'entitlementPanel':
			return (
				<EntitlementPanel language={props.language} theme={props.theme} theme={props.theme}/>
			)
		case 'entitlementHistory':
			return (
				<EntitlementHistory stockList={props.stockList} language={props.language} theme={props.theme} theme={props.theme}/>
			)

		case 'oddLotOrder':
			return (
				<OddLotOrder language={props.language} theme={props.theme}/>
			)
		case 'oddLotHistory':
			return (
				<OddLotHistory language={props.language} theme={props.theme}/>
            )
		case 'oddLot':
			return (
				<OddLot language={props.language} theme={props.theme}/>
            )

		case 'matchOrderBankList':
			return (
				<MatchOrderBankList language={props.language} theme={props.theme}/>
			)
		case 'advanceBankHistory':
			return (
				<AdvanceBankHistory language={props.language} theme={props.theme}/>
			)
		case 'advanceBankPanel':
			return (
				<AdvanceBankPanel language={props.language} theme={props.theme}/>
			)
		case 'advanceBankPlace':
			return (
				<AdvanceBankPlace language={props.language} theme={props.theme}/>
            )

		case 'matchOrderList':
			return (
				<MatchOrderList language={props.language} theme={props.theme}/>
			)
		case 'advanceHistory':
			return (
				<AdvanceHistory language={props.language} theme={props.theme}/>
			)
		case 'advancePanel':
			return (
				<AdvancePanel language={props.language} theme={props.theme}/>
            )

		case 'fundTransfer':
			return (
				<FundTransfer language={props.language} theme={props.theme}/>
			)
		case 'fundTransPanel':
			return (
				<FundTransferPanel language={props.language} theme={props.theme}/>
            )
		case 'fundTransHistory':
			return (
				<FundTransferHistory language={props.language} theme={props.theme}/>
            )

		case 'cashTransHistory':
			return (
				<CashTransHistory language={props.language} theme={props.theme}/>
			)
		case 'orderHistory':
			return (
				<OrderHistory language={props.language} theme={props.theme}/>
			)

		case 'enterorder':
			return (
				<EnterOrder stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'orderjournal':
			return (
				<OrderJournal stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'accountinfo':
			return (
				<AccountInfo stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'stockmarketinform':
			return (
				<StockMarketInfo stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'stockinfo':
			return (
				<StockInfo key={"stockinfo" + (new Date()).getTime()} stockList={props.stockList} language={props.language} theme={props.theme}/>				
			)

		case 'portfolio':
			return (
				<Portfolio stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'sumary':
			return (
				<Sumary stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'accountbalance':
			return (
				<AccountBalance stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'assetallocation':
			return (
				<AssetAllocation stockList={props.stockList} language={props.language} theme={props.theme} lite={false}/>
			)
		case 'assetallocationchart':
			return (
				<AssetAllocationChart stockList={props.stockList} language={props.language} theme={props.theme} lite={false} />
			)
		case 'assetallocation-lite':
			return (
				<AssetAllocation stockList={props.stockList} language={props.language} theme={props.theme} lite={true}/>
			)
		case 'clientsumary':
			return (
				<ClientSumary stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
			
		case 'loanrefund':
			return (
				<LoanRefund language={props.language} theme={props.theme}/>
			)
		case 'loanRefundHistory':
			return (
				<LoanRefundHistory language={props.language} theme={props.theme}/>
			)	
		case 'loanRefundPanel':
			return (
				<LoanRefundPanel language={props.language} theme={props.theme}/>
			)
		case 'loanRefundStatus':
			return (
				<LoanRefundStatus language={props.language} theme={props.theme}/>
			)


		case 'techanalysis':
			return (
				<TechAnalysis stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'watchlist':
			return (
				<WatchList stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'orderconfirmation':
			return (
				<OrderConfirmation stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'stockstatement':
			return (
				<StockStatement stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'cashstatement':
			return (
				<CashStatement stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'marginloan':
			return (
				<MarginLoanStatement stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'available':
			return (
				<AvailableMargin stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'transactionhistory':
			return (
				<TransactionHistory stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'bidask':
			return (
				<BidAskTable stockList={props.stockList} language={props.language} theme={props.theme}/>
			)


		case 'tradehistory':
			return (
				<TradeHistory stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'watchlist-small':
			return (
				<WatchListSmall stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'tradeheader':
			return (
				<TradeHeader stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'tradingchart':
			return (
				<TradingChart stockList={props.stockList} language={props.language} theme={props.theme}/>
			)


		case 'placeorder':
			return (
				<PlaceOrder stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'portfolio-small':
			return (
				<PortfolioSmall stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		// ---- SOCICAL
		case 'newsfeed':
			return (
				<NewsFeed stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'myfiles':
			return (
				<MyFiles stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'gameboard':
			return (
				<GameBoard stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

		case 'userdetail':
			return (
				<UserDetail stockList={props.stockList} language={props.language} theme={props.theme}/>
			)

    }
}
