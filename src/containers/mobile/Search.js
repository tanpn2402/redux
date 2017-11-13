import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchResult: [],
            searchValue: ""
        }
        this.onMenuSelected = this.onMenuSelected.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        //console.log(this.props.openSearch, nextProps.openSearch)
        if(!this.props.openSearch && nextProps.openSearch) {
            this.state.searchResult = []
            this.searchInput.value = ""
        }
        //this.state.searchResult = []
        //this.searchInput.value = ""
    }

    render() {
        let language = this.props.language.page.menu
        return ( 
            <div className={"searchmenu " + (this.props.openSearch ? "open" : "hide")}>
                <div className="searchmenu-input">
                    
                    <div className="input">
                        <input ref={node => this.searchInput = node} 
                            className="form-control" placeholder="Menu"
                            onChange={e => this.onChange(e.target.value, language)}/>
                    </div>
                    
                    <div className="header-search">
                        <span className="glyphicon glyphicon-remove" onClick={e => this.onCloseSearch()}></span>
                    </div>
                </div>
                <div className="searchmenu-result">
                    <ul>
                        {
                            this.state.searchResult.map(item => {
                                return (
                                    <li id={item.i} key={item.i} onClick={e => this.onMenuSelected(item.i)}>
                                        {language[item.i.split("-")[0]]}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        this.searchInput.focus()
    }

    onMenuSelected(id){
        this.props.onMobileMenuSelect(id)
        this.props.onCloseSearch(false)
    }

    onChange(value, language) {
        //console.log(value)
        var result = []
        var matchesFilter = new RegExp(value, "i")
        var tabs = config.mobileTab
        tabs.map(tab => {
            var widgets = tab.widget

            widgets.map(wid => {
                var text = language[wid.i.split("-")[0]]
                if (matchesFilter.test(text)) {
                    result.push(wid)
                }
            })
        })
        
        // console.log(result)
        if(result.length > 0){
            this.setState({
                searchResult: result
            })
        }
    }

    onCloseSearch() {
        this.props.onCloseSearch(false)
    }
}

const mapStateToProps = state => ({
    openSearch: state.menuSelected.openSearch,
    load: state.menuSelected.load,
});

const mapDispatchToProps = (dispatch, props) => ({
    onMobileMenuSelect: (id) => {
        dispatch(actions.onMobileMenuSelect(id));
    },
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    },
    onCloseSearch: (open) => { 
        dispatch(actions.openSearch(open)) 
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)