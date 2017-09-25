import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions'
import config from '../core/config'
import MenuItem from './SideMenu/MenuItem'

class StatusBar extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            searchInputVal: '',
            searchResult: [],
            reload: false
        }

        
    }

	componentWillMount() {
	}

	render() {
        
        const searchResultBox = (
        <div className="widget-search-result">
            {
                this.state.searchResult.map((mainTab,index) => 
                (
                    mainTab.subitems.map((subRs,index)=>
                    <div key={index} onClick={e=> this.gotoResultTab(subRs.data.id, this.props.language)}>{subRs.label}</div>)
                )


                )
            }
        </div>
        )

        return(
            <div id="status-bar">
                <div className="connection-status open">
                    <span className="glyphicon glyphicon-signal"></span>
                </div>
                <div className="widget-search">
                    <input type="text" value={this.state.searchInputVal} className="form-control" placeholder="Menu"
                     onChange={e => this.onChange(e,this.props.language)}/>
                     {(this.state.searchResult.length>0 && this.state.searchInputVal.length>0)?searchResultBox:null}
                </div>


                <div className="user-action">
                    <span className="glyphicon glyphicon-user"></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting.bind(this)}></span>
                    <span className="glyphicon glyphicon-log-out"></span>
                   
                </div>
            </div>

        )
	}

	componentDidMount() {
    }
    
    openSetting(e){
        document.getElementById('settingnav').classList.toggle("open")
    }

    gotoResultTab(subMenuID, language){
        let isTabMenu = false;
        let tabItems = config.tabbar
        tabItems.forEach(item => {
            // console.log("subitem:"+subMenuID)
            // console.log(item.widget)
            var tmp = item.widget.filter(subitem => {
                return subitem.i == subMenuID
            })
            // console.log("this")
            // console.log("result")
            // console.log(tmp)
            if(tmp.length > 0)
            {
                // console.log("FOUND" + item.id)
                this.props.onTabClick(item.id)
                isTabMenu = true
            }
        })

        if (!isTabMenu){
            this.addWidget(subMenuID)
        }
    }

    onChange(e, language){
        // console.log(language.menu["enterorder"])
        let value = e.target.value
        var menuItems = config.menu_items


        //Control text input
        this.setState({
            searchInputVal: value
        })

        if(value === ''){
            this.setState({
                menuitem: config.menu_items,
            }) 
        }
        else{
            var list = []
            
            try{
                var matchesFilter = new RegExp(value, "i")
                menuItems.forEach(item => {
                    // console.log(item.subitems)
                    var tmp = item.subitems.filter(subitem => {
                        var text = language.menu[subitem.text]
                        // console.log(text)
                        if(matchesFilter.test(text))
                            return true
                    })
                    // console.log("this")
                    // console.log(tmp)
                    if(tmp.length > 0)
                    {
                        var result = JSON.parse(JSON.stringify(item))
                        tmp = tmp.map(data=>new Object({label: language.menu[data.id],data: data}))
                        // console.log(result);
                        result['subitems'] = tmp
                        list.push(result)
                    }
                    
                })
            }
            catch(e){}
            // console.log(list)
            this.setState({
                searchResult: list,
            });
        }
        

    }

    addWidget(widgetID){
        this.props.onTabClick("customization") //jump to Customization Tab
        this.props.addWidget(this.props.load, widgetID) //Add the clicked widget
    }

}



const mapStateToProps = (state) => {
	return {
        load: state.menuSelected.load,
        tabID: state.menuSelected.tabID
	}
}



const mapDispatchToProps = (dispatch, props) => ({
    onTabClick: (tabID) => {
        dispatch(actions.onTabClick(tabID));
    },
    addWidget: (load, widgetID) => {
        dispatch(actions.addWidget(load,widgetID))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)