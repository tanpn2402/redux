import React from 'react';
import {getTheme} from "../../utils"

export default class PopupTable extends React.Component {
    render() {
        //console.log(this.props)
        let language = this.props.language
        let theme = this.props.theme
        if(theme == undefined) {
            theme = getTheme("light")
        }
        let popupTableStyle = theme.popup.table
        return (
            <div className={"popup-table " + this.props.className} ref={ref => this.Table = ref}>
                {
                    this.props.data.map((d, index) => {
                        let rowStyle = popupTableStyle.rowOdd
                        if(index % 2 != 0) rowStyle = popupTableStyle.rowEven
                        return (
                            <div key={index} className="--tr" style={Object.assign({}, rowStyle, d.style)}>
                                <div className="--th" style={theme.font.main}>
                                    {
                                        this.renderTHead(d, language)
                                    }
                                </div>
                                <div className="--td" style={theme.font.main}>
                                    {
                                        
                                        this.renderTData(d)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderTHead(d, language) {
        if(d.Header === undefined) {
            if(d.header === undefined) {
                return null
            }
            else {
                return language[d.header]
            }
        }
        else {
            return d.Header(d)
        }
    }

    renderTData(d) {
        console.log(d)
        if(d.value === undefined) {
            if(d.Cell === undefined) {
                return null
            }
            else {
                return d.Cell(d)
            }
        }
        else {
            return d.value
        }
    }
}
PopupTable.defaultProps = {
    className: ""
}