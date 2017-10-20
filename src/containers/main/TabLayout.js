import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import GridLayout from './GridLayout.js'
import config from '../../core/config'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class TabLayout extends Component {
    constructor(props){
        super(props)
        
        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        if(tabs.length > 0){
            this.tabbar = tabs[0].widget
            
            if(this.props.subTab !== undefined){
                // change tab using search function
                this.state = {
                    activeTab: this.props.subTab
                }
            } else{
                // change tab manual
                this.state = {
                    activeTab: this.tabbar[0].i
                }
            }
                
        }
        else{
            this.tabbar = []
    
            this.state = {
                activeTab: ''
            }
        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.subTab !== undefined){
            this.setState({
                activeTab: nextProps.subTab
            });
        }
    }



    render() {
        var language = this.props.language
        var activeTab = this.state.activeTab
        var layout = [this.tabbar.filter(e => e.i === activeTab)[0]]
        return (
            <div>
                <div className="scrolling-tabs-main tab-layout">
                    <div className="scroll">
                        <div className="scrolling-tabs" id="scrolling-tabs">
                            <nav className='vertical-align-middle'>
                                {
                                    this.tabbar.map(tab => {
                                        
                                        return ( 
                                            <div key={tab.id} className={'tabs-item ' + (tab.i === activeTab ? 'actived' : 'normal')}
                                                onClick={e=> this.onTabClick(tab.i)}>
                                            
                                                    {language.menu[tab.i]}
                                                    
                                            </div>
                                        )
                                    })
                                }
                                
                            </nav>
                        </div>
                    </div>
                    <div className="scrolling-tabs-right">
                        <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)}>
                            <span className="glyphicon glyphicon-menu-right"></span>
                        </button>
                    </div>
                </div>
                <div className="tab-content" id="management">
                    <GridLayout 
                        language={this.props.language}
                        layout={layout}
                        stockList={this.props.stockList} 
                        theme={this.props.theme}
                        >
                    </GridLayout>

                </div>
            </div>   
        )
    }

    onTabClick(subTabID){
        this.props.onTabClick(this.props.tabID, subTabID)
        this.setState({
            activeTab: subTabID
        })
    }

    onTabSlideClick(e){
        
    }

}
const mapStateToProps = (state) => {
    return {
        subTabID: state.menuSelected.subTabID,
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    onTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(TabLayout)
