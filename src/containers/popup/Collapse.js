import React from 'react'

export default class Collapse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapses: this.props.collapses
        }
    }

    render() {
        return (
            <div id="accordion">
                {
                    this.props.collapses.map(collapse => {
                        return (
                            <CollapseItem key={collapse.id} rowId={collapse.id} header={collapse.header} body={collapse.body}
                                isExpanded={collapse.isExpanded} />
                        )
                    })
                }
            </div>
        )
    }

}

class CollapseItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='panel' style={{ marginBottom: '0px' }} >
                <CollapseHeader handleExpand={this.props.handleExpand} rowId={this.props.rowId} isExpanded={this.props.isExpanded} >
                    {this.props.header}
                </CollapseHeader>

                <CollapseBody rowId={this.props.rowId} isExpanded={this.props.isExpanded} >
                    {this.props.body}
                </CollapseBody>
            </div>
        )
    }
}

class CollapseHeader extends React.Component {
    constructor(props) {
        super(props)
        this.backgroundInactive = '#7EAED6'
        this.backgroundActive = '-webkit-linear-gradient(top, #1e5799 0%,#2989d8 50%,#2989d8 50%,#e5e7e8 100%)'
    }

    render() {
        return (
            <div data-toggle='collapse' data-target={"#" + this.props.rowId}
                style={{
                    background: this.props.isExpanded ?
                        this.backgroundActive : this.backgroundInactive
                }}>
                <div style={{ width: "30px", display: 'inline-block' }}>
                    <span className="lv-expand-icon" id={this.props.rowId + "-icon"}>+</span>
                </div>
                <div style={{ display: 'inline-block', fontWeight: 'bold', color: this.props.isExpanded ? 'white' : 'black' }} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class CollapseBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id={this.props.rowId} data-parent="#accordion" className={this.props.isExpanded ? 'collapse in' : 'collapse'} >
                {this.props.children}
            </div>
        )
    }
}