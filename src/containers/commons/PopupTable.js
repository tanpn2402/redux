import React from 'react';

export default class PopupTable extends React.Component {
    render() {
        console.log(this.props)
        let language = this.props.language
        return (
            <div className="popup-table">
                {
                    this.props.data.map(d => {
                        console.log(d)
                        return (
                            <div className="--tr">
                                <div className="--th">
                                    {language[d.header]}
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


    renderTData(d) {
        if(d.value === undefined) {
            if(d.cell === undefined) {
                return null
            }
            else {
                return d.cell(d)
            }
        }
        else {
            return d.value
        }
    }
}