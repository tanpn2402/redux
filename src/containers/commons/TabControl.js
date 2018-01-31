import React from 'react'


const style = {
    "light": {
        backgroundColor: "#2158a0"
    },
    "dark": {
        backgroundColor: "rgb(255, 128, 0)"
    }
}

class TabControl extends React.Component {
    constructor(props) {
        super(props)
    }

    onTabChange(key) {
        this.props.onTabChange(key)
    }

    render() {
        let tabStyle = this.props.theme.tabcontrol
        let itemStyle = tabStyle.normal



        let activeKey = this.props.activeKey
        // let itemWidth = (1 / this.props.children.length) * 100
        let children = this.props.children.map(function (item, i) {
            var isActived = item.props.eventKey === activeKey
            return React.cloneElement(item, {
                actived: isActived,
                style: isActived ? tabStyle.active : tabStyle.normal,
                key: item.props.eventKey,
                width: "auto",
                onTabChange: this.onTabChange.bind(this)
            });
        }, this);

        let activedTab = this.props.children.filter(e => e.props.eventKey === activeKey)
        let theme = this.props.theme
        return (

            <div className="tab-component">
                <div className="tab-chooser" ref={ref => this.refChooser = ref}>
                    <ul className="tab-control">
                        {children}
                    </ul>
                    <div className="seperate"></div>
                </div>

                <div className="tab-wrapper" ref={ref => this.refWrapper = ref}>
                    <div className="tab-inner">
                        {activedTab.length > 0 ? activedTab[0].props.children : null}
                    </div>
                </div>


            </div>
        )


    }

    componentDidMount() {
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        if (this.refChooser && this.refWrapper) {
            this.refWrapper.style.paddingTop = this.refChooser.offsetHeight + "px"
        }
    }
}

class TabItem extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick(key) {
        this.props.onTabChange(key)
    }

    _renderTitle(props) {
        if(typeof props === "function") {
            return props()
        } else {
            return <div>{props}</div>
        }
    }

    render() {
        return (

            <li className={"tab-item " + (this.props.actived ? "actived" : "")} style={this.props.style}
                onClick={e => this.onClick(this.props.eventKey)}>
                {this._renderTitle(this.props.title)}
            </li>
        )


    }
}

export { TabControl, TabItem }