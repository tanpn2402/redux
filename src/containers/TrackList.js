import React, {Component} from 'react';
import {connect} from 'react-redux';


class TrackList extends Component {

  /*constructor(){
    super()
  }*/

  render() {
    console.log('render in TrackList')
    return (
      <div>
      {
        this.props.tracks.map((track, key) => {
          return <div key={key}>Track: {track.title}</div>;
        })
      }
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  tracks: state.tracks,
})



const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackList);

