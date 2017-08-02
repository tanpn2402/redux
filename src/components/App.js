import React, { Component } from 'react';

class App extends Component{
  render()
  {
    let {children} = this.props;
    return(
      <div>
        {children}
      </div>
    )
  }
}

export default App;