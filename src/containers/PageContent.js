import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'
import SlideNav from './SlideNav'
import SettingNav from './SettingNav'
import FlashPopup from './commom/FlashPopup'
import MessageBox from './commom/MessageBox'
class PageContent extends React.Component {
    constructor () {
        super()

        this.state = {
            listMessage: [
                {
                    'id': '1-id',
                    'type': 1,
                    'message': '1',
                },
                {
                    'id': '2-id',
                    'type': 1,
                    'message': '2',
                },
                {
                    'id': '3-id',
                    'type': 1,
                    'message': '3',
                }

            ],
            show: false
        }

    }

    render () {
        console.log("mess type ", this.props.message)

        console.log('PageContent RENDER', this.props)
        
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
                <SlideNav language={this.props.language.menu}/>
                <SettingNav language={this.props.language} />
                <div id="overlay" onClick={e => this.onHideSlidePanel() }></div>

                {/* <div className="flashpopup" id="flashpopup">
                    {

                        this.state.listMessage.map(e => {
                            console.log(e)
                            return(
                                <FlashPopup
                                    id={e.id}
                                    show={true}
                                    message={e.message}
                                    type={e.type}
                                 />
                            )
                        })
                    }
                                

                </div> */}

                <MessageBox message={this.props.message} messageType={this.props.type} 
                    show={this.state.show} onHide={this.onHide.bind(this)}/>
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.message !== '123'){
            this.setState({
                show: true
            })
        }
    }
    onHide(){
        this.setState({
            show: false
        })
    }

    onHideSlidePanel(){
        document.getElementById("slidenav").style.width = "0"
        document.getElementById("settingnav").style.width = "0"
        document.getElementById("overlay").style.display = 'none'

        var s = [
                    {
                        'id': '1-id',
                        'type': 1,
                        'message': '1',
                    }

                ]
        // this.setState({
        //     listMessage: this.state.listMessage.push(s  )
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

        this.props.getStockIdList(param)
    }

    
}

const mapStateToProps = (state, props) => ({
  layout: state.menuSelected.tabList,
  page: state.menuSelected.page,
  reload: state.menuSelected.reload,
  stockList: state.stock.stockList,
  
  // notification
  message: state.notification.message,
  type: state.notification.type,
})

const mapDispatchToProps = (dispatch, props) => ({
   
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
