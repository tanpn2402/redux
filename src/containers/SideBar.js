import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"
import Arrow from '../assets/images/right.png'
import Order from '../assets/images/order.png'
import OrderBook from '../assets/images/orderbook.png'
import Portfolio from '../assets/images/porfolio.png'
import Settings from '../assets/images/settings.png'
import Question from '../assets/images/question.png'

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem: config.menu_items

        }
    }

    render() {
        return (
            <div className="sidebar-wrapper " id="sidebar">
                <div className="sidebar-favorite" id="favorite">
                    <img src={Order} alt="Enter Order" /><a href="javascript:void(0)" id='enterorder' onClick={this.onMenuSelected.bind(this)}>
                        {this.props.language.menu.enterorder}
                    </a><br />
                    <img src={OrderBook} alt="Order Book" /><a href="#">Link 2</a><br />
                    <img src={Portfolio} alt="Portfolio" /><a href="#">Link 3</a><br />
                </div>

                <div className="sidebar-footer" id="footer">
                    <div className="sidebar-helping" id="helping">
                        <img src={Question} alt="Help" /><a href="#">Link 4</a><br />
                        <img src={Settings} alt="Setting" /><a href="#">Link 5</a><br />
                    </div>
                    <button onClick={this.Open} className="expandicon"><img src={Arrow} alt="Expand" /></button>
                </div>
            </div>
        );
    }

    Open() {
        document.getElementById('sidebar').classList.toggle('opensidebar');
        document.getElementById('favorite').classList.toggle('opensidebar');
        document.getElementById('helping').classList.toggle('opensidebar');
        document.getElementById('footer').classList.toggle('opensidebar');
    }

    componentDidMount(){
        /*var h1 = document.getElementById('pageheader').offsetHeight
        var h2 = document.getElementById('pagemenu').offsetHeight
        var h3 = window.innerHeight
        
        document.getElementById('sidebar-wrapper').style.height  = h3 - h1 - h2 +  'px'*/

    }

    onMenuSelected(e){
        console.log(e.target.id)
        var eventKey = e.target.id
        var isExist = false;

        for (var i = 1; i <= this.props.tabList.length; i++) {
            if (
                this.props.tabList[i] !== undefined &&
                this.props.tabList[i].filter(el => el === eventKey).length === 1
            ) {
                isExist = true;
                break;
            }
        }

        if (!isExist)
            this.props.onSelect(
                eventKey,
                this.props.pageId,
                this.props.tabList,
                this.props.reload
            );
        else console.log("Exist");
    }

    onChange(value, language){
        
        var menuitems =   config.menu_items

        if(value === ''){
           
            this.setState({
                menuitem: config.menu_items,
            })
            
        }
        else{
            var list = []
            try{
                var matchesFilter = new RegExp(value, "i")
                menuitems.forEach(function(e) {
                    
                    var tmp = e.subitems.filter(el => {
                        var text = language[el.text]
                        if(matchesFilter.test(text))
                            return el
                    })
                    if(tmp.length > 0)
                    {
                        var t = JSON.parse(JSON.stringify(e))
                        t['subitems'] = tmp
                        list.push(t)
                    }
                    
                })
            }
            catch(e){}
            console.log(list)
            this.setState({
                menuitem: list,
            });
        }
        

    }
}

const mapStateToProps = state => ({
    tabList: state.menuSelected.tabList,
    // pageId: state.menuSelected.page,
    reload: state.menuSelected.reload,
});

const mapDispatchToProps = (dispatch, props) => ({
    onSelect: (menuid, pageid, tabList, reload) => {
        dispatch(actions.menuSelected(menuid, pageid, tabList, reload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)