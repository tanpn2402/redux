import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'
import SlideNav from './SlideNav'
import SettingNav from './SettingNav'
import FlashPopup from './commons/FlashPopup'
import MessageBox from './commons/MessageBox'
import Notification from './Notification'

class PageContent extends React.Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div style={this.props.theme.pagebackground} id="pagecontent">
                <Notification language={this.props.language}/>
                <BaseLayout 
                    language={this.props.language}
                    layout={this.props.layout}
                    page={[this.props.page]}
                    title={this.props.title}
                    stockList={this.props.stockList} 
                    theme={this.props.theme}
                    >
                </BaseLayout>
                <SettingNav language={this.props.language} />
                <div id="overlay" onClick={e => this.onHideSlidePanel() }></div>
            </div>
        )
    }

    componentWillReceiveProps(nextProps){
        
    }

    onHideSlidePanel(){
        document.getElementById("slidenav").style.width = "0"
        document.getElementById("settingnav").style.width = "0"
        document.getElementById("overlay").style.display = 'none'
    }   

    componentDidMount(){        
        var h1 = document.getElementById('pageheader').offsetHeight
        var h2 = document.getElementById('pagemenu').offsetHeight
        var h3 = window.innerHeight
        document.getElementById('pagecontent').style.height  = h3 - h1 - h2 +  'px'
        document.getElementById('sidebar').style.height = h3 - h1 - h2 + 'px'
        document.getElementById('slidenav').style.height = h3 - h1 - h2 + 'px'
        document.getElementById('flashpopup').style.height = h3 - h1 - h2 + 'px'

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
  layout: state.menuSelected.tabList,
  page: state.menuSelected.page,
  reload: state.menuSelected.reload,
  stockList: state.stock.stockList,
})

const mapDispatchToProps = (dispatch, props) => ({
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
