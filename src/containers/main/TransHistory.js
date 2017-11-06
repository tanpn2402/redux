import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TabLayout from '../main/TabLayout'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../widget/AdvanceBankHistory'
class TransHistory extends Component {
	constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.getLayout(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.getLayout(nextProps)
    }	

    getLayout(props){
        // this.layout = []
        // var tab = config.tabbar.filter(e => e.id === props.tabID)
        // if(tab.length > 0){
        //     var list = tab[0].widget    
        //     for(var i = 0; i < list.length; i++){
        //         this.layout.push(config.default_layout[list[i]])
        //     }
        // }
    }

    render(){
        return(
            <div id="transhistory">
                <Table theme={this.props.theme}
                language={this.props.language}
                theme={this.props.theme}/>
                {/* <div className="widget-header" >
                    <span className="widget-title">
                        "ASDS"
                    </span>
                    <div className="widget-action">
                        <ul>
                            <li className="btn-close">
                                <span className="glyphicon glyphicon-repeat"></span>
                            </li>
                        </ul>
                    </div>
                </div> */}

                {/* <div className="widget-child-header">
                    <div className="col-md-4">
                        

                    </div>
                    <div className="col-md-6">
                        

                    </div>
                </div>

                <GridLayout 
                    language={this.props.language}
                    layout={this.layout}
                    stockList={this.props.stockList} 
                    theme={this.props.theme}
                    >
                </GridLayout> */}
            </div>
        )

    }

    componentDidMount() {
    }
}

const mapStateToProps = (state) => {
  	return {
  	}
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TransHistory)
