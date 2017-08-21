import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"

class MenuNav extends Component {

    constructor(props) {
        super(props)
    }

    


    render() {
        console.log(this.props)
        let tabList = this.props.tabList[this.props.page]
        tabList = tabList === undefined ? [] : tabList
        return (
            
            <div className="row tabbar" id="pagemenu">           
                    <div className="main-menu">
                        <span>
                            <button style={this.props.theme.button} type="button" className="btn btn-default" 
                                onClick={this.onOpenMenuPanel.bind(this)}>MENU</button>
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                <button style={this.props.page === '1' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='1' onClick={this.onPageClicked.bind(this)}>1</button>
                                <button style={this.props.page === '2' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='2' onClick={this.onPageClicked.bind(this)}>2</button>
                                <button style={this.props.page === '3' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='3' onClick={this.onPageClicked.bind(this)}>3</button>
                                <button style={this.props.page === '4' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='4' onClick={this.onPageClicked.bind(this)}>4</button>
                            </div>

                        </span>
                    </div>
                    <ul className="nav nav-pills tab-list" role="tablist">
                    {

                        tabList.map(tab => {
                            console.log(tab)
                        return ( 
                            <li id={tab} key={tab}>
                                <a href="javascript:void(0);" role="tab" data-toggle="tab" className="customtab" >
                                    {this.props.language[tab]}
                                    <button
                                    id={tab}
                                    className="close"
                                    type="button"
                                    title="Remove this page"
                                    onClick={this.onRemove.bind(this)}
                                    >
                                    ×
                                    </button>
                                </a>
                            </li>
                        )
                      })
                    }
                    </ul>
                
            </div>
        );
    }

    onRemove(e) {
        this.props.onRemoveTab(
            e.target.id,
            this.props.page,
            this.props.tabList,
            this.props.reload
        );
    }

    onPageClicked(e) {
        var pageId = e.target.id;
        this.props.onPageClicked(pageId, this.props.tabList);
    }

    onOpenMenuPanel(e){
        document.getElementById("overlay").style.display = 'block';
        document.getElementById("slidenav").style.width = "250px";
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

