import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'
import SlideNav from './SlideNav'
import SettingNav from './SettingNav'
import FlashPopup from './commons/FlashPopup'
import MessageBox from './commons/MessageBox'
class PageContent extends React.Component {
    constructor () {
        super()
        
}

    render () {
        return (
            <div style={this.props.theme.pagebackground} id="pagecontent">
                <BaseLayout 
                    language={this.props.language}
                    layout={this.props.layout}
                    page={[this.props.page]}
                    title={this.props.title}
                    stockList={this.props.stockList} 
                    theme={this.props.theme}
                    >
                </BaseLayout>
                {/* <SlideNav language={this.props.language.menu}/> */}
                <SettingNav language={this.props.language} />
                <div id="overlay" onClick={e => this.onHideSlidePanel() }></div>

                <div className="flashpopup" id="flashpopup">
                    {  
                        this.props.listFlashPopup.map(e => {
                            return(
                                <FlashPopup
                                    id={e.id}
                                    show={true}
                                    message={e.message}
                                    type={e.type}
                                    list={this.list}
                                 />
                            )
                        })
                    }
                </div>

                <MessageBox message={this.props.message} messageType={this.props.type} 
                            show={this.props.showMsg} onHide={this.onHide.bind(this)}/>
            </div>
        );
    }

    
    componentWillReceiveProps(props, nextProps){
       
    }
    componentDidUpdate(){
        if(this.props.msgId!=='0'){
            this.props.listFlashPopup.map(p=>{
                let id = p.id
                setTimeout(function(){
                    document.getElementById(id).style.opacity = '0'
                }, 1500)
                setTimeout(function(){
                    document.getElementById(id).style.display = 'none'
                }, 3000)
            })
        }
    }
   
    
    onHide(){
        this.props.showMessageBox('','',false)
    }

    onHideSlidePanel(){
        document.getElementById("slidenav").style.width = "0"
        document.getElementById("settingnav").style.width = "0"
        document.getElementById("overlay").style.display = 'none'

       
        // this.setState({
        //     listFlashPopup: this.state.listFlashPopup.push(s  )
        // });
/*
        var newDiv = document.createElement("MessageBox")
        console.log(newDiv)
        var currentDiv = document.getElementById("flashpopup")

        document.body.insertBefore(newDiv, currentDiv )*/
    }   

    componentDidMount(){
        var param = {
            type: 'bycode',
            value: 'all',
            INSTRUMENTNAME: '',
            MARKETID: ''
        }
        
        var h1 = document.getElementById('pageheader').offsetHeight
        var h2 = document.getElementById('pagemenu').offsetHeight
        var h3 = window.innerHeight
        document.getElementById('pagecontent').style.height  = h3 - h1 - h2 +  'px'
        document.getElementById('sidebar').style.height = h3 - h1 - h2 + 'px'
        document.getElementById('slidenav').style.height = h3 - h1 - h2 + 'px'
        this.props.getStockIdList(param)

    }

    
}

const mapStateToProps = (state, props) => ({
  layout: state.menuSelected.tabList,
  page: state.menuSelected.page,
  reload: state.menuSelected.reload,
  stockList: state.stock.stockList,
  
  // message box
  message: state.notification.message,
  type: state.notification.type,
  reloadMsg: state.notification.reloadMsg,
  showMsg: state.notification.showMsg,

  // flashpopup
  listFlashPopup: state.notification.listFlashPopup,
  msgId: state.notification.msgId,
})

const mapDispatchToProps = (dispatch, props) => ({
   
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
    showMessageBox: (msgType, msgDetails, reloadMsg, showMsg) => {
        dispatch(actions.showMessageBox(msgType, msgDetails, reloadMsg, showMsg))
      },
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
