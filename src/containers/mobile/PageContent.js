import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'

class PageContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            layout : []
        }
    }

    render() {
        let pagebackground = this.props.theme.page == undefined ? undefined : this.props.theme.page.pagebackground
        return (
            <div style={pagebackground} id="pagecontent" className={"pagecontent mobile"}>
                <div className="pagecontent-wrapper" style={{width: "100%", overflowY: "auto"}} 
                    ref={r=> this.Wrapper = r}>
                    <GridLayout 
                        language={this.props.language}
                        layout={ this.state.layout}
                        stockList={this.props.stockList} 
                        theme={this.props.theme}
                        margin={[0, 10]}
                        >
                    </GridLayout>
                </div>
            </div>
        )
    }

    componentWillMount() {
        var tabs = config.mobileTab.filter(el => el.id === "trading" )
        if(tabs.length > 0){
            this.setState({
                layout: tabs[0].widget
            })
        }
        else{
            this.setState({
                layout: []
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.tabID)
        var tabs = config.mobileTab.filter(el => el.id === nextProps.tabID )
        if(tabs.length > 0){
            this.setState({
                layout: tabs[0].widget
            })
        }
        else{
            this.setState({
                layout: config.mobileTab.filter(el => el.id === "trading" )
            })
        }
        this.Wrapper.scrollTop = 0
    }



    componentDidMount() {
        var param = {
            type: 'bycode',
            value: 'all',
            INSTRUMENTNAME: '',
            MARKETID: ''
        }
        this.props.getStockIdList(param)
    }


}

const mapStateToProps = (state, props) => ({
    tabID: state.menuSelected.tabID,
    stockList: state.stock.stockList,
})

const mapDispatchToProps = (dispatch, props) => ({
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
