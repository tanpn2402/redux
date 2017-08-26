import React, { Component } from 'react'
import $ from 'jquery'
export default class ScrollingTabs extends Component {

    render() {
        return (
            <div className="scrolling-tabs-main">
               <button className="hks-btn btn-tab-prev" onClick={e => this.onTabSlideClick(1)}>
                    <span className="glyphicon glyphicon-menu-left" style={{zIndex: '1'}}></span>
               </button>
               <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                this.props.tabList.map(tab => {
                                    console.log(tab)
                                    return ( 
                                        <span id={tab} key={tab}  className='tabs-item'>
                                            {this.props.language[tab]}
                                            <button
                                                id={tab}
                                                className="hks-btn btn-tab-close"
                                                type="button"
                                                title="Remove this page"
                                                onClick={this.props.onRemove.bind(this)}
                                                >
                                                ×
                                                </button>
                                        </span>
                                    )
                                })
                            }
                            
                        </nav>
                    </div>
                </div>
                <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)}>
                    <span className="glyphicon glyphicon-menu-right"></span>
                </button>
            </div>
        )
    }

    onTabSlideClick(i){
        console.log('sd')
        if(i === 1){
            $("#scrolling-tabs").animate( { scrollLeft: '-=200' }, 500);
        }
        else{
            $("#scrolling-tabs").animate( { scrollLeft: '+=200' }, 500);
        }
    }
    componentDidMount(){


    }

}
