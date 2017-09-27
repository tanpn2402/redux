import {InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class InputSearch extends React.Component {
 		
 	constructor(){
 		super()

 		this.state = {
             itemSelected: '',
             data: [],
 		}
     }
     componentWillMount(){
         this.setState({data: this.props.data})
     }
     componentWillReceiveProps(nextProps){
         
     }

  	render() {
    	return (
        	<div className="input-search">
                <div className="input-group input-search-group">
                    <input type="text" className="form-control" value={this.state.itemSelected}
                        onChange={e => this.onChange(e.target.value)}/>
                    <span className="input-group-addon">
                        <button type="button" className="input-suggest-button" onClick={e => this.openSuggestion()}>
                        </button>
                        
                    </span>
                </div>
                
                <div id="input-suggestion" className="input-suggestion-content">
                    <ul>
                        {
                            this.state.data.map(stock => {
                                return (
                                    <li id={stock.stockCode} onClick={e => this.onItemClick(e.target.id)}>
                                        <span id={stock.stockCode} onClick={e => this.onItemClick(e.target.id)}>
                                            <b>{stock.stockCode}</b> - {stock.stockName}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
    	)
    }

    onItemClick(item){
        console.log(item)
        this.setState({ itemSelected: item })
    }

    onChange(value){
        var dropdowns = document.getElementById("input-suggestion");
        if (!dropdowns.classList.contains('show')) {
            dropdowns.classList.add('show')
        }
      
        let matchesFilter = new RegExp(value, "i")

        let tmp = this.props.data.filter(stock => {
            if(matchesFilter.test(stock.stockCode))
                return stock
        })
        tmp.sort(function(a, b) {
            var codeA = a.stockCode.toUpperCase()
            var codeB = b.stockCode.toUpperCase()
            if (codeA < codeB) {
              return -1;
            }
            if (codeA > codeB) {
              return 1;
            }
            return 0;
        })
        if(value.length > 2 && tmp.length > 0){
            this.props.onChange(value.toUpperCase())
        }

        this.setState({itemSelected: value.toUpperCase(), data: tmp})


    }
      
    openSuggestion() {
        document.getElementById("input-suggestion").classList.toggle("show")
    }
    
    componentDidMount(){
        // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.input-suggest-button') ) {
                try{
                    var dropdowns = document.getElementById("input-suggestion");
                    if (dropdowns.classList.contains('show')) {
                        dropdowns.classList.remove('show')
                    }
                }catch(e){}
            }
        }
    }
}
const mapStateToProps = (state, props) => ({
    //stockList: state.stock.stockList,
})
  
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(InputSearch)
