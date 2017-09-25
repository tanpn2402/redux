import React, { Component } from 'react'
import ConfigColumnTable from '../commons/ConfigColumnTable'
import { connect } from 'react-redux'

class WidgetTitle extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        console.log(this.props.children)
        return (
            <div className="widget-header" >
                <div className="widget-title">
                    <span>
                        {this.props.children}
                    </span>
                </div>
                <div className="widget-action">
                    <ul>
                        {
                            this.props.columns === undefined ? '' :
                            (
                                <li onMouseDown={ e => e.stopPropagation() }>
                                    <ConfigColumnTable 
                                        id={this.props.id}
                                        columns={this.props.columns} 
                                        onChangeStateColumn={this.props.onChangeStateColumn}/>
                                </li>
                            )
                        }
                        <li className="btn-close" onMouseDown={ e => e.stopPropagation() }>
                            <span className="glyphicon glyphicon-repeat"></span>
                        </li>

                        {
                            this.props.tabID !== 'customization' ? '' :
                            (
                                <li className="btn-close" onClick={e => this.removeWidget()} onMouseDown={ e => e.stopPropagation() }>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state, props) => ({
    tabID: state.menuSelected.tabID,
    load: state.menuSelected.load,
})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetTitle)