import React, {Component} from 'react';
import {connect} from 'react-redux';


class Header extends Component {

  constructor(){
    super()

    this.styles = {
      height: 150,
    }
  }

  render() {
    console.log('render in Header')
    return (
      <div styles={this.styles}>
        <div className="col-md-4">
          this is demo
        </div>
        <div className="col-md-4">
          this is demo
        </div>
        <div className="col-md-4">
          this is demo
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({

})



const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

