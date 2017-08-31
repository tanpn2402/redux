import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"
import $ from 'jquery'
import SlideNav from './SlideNav'

class MenuNav extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        let tabList = this.props.tabList[this.props.page]
        tabList = tabList === undefined ? [] : tabList

        return (
            <div className="scrolling-tabs-main" id="pagemenu">
               <div className="scrolling-tabs-left">
                    <button className="hks-btn btn-main-menu" onClick={e => this.onOpenMenuPanel()} >
                        <span className="glyphicon glyphicon-list"></span> Menu
                   </button>
                    <div className="btn-group btn-group-sm btn-group-page" role="group" aria-label="...">
                        <button style={this.props.page === '1' ? this.props.theme.buttonClicked : this.props.theme.button} className="hks-btn btn-page" id='1' onClick={this.onPageClicked.bind(this)}>1</button>
                        <button style={this.props.page === '2' ? this.props.theme.buttonClicked : this.props.theme.button} className="hks-btn btn-page" id='2' onClick={this.onPageClicked.bind(this)}>2</button>
                        <button style={this.props.page === '3' ? this.props.theme.buttonClicked : this.props.theme.button} className="hks-btn btn-page" id='3' onClick={this.onPageClicked.bind(this)}>3</button>
                        <button style={this.props.page === '4' ? this.props.theme.buttonClicked : this.props.theme.button} className="hks-btn btn-page" id='4' onClick={this.onPageClicked.bind(this)}>4</button>
                     </div>
                    <button className="hks-btn btn-tab-prev" onClick={e => this.onTabSlideClick(1)}>
                        <span className="glyphicon glyphicon-menu-left" style={{zIndex: '1'}}></span>
                    </button>
                    <SlideNav language={this.props.language} />
               </div>
               <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                tabList.map(tab => {
                                    console.log(tab)
                                    return ( 
                                        <span id={tab} key={tab} className='tabs-item'>
                                            {this.props.language[tab]}
                                            <button
                                                id={tab}
                                                className="hks-btn btn-tab-close"
                                                type="button"
                                                // title="Remove this page"
                                                onClick={e => this.onRemove(e.target.id)}
                                                >
                                                ×
                                            </button>
                                        </span>
                                    )
                                })
                            }
                            
                        </nav>
                    </div>
                </div>
                <div className="scrolling-tabs-right">
                    <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)}>
                        <span className="glyphicon glyphicon-menu-right"></span>
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount(){
        window.addEventListener("keydown", this.myEventHandler, false)
    }

    onTabSlideClick(i){
        if(i === 1){
            $("#scrolling-tabs").animate( { scrollLeft: '-=100' }, 500);
        }
        else{
            $("#scrolling-tabs").animate( { scrollLeft: '+=100' }, 500);
        }
    }

    onRemove(e) {
        this.props.onRemoveTab(
            e,
            this.props.page,
            this.props.tabList,
            this.props.reload
        );
    }

    onPageClicked(e) {
        var pageId = e.target.id;
        this.props.onPageClicked(pageId, this.props.tabList);
    }

    onOpenMenuPanel(){
        document.getElementById("overlay").style.display = 'block'
        document.getElementById("slidenav").style.width = "250px"
        document.getElementById("slidenav").style.width = document.getElementById("pagecontent").offsetHeight
        document.getElementById("main-menu-search").focus()
    }
    myEventHandler(e){
        var keyCode = e.keyCode;
        //console.log(keyCode)
        if(keyCode === 221){
            document.getElementById("overlay").style.display = 'block'
            document.getElementById("slidenav").style.width = "250px"
            document.getElementById("main-menu-search").focus()
            document.getElementById("main-menu-search").value = ''
        }
        else if(keyCode === 27){
            document.getElementById("overlay").style.display = 'none'
            document.getElementById("slidenav").style.width = "0px"
        }
        else if(keyCode === 219){
            document.getElementById('sidebar').classList.toggle('opensidebar');
            document.getElementById('favorite').classList.toggle('opensidebar');
            document.getElementById('helping').classList.toggle('opensidebar');
            document.getElementById('footer').classList.toggle('opensidebar');
        }
    }

}

const mapStateToProps = state => ({
    tabList: state.menuSelected.tabList,
    page: state.menuSelected.page,
    reload: state.menuSelected.reload,
});

const mapDispatchToProps = (dispatch, props) => ({
    
    onRemoveTab: (menuid, pageid, tabList, reload) => {
        dispatch(actions.menuRemoved(menuid, pageid, tabList, reload));
    },

    onPageClicked: (pageid, tabList) => {
        dispatch(actions.onPageClicked(pageid, tabList));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);   

