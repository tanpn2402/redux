import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import config from '../../core/config'
import $ from 'jquery'

const styles = {
    "light": {
        background: {
            backgroundColor: "#FFF",

        },
        selector: {
            background: "#FFF",
            color: "#000",
            border: "1px solid #eae8e8cc",
        }
    },
    "dark": {
        background: {
            backgroundColor: "#000",

        },
        selector: {
            background: "#000",
            color: "#FFF",
            border: "1px solid #555",
        }
    }
}

class FunctionChooser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            functionId: this.props.tabID
        }

        this.mobileLayout = config.mobileTab
        this.widget = []
    }
    render() {
        let language = this.props.language
        let tabID = this.props.tabID
        let tabs = config.mobileTab.filter(e => e.id == tabID)
        
        if(tabs.length > 0) {
            this.widget = tabs[0].widget
        } else {
            this.widget = config.mobileTab.filter(e => e.id == "trading")[0].widget
        }

        let theme = this.props.theme
        let style = styles[theme.title]
        if(style == undefined) {
            style = styles["light"]
        }

        return (
            <div className="function-choose" style={style.background}>
                <select value={this.state.functionId} onChange={this.onChange.bind(this)} style={style.selector} >
                    {
                        this.widget.map(e => {
                            return <option key={e.i} value={e.i} y={e.y}>{language.menu[e.i]}</option>
                        })
                    }
                </select>

            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.tabID != this.props.tabID) {
            let tabs = config.mobileTab.filter(e => e.id == nextProps.tabID)
            
            if(tabs.length > 0) {
                this.widget = tabs[0].widget
            } else {
                this.widget = config.mobileTab.filter(e => e.id == "trading")[0].widget
            }
            this.setState({
                functionId: this.widget[0].i
            })
            $("#page-wrapper").animate({scrollTop: 0})
        }
    }

    onChange(e) {
        
        let functionId = e.target.value
        let wid = this.widget.filter(e => e.i == functionId)

        if(wid.length > 0) {
            let tmp = wid[0].y
            $("#page-wrapper").animate({scrollTop: tmp * 30})
        }

        this.setState({
            functionId: functionId
        })
        
    }
}

const mapStateToProps = state => ({
    tabID: state.menuSelected.tabID,
});

const mapDispatchToProps = (dispatch, props) => ({
    onMobileTabClick: (id) => {
        dispatch(actions.onMobileTabClick(id));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FunctionChooser)