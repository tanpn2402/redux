import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import config from '../../core/config'


class FunctionChooser extends React.Component {
    constructor(props) {
        super(props)

        this.mobileLayout = config.mobileTab
    }
    render() {
        let language = this.props.language
        return (
            <div className="function-choose">
                <select value={this.props.tabID} onChange={this.onChange.bind(this)} >
                    {
                        this.mobileLayout.map(e => {
                            return <option key={e.id} value={e.id}>{language.tab[e.title]}</option>
                        })
                    }
                </select>

            </div>
        )
    }

    onChange(e) {
        let functionId = e.target.value
        this.props.onMobileTabClick(functionId)
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