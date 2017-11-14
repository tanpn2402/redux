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
        let background = this.props.theme.page.background
        return (
            <div style={background} id="pagecontent" className={"pagecontent " + this.props.tabID}>
                <div id="page-wrapper" className="pagecontent-wrapper" style={{width: "100%", overflowY: "auto"}} 
                    ref={r=> this.Wrapper = r}>
                    <Notification theme={this.props.theme} language={this.props.language} />
                    {
                        generateWindow(this.props.tabID, this.props)
                    }

                    {/* Footer here */}
                </div>
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
