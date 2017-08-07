import React from 'react'

export default class ToggleButton extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="left">
            <button type="button" className="navbar-toggle collapsed" 
            data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" 
            aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
        </div>
        )
    }
}