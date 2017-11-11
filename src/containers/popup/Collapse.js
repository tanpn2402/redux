import React from 'react'

export default class Collapse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapses: this.props.collapses
        }
        this.backgroundInactive = '#8ab4f7'
        this.backgroundActive = '#166ef9'
        this.activePanel = this.state.collapses[this.props.expandedIndex].id
    }

    handleExpand(id) {
        if (this.activePanel == id && this[id].className.includes('down')) {
            this[id].className = 'glyphicon glyphicon-chevron-right'
            document.getElementById('toggle-' + id).style.color = '#000'
            document.getElementById('header-' + id).style.color = '#000'
            document.getElementById('toggle-' + id).style.background = this.backgroundInactive
            return
        }
        this.state.collapses.forEach(collapse => {
            let idP = collapse.id
            this[idP].className = idP != id ? 'glyphicon glyphicon-chevron-right' : this[idP].className.includes('right') ? 'glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-right'
            document.getElementById('toggle-' + idP).style.color = idP != id ? '#000' : '#fff'
            document.getElementById('header-' + idP).style.color = idP != id ? '#000' : '#fff'
            document.getElementById('toggle-' + idP).style.background = idP != id ? this.backgroundInactive : this.backgroundActive
        })
        this.activePanel = id
    }

    componentDidMount() {
        this[this.activePanel].className = 'glyphicon glyphicon-chevron-down'
    }

    render() {
        let expandedIndex = this.props.expandedIndex >= this.state.collapses.length ? 0 : this.props.expandedIndex
        return (
            <div id="accordion">
                {
                    this.props.collapses.map((collapse, index) => {
                        return (
                            <CollapseItem key={collapse.id} rowId={collapse.id} header={collapse.header} body={collapse.body}
                                isExpanded={index == expandedIndex} data={this.props.data} handleExpand={this.handleExpand.bind(this)}
                                backgroundActive={this.backgroundActive} backgroundInactive={this.backgroundInactive}
                                setRef={(id, e) => this[id] = e} collapse={collapse} />
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
                <CollapseHeader rowId={this.props.rowId} isExpanded={this.props.isExpanded} handleExpand={this.props.handleExpand}
                    backgroundActive={this.props.backgroundActive} backgroundInactive={this.props.backgroundInactive}
                    setRef={this.props.setRef} >
                    {this.props.header}
                </CollapseHeader>

                <CollapseBody rowId={this.props.rowId} isExpanded={this.props.isExpanded} data={this.props.data}
                    collapse={this.props.collapse} >
                    {this.props.body}
                </CollapseBody>
            </div>
        )
    }
}

class CollapseHeader extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let id = this.props.rowId
        return (
            <div id={'toggle-' + this.props.rowId} onClick={() => this.props.handleExpand(this.props.rowId)} data-toggle='collapse' data-parent="#accordion" data-target={"#" + this.props.rowId}
                style={{
                    background: this.props.isExpanded ?
                        this.props.backgroundActive : this.props.backgroundInactive,
                }}>
                <div style={{ width: "30px", display: 'inline-block' }}>
                    <span ref={e => this.props.setRef(id, e)} className="glyphicon glyphicon-chevron-right" />
                </div>
                <div id={'header-' + this.props.rowId} style={{ display: 'inline-block', fontWeight: 'bold', color: this.props.isExpanded ? 'white' : 'black' }} >
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
            <div id={this.props.rowId} className={this.props.isExpanded ? 'collapse in' : 'collapse'} >
                {this.props.children(this.props.data, this.props.collapse)}
            </div>
        )
    }
}