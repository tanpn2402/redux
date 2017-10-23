import React, { Component } from 'react'
import $ from 'jquery'
export default class ScrollingTabs extends Component {

    render() {
        let scrollBtnStyle = this.props.theme.scrolling.button
        return (
            <div className="scrolling-tabs-main scrolling-tabbar">
                <button type="button" className="hks-btn btn-tab-prev search-bar" 
                    onClick={e => this.onTabSlideClick(1)}
                    style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-left" style={{ zIndex: '1' }}></span>
                </button>

               <div className="scroll">
                    <div className="scrolling-tabs" id={"scrolling-tab-" + this.props.id}>
                        <nav className='vertical-align-middle'>
                            {
                                this.props.tabList.map(tab => {
                                    return ( 
                                        <button id={'tab-id-'+tab.id} key={'tab-key-'+tab.id} className={'tabs-item ' + tab.cls + ' tab-' + this.props.id}
                                        onClick={e => this.onTabClick(e, tab.id)}>
                                            {tab.title}
                                        </button>
                                    )
                                })
                            }
                            
                        </nav>
                    </div>
                </div>
                <button type="button" className="hks-btn btn-tab-next search-bar" 
                    onClick={e => this.onTabSlideClick(2)}
                    style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-right"></span>
                </button>
            </div>
        )
    }
    onTabClick(e, tab){
        if(e.target.className.indexOf('disabled') > 0)
            return
        let list = document.getElementsByClassName('tab-' + this.props.id)
        for(var i = 0; i < list.length; i++){
            list[i].className = list[i].className.replace('actived', 'normal')
        }
        e.target.className = e.target.className.replace('normal', 'actived')
        this.props.onTabClick(tab, e)
    }
    onTabSlideClick(i){
        if(i === 1){
            $("#scrolling-tab-" + this.props.id).animate( { scrollLeft: '-=200' }, 500);
        }
        else{
            $("#scrolling-tab-" + this.props.id).animate( { scrollLeft: '+=200' }, 500);
        }
    }
    
}
