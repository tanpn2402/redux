import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import TrackList from '../containers/TrackList'

class App extends Component {

 /* constructor(){
    super()
  }
*/
  render() {
    console.log('render in App')
    return (
      <div>
        <input ref={node => {
          this.input = node
        }} />
        <a href=""
          onClick={(e) => {
            e.preventDefault()
            if (!this.input.value.trim()) {
              return
            }
            this.props.onClick(this.input.value)
          }}
        >
          click me!
        </a>

        <TrackList />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = (dispatch, props) => ({
  onClick: (temp) => {
    dispatch(actions.addTrack(temp))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
