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
                activeTab: this.tabbar[0].i
            }
        }
        else{
            this.tabbar = []
    
            this.state = {
                activeTab: ''
            }
        }
        
    }



    render() {
        var language = this.props.language
        var activeTab = this.state.activeTab
        var layout = [this.tabbar.filter(e => e.i === activeTab)[0]]
        //console.log(this.tabbar, layout)
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

    onTabClick(tabID){
        this.setState({
            activeTab: tabID
        })
    }

    onTabSlideClick(e){
        
    }

}

export default TabLayout
