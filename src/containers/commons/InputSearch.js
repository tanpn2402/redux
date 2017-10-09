import {InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class InputSearch extends React.Component {
 		
 	constructor(){
 		super()

        this.value = ''
        this.data = []
        this.callProps = false

        this.type = 'lg'
        
     }
     componentWillMount(){
         this.setState({data: this.props.data})
         if(this.props.type !== undefined)
            this.type = this.props.type
     }
    componentWillReceiveProps(nextProps){
         
    }

  	render() {
    	return (
        	<div className="input-search">
                <div className="input-group input-search-group">
                    <input type="text" autoComplete="off" id="mvStockId" className="form-control" 
                        ref={e => this.value = e} style={this.props.style}
                        onChange={e => this.onChange(e.target.value)}
                        onBlur={e => this.onBlur(e.target.value)}/>
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
                                    <li id={stock.stockCode} onClick={e => this.onItemClick(stock)}>
                                        <span id={stock.stockCode} onClick={e => this.onItemClick(stock)}>
                                            <b>{stock.stockCode}</b>
                                            {this.type === 'lg' ? ' - ' + stock.stockName : ''}
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
        this.value.value = item.stockCode
        this.callOnChangeProps(item)
    }

    onChange(value){
        this.callProps  = false
        var dropdowns = document.getElementById("input-suggestion");
        if (!dropdowns.classList.contains('show')) {
            dropdowns.classList.add('show')
        }
      
        let matchesFilter = new RegExp(value, "i")

        let tmp = this.props.data.filter(stock => {
            if(matchesFilter.test(stock.stockCode))
                return stock
        })

        // tmp.sort(function(a, b) {
        //     var codeA = a.stockCode.toUpperCase()
        //     var codeB = b.stockCode.toUpperCase()
        //     if (codeA < codeB) {
        //       return -1;
        //     }
        //     if (codeA > codeB) {
        //       return 1;
        //     }
        //     return 0;
        // })
        
        this.value.value = value
        this.setState({data: tmp})

    }

    onBlur(value){
        if(value === '' && this.props.onBlur != undefined){
            this.props.onBlur(value.toUpperCase())
            return
        }

        let matchesFilter = new RegExp(value, "i")
        let tmp = this.props.data.filter(stock => {
            if(matchesFilter.test(stock.stockCode))
                return stock
        })
    
        if(tmp.length > 0){
            this.value.value = tmp[0].stockCode
            this.callOnChangeProps(tmp[0])
            if(this.props.onBlur != undefined){
                this.props.onBlur(tmp[0])
            }
        }
        else if(this.props.onBlur != undefined){
            this.props.onBlur(value.toUpperCase())
        }
    }

    callOnChangeProps(stockInfo){
        //console.log(stockInfo)
        if(!this.callProps){
            this.callProps = true
            this.props.onChange(stockInfo)
        }
    }
      
    openSuggestion() {
        this.callProps = false
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
