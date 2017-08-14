import React from 'react';
import BaseLayout from './BaseLayout.js';
import { connect } from 'react-redux'
import * as actions from '../actions'

class PageContent extends React.Component {
    constructor () {
        super()
    }

    render () {
        console.log('PageContent', this.props)
        return (
            <div>
                <BaseLayout 
                    language={this.props.language}
                    layout={this.props.mvLayout[this.props.mvPage]}
                    theme={this.props.theme}
                    /*onResize={this.onResize.bind(this)} 
                    onResizeStart={this.onResizeStart.bind(this)}
                    onResizeStop={this.onResizeStop.bind(this)}
                    onDrag={this.onDrag.bind(this)} 
                    onDragStart={this.onDragStart.bind(this)}
                    onDragStop={this.onDragStop.bind(this)}
                    onPinLayout={this.onPinLayout.bind(this)}
                    onCloseLayout={this.onCloseLayout.bind(this)}*/
                    >
                </BaseLayout>
            </div>
        );
    }

    
}

const mapStateToProps = (state, props) => ({
  mvLayout: state.menuSelected.tabList,
  mvPage: state.menuSelected.page,
  mvReload: state.menuSelected.reload
  
})

const mapDispatchToProps = (dispatch, props) => ({
    onChangeLayout: (menuid,pageid, tabList, reload) => {
        dispatch(actions.menuRemoved(menuid, pageid, tabList, reload))
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
