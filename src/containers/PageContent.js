import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'

class PageContent extends React.Component {
    constructor () {
        super()
    }

    render () {
        console.log('PageContent RENDER', this.props)
        return (
            <div /*style={{ backgroundColor: '#000', height: '100%',}}*/ >
                <BaseLayout 
                    language={this.props.language}
                    layout={this.props.layout}
                    page={[this.props.page]}
                    title={this.props.title}
                    stockList={this.props.stockList} 
                    theme={this.props.theme}
                    >
                </BaseLayout>
            </div>
        );
    }

    componentDidMount(){
        this.props.getStockIdList('vi')
    }

    
}

const mapStateToProps = (state, props) => ({
  layout: state.menuSelected.tabList,
  page: state.menuSelected.page,
  reload: state.menuSelected.reload,
  stockList: state.stock.stockList,
  
})

const mapDispatchToProps = (dispatch, props) => ({
   
    getStockIdList: (language) => {
        dispatch(actions.stockSearch(language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
