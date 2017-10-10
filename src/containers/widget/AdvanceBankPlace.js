import React from 'react'
import generateWindow from '../widget'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from '../../core/config'
import AdvanceBankPanel from './AdvanceBankPanel'
import MatchOrderBankList from './MatchOrderBankList'
import * as Utils from '../../utils'

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout  = require('react-grid-layout').Responsive
ResponsiveReactGridLayout  = WidthProvider(ResponsiveReactGridLayout )

class AdvanceBankPlace extends React.Component {
    
    constructor () {
        super()
        this.layoutCols =  {lg: 8, md: 8, sm: 8, xs: 2, xxs: 2}

        this.layout= [
            config.default_layout['matchOrderBankList'],
            config.default_layout['advanceBankPanel']
        ]

        this.state = {
            advAvailable: 0,
            panelData: {
                cOrderIDArray: [],
                cContractIDArray: [],
                cTovalValue: 0,
                cAmount: 0,
                cMaxAmt: 0,
                cCurrencySymbol: "",
                cBankIDHF: "",
                cBankACIDHF: "",
                cTPLUSXHF: ""
            },

            
        }

        this.rowSelected = []
        this.selectAll = false


    }

    componentDidMount() {
        this.props.getqueryBankInfo({key : (new Date()).getTime()})
    }

    componentWillUnmount(){
        //this.props.paymentSelectionChange([])
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.bankInfo.mvBankInfoList.length > 0){
            var params = {
                'mvBankID' : nextProps.bankInfo.mvBankInfoList[0].mvBankID,
                'mvSettlement' : "3T"
            }
            this.props.getqueryAdvancePaymentInfo(params)
        }
    }

    onPaymentChange(list, all){
        this.resetPanelData()
        this.rowSelected = list
        this.selectAll = all

        if(list.length > 0){
            this.state.panelData.cTovalValue = 0;
            this.state.panelData.cOrderIDArray = new Array()
            this.state.panelData.cContractIDArray = new Array()

            for (var i = 0; i < list.length; i++) {
                this.state.panelData.cOrderIDArray[i] = list[i].mvOrderID
                this.state.panelData.cContractIDArray[i] = list[i].mvContractID
                this.state.panelData.cTovalValue += parseFloat(list[i].mvAvailableAmount)
                this.state.panelData.cTPLUSXHF = list[i].mvSettleDay
            }
        }

        // set value to advance panel
        this.setState({ advAvailable: this.state.panelData.cTovalValue })

    }

    resetPanelData(){
        this.state.panelData = {
            cOrderIDArray: [],
            cContractIDArray: [],
            cTovalValue: 0,
            cAmount: 0,
            cMaxAmt: 0,
            cCurrencySymbol: "",
            cBankIDHF: "",
            cBankACIDHF: "",
            cTPLUSXHF: ""
        }
    }

    getAdvanceOrderData(bank){
        this.resetPanelData()
        this.rowSelected = []
        this.selectAll = false
        this.state.panelData.cBankIDHF = bank
        var stleDay = "3T"
        var params = {
            'mvBankID' : bank,
            'mvSettlement' : stleDay
        }

        this.props.getqueryAdvancePaymentInfo(params)
        this.setState({ advAvailable: this.state.panelData.cTovalValue })
    }




    generateMatchOrder(){
        var layout = this.layout[0]
        return (
            <div key={layout['i']} 
                data-grid={{x: layout['x'], y: layout['y'], w: layout['w'], 
                    h: layout['h'], minW: layout['minW'], minH: layout['minH'], 
                    maxW: layout['maxW'], maxH: layout['maxH'], isDraggable: layout['isDraggable'],
                    isResizable: layout['isResizable']}}>

                    <MatchOrderBankList 
                        language={this.props.language} 
                        theme={this.props.theme}
                        rowSelected={this.rowSelected}
                        selectAll={this.selectAll}
                        onPaymentChange={this.onPaymentChange.bind(this)}/>
            </div>
        )
    }

    generatePanel(){
        var layout = this.layout[1]
        return (
            <div key={layout['i']} 
                data-grid={{x: layout['x'], y: layout['y'], w: layout['w'], 
                    h: layout['h'], minW: layout['minW'], minH: layout['minH'], 
                    maxW: layout['maxW'], maxH: layout['maxH'], isDraggable: layout['isDraggable'],
                    isResizable: layout['isResizable']}}>

                    <AdvanceBankPanel 
                        ref={e => this.adPanel = e}
                        language={this.props.language} 
                        theme={this.props.theme}
                        bankInfo={this.props.bankInfo}
                        data={this.state.panelData}
                        getAdvanceOrderData={this.getAdvanceOrderData.bind(this)}
                        />
            </div>
        )
    }

    render () {
        return (
            <ResponsiveReactGridLayout className="layout" cols={this.layoutCols} rowHeight={53} width={1320} margin={[3, 2]}>
                { this.generatePanel() }
                { this.generateMatchOrder() }
            </ResponsiveReactGridLayout>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        bankInfo: state.cashadvancebank.queryBankInfo,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getqueryAdvancePaymentInfo: (params) => {
        dispatch(actions.getqueryAdvancePaymentInfo(params))
    },
    getqueryBankInfo: (params) => {
        dispatch(actions.getqueryBankInfo(params))
    },
    
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceBankPlace)