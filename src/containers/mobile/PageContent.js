import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'
import Footer from './Footer'

class PageContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            layout : [],
            reloadTrigger: false
        }
    }

    render() {
        let background = this.props.theme.page.background
        console.log(this.state)
        return (
            <div style={background} id="pagecontent" className={"pagecontent mobile"}>
                <div id="page-wrapper" className="pagecontent-wrapper" style={{width: "100%", overflowY: "auto"}} 
                    ref={r=> this.Wrapper = r}>
                    <GridLayout 
                        key={"grid" + new Date()}
                        language={this.props.language}
                        layout={ this.state.layout}
                        stockList={this.props.stockList} 
                        theme={this.props.theme}
                        margin={[0, 10]}
                        >
                    </GridLayout>

                    <Footer language={this.props.language} theme={this.props.theme}  />
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
        var tabs = config.mobileTab.filter(el => el.id === nextProps.tabID )
        if(tabs.length > 0){
            this.setState({
                layout: tabs[0].widget
            })
        }
        else{
            this.setState({
                layout: config.mobileTab.filter(el => el.id === "trading" ).widget
            })
        }
        if(nextProps.reloadTrigger === this.state.reloadTrigger && this.Wrapper !== null)
            this.Wrapper.scrollTop = 0
        this.state.reloadTrigger = nextProps.reloadTrigger
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
    reloadTrigger: state.menuSelected.reloadTrigger
})

const mapDispatchToProps = (dispatch, props) => ({
    getStockIdList: (param) => {
        dispatch(actions.stockSearch(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
