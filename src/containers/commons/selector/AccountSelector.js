import React from 'react'
import { TypeAhead } from 'react-power-select'
import { connect } from 'react-redux'
import * as actions from '../../../actions'


class AccountSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: {}
        }
    }

    handleValueChange = ({ option }) => {
        if(this.props.global) {
            this.props.switchAccount(option)
        }
        if(this.props.handleChange && option && option !== "---") {
            this.props.handleChange(option)
        }
    }

    getCurrentTrdAccount() {
        return  this.props.currentTrdAccount
    }

    getTrdAccountList() {
        return this.props.tradingAccounts
    }

    render() {
        let options = ["---"]
        let {theme, tradingAccounts, className, style, showDetail, showName, currentTrdAccount, selected} = this.props
        if(tradingAccounts.length > 0) 
            options = tradingAccounts
        if(selected == null) {
            selected = currentTrdAccount
        }

        console.log(options)
        return (
            <div className={"trd-account " + className}>
                <div className={"select-control account-selector "} style={style}>
                    <TypeAhead
                        options={options}
                        selected={selected}
                        onChange={this.handleValueChange.bind(this)}
                        optionLabelPath="subAccountID"
                        showClear={false}
                    />
                </div>
                <div style={theme.font.main} className="account-name">
                    {
                        showName ? <span>{selected.subAccountName}</span> : null
                    }
                    {
                        showDetail ? <span className="info-icon">
                                <span className="glyphicon glyphicon-info-sign" onClick={e => this.showAccBalance()}></span>
                            </span> : null
                    }
                </div>
            </div>
        )
    }

    showAccBalance() {
        this.props.showAccBalance({
            data: {},
            title: this.props.language.menu.accountbalance ,
            language: this.props.language,
            theme: this.props.theme,
            id: 'accountbalance',
            authcard: false
        })
    }
}

AccountSelector.defaultProps = {
    tradingAccounts: [],
    currentTrdAccount: {},
    style: {},
    theme: {},
    language: {},
    showName: true,
    showDetail: true,
    className: "",
    selected: null,
    global: false
}

const mapStateToProps = (state) => {
    return {
        tradingAccounts: state.dologin.tradingAccounts,
        currentTrdAccount: state.dologin.currentTrdAccount,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    showAccBalance: (param) => {
        dispatch(actions.showPopup(param))
    },
    switchAccount: (acc) => {
        dispatch(actions.switchAccount(acc))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector)