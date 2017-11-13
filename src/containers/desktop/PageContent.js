import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Notification from '../main/Notification'
import config from '../../core/config'
import generateWindow from './view'

class PageContent extends React.Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        let pagebackground = this.props.theme.page == undefined ? undefined : this.props.theme.page.pagebackground
        return (
            <div style={pagebackground} id="pagecontent" className={"pagecontent " + this.props.tabID}>
                <Notification theme={this.props.theme} language={this.props.language} />
                {
                    generateWindow(this.props.tabID, this.props)
                }
            </div>
        )
    }



    componentDidMount() {
        var param = {
            type: 'bycode',
            value: 'all',
            INSTRUMENTNAME: '',
            MARKETID: ''
        }
        this.props.getStockIdList(param)
    }


}

const mapStateToProps = (state, props) => ({
    tabID: state.menuSelected.tabID,
    subTabID: state.menuSelected.subTabID,
    stockList: state.stock.stockList,
})

const mapDispatchToProps = (dispatch, props) => ({
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)