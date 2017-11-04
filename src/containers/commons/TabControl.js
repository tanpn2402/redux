import React from 'react'

class TabControl extends React.Component {
    constructor(props) {
        super(props)
    }
    
    onTabChange(key) {
        this.props.onTabChange(key)
    }

    render() {
        let activeKey = this.props.activeKey
        let itemWidth =(1 / this.props.children.length) * 100
        let children = this.props.children.map(function(item, i) {
            var isActived = item.props.eventKey === activeKey
            return React.cloneElement(item, {
                actived: isActived,
                key: item.props.eventKey,
                width: itemWidth,
                onTabChange: this.onTabChange.bind(this)
            });
        }, this);

        let activedTab = this.props.children.filter(e => e.props.eventKey === activeKey)
    
        return (

            <div className="tab-component">
                <div className="tab-chooser">
                    <ul className="tab-control">
                        {children}
                    </ul>
                </div>

                <div className="tab-wrapper">
                    <div className="tab-inner">
                        {activedTab.length > 0 ? activedTab[0].props.children : null}
                    </div>
                </div>


            </div>
        )
        

    }
}

class TabItem extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick(key) {
        this.props.onTabChange(key)
    }

    render() {
        return (

            <li className={"tab-item " + (this.props.actived ? "actived" : "") } style={{width: (this.props.width + "%")}}
                onClick={e => this.onClick(this.props.eventKey)}> 
                <div>{this.props.title}</div> 
            </li>
        )
        

    }
}

export {TabControl, TabItem}