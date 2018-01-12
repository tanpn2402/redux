import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import GridLayout from './GridLayout.js'
import config from '../../core/config'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import $ from 'jquery'

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
        let language = this.props.language
        let activeTab = this.state.activeTab
        let layout = [this.tabbar.filter(e => e.i === activeTab)[0]]

        let background = this.props.theme.page.background
        let scrollBtnStyle = this.props.theme.scrolling.button
        return (
            <div style={{height: "100%"}}>
                <div className="scrolling-tabs-main tab-layout" style={background}>
                    {/* <div className="scrolling-tabs-left">
                        <button className="hks-btn btn-tab-prev" onClick={e => this.onTabSlideClick(1)} style={scrollBtnStyle}>
                            <span className="glyphicon glyphicon-menu-left"></span>
                        </button>
                    </div> */}
                    <div className="scroll">
                        <div className="scrolling-tabs" id="scrolling-tablayout">
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
                    {/* <div className="scrolling-tabs-right">
                        <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)} style={scrollBtnStyle}>
                            <span className="glyphicon glyphicon-menu-right"></span>
                        </button>
                    </div> */}
                </div>
                <div className="tab-content" id="management">
                    <GridLayout 
                        language={this.props.language}
                        layout={layout}
                        stockList={this.props.stockList} 
                        theme={this.props.theme}
                        margin={[4, 4]}
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

    onTabSlideClick(i){
        if(i === 1){
            $("#scrolling-tablayout").animate( { scrollLeft: '-=200' }, 500);
        }
        else{
            $("#scrolling-tablayout").animate( { scrollLeft: '+=200' }, 500);
        }
        
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
