import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import GridLayout from './GridLayout.js'
import config from '../../core/config'

class TabLayout extends Component {
    constructor(props){
        super(props)
        
        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        if(tabs.length > 0){
            this.tabbar = tabs[0].widget
    
            this.state = {
                activeTab: this.tabbar[0]
            }
        }
        else{
            this.tabbar = []
    
            this.state = {
                activeTab: ''
            }
        }
        
        console.log(this.tabbar)
        

    }



    render() {
        var language = this.props.language
        var activeTab = this.state.activeTab
        var layout = [config.default_layout[activeTab]]
        console.log(this.props)
        return (
            <div>
                <div className="scrolling-tabs-main tab-layout">
                    <div className="scroll">
                        <div className="scrolling-tabs" id="scrolling-tabs">
                            <nav className='vertical-align-middle'>
                                {
                                    this.tabbar.map(tab => {
                                        return ( 
                                            <div key={tab.id} className={'tabs-item ' + (tab === activeTab ? 'actived' : 'normal')}
                                                onClick={e=> this.onTabClick(tab)}>
                                            
                                                    {language.menu[tab]}
                                                    
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

    onTabClick(tabID){
        this.setState({
            activeTab: tabID
        })
    }


}

export default TabLayout
