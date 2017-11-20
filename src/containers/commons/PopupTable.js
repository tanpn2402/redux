import React from 'react';

export default class PopupTable extends React.Component {
    render() {
        //console.log(this.props)
        let language = this.props.language
        return (
            <div className={"popup-table " + this.props.className} ref={ref => this.Table = ref}>
                {
                    this.props.data.map((d, index) => {
                        return (
                            <div key={index} className="--tr" style={d.style}>
                                <div className="--th">
                                    {
                                        this.renderTHead(d, language)
                                    }
                                </div>
                                <div className="--td">
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