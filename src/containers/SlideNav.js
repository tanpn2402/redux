import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"

class SlideNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem : config.menu_items

        }
    }

    render() {
        return (
            <div id="slidenav" className="sidenav">
            
                <div className="input-group input-group-search">
                    <input type="text" id="main-menu-search" className="form-control" placeholder="Menu"
                        onChange={e => this.onChange(e.target.value, this.props.language)}/>
                    <span className="input-group-addon">
                        <button type="submit">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>  
                    </span>
                </div>
                
                {
                    this.state.menuitem.map(item => {
                        return(
                            <MenuItem 
                                id={item.id} 
                                subitems={item.subitems} 
                                language={this.props.language} 
                                text={this.props.language[item.text]} 
                                onMenuSelected={this.onMenuSelected.bind(this)}/>
                        )
                    })
                }
                    
          
            </div>
        );
    }

    onMenuSelected(e){
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
        else{
            this.props.onShowMessageBox(3, "Bạn đã mở cửa sổ như vậy rồi")
        }
    }

    onChange(value, language){
        if(value === ']'){
            document.getElementById('main-menu-search').value = 
                document.getElementById('main-menu-search').value.replace(']', '')
            value = ''
        }
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
            this.setState({
                menuitem: list,
            });
        }
        

    }
}

const mapStateToProps = state => ({
    tabList: state.menuSelected.tabList,
    pageId: state.menuSelected.page,
    reload: state.menuSelected.reload,
});

const mapDispatchToProps = (dispatch, props) => ({
    onSelect: (menuid, pageid, tabList, reload) => {
        dispatch(actions.menuSelected(menuid, pageid, tabList, reload));
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideNav)