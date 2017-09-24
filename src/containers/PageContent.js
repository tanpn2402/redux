import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'
import SlideNav from './SlideNav'
import SettingNav from './SettingNav'
import FlashPopup from './commons/FlashPopup'
import MessageBox from './commons/MessageBox'
import Notification from './Notification'
import config from '../core/config'
import generateWindow from './view'

class PageContent extends React.Component {
    constructor () {
        super()
        this.layout = []
    }

    componentWillReceiveProps(nextProps){
        this.layout = []
        var tab = config.tabbar.filter(e => e.id === nextProps.tabID)
        if(tab.length > 0){
            var list = tab[0].widget    
            for(var i = 0; i < list.length; i++){
                this.layout.push(config.default_layout[list[i]])
            }
        }


    }

    render () {
        console.log(this.props.tabID)

        return (
            <div style={this.props.theme.pagebackground} id="pagecontent" className={"pagecontent " + this.props.tabID}>

                {
                    generateWindow(this.props.tabID, this.props)
                }
            </div>
        )
    }

    

    componentDidMount(){     
        var param = {
            type: 'bycode',
            value: 'all',
            INSTRUMENTNAME: '',
            MARKETID: ''
        }
        //this.props.getStockIdList(param)
    }

    
}

const mapStateToProps = (state, props) => ({
    tabID: state.menuSelected.tabID,
    stockList: state.stock.stockList,
})

const mapDispatchToProps = (dispatch, props) => ({
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
