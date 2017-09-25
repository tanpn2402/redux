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
            menuitem: config.menu_items,
            searchInputVal: '',
            searchResult: []
        }
    }

	componentWillMount() {
	}

	render() {
        const searchResultBox = (this.state.searchResult.length>0)?
        <div className="widget-search-result">
            {
                this.state.searchResult.map((result,index) => 
                    <div key={index}>
                        <div>{result.id}</div>
                        <div>
                            {
                                this.state.searchResult.map((subRs,index)=>
                                <div>{subRs.id}</div>)
                            } 
                        </div>
                    </div>
                )
            }
        </div>:null

        return(
            <div id="status-bar">
                <div className="connection-status open">
                    <span className="glyphicon glyphicon-signal"></span>
                </div>
                <div className="widget-search">
                    <input type="text" value={this.state.searchInputVal} className="form-control" placeholder="Menu"
                     onChange={e => this.onChange(e,this.props.language)}/>
                     {searchResultBox}
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

    onChange(e, language){
        console.log("aa")
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
                        var text = language[subitem.text]
                        if(matchesFilter.test(text))
                            return subitem
                    })
                    // console.log("this")
                    // console.log(tmp)
                    if(tmp.length > 0)
                    {
                        var result = JSON.parse(JSON.stringify(item))
                        console.log(result);
                        result['subitems'] = tmp
                        list.push(result)
                    }
                    
                })
            }
            catch(e){}
            console.log(list)
            this.setState({
                searchResult: list,
            });
        }
        

    }

}


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)