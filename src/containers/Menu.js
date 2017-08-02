let React = require('react');

let Menu = React.createClass ({

  render() {
    const data = this.props.data;
    let switchLanguage = this.props.switchLanguage;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">React Redux</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">{data.home} <span className="sr-only">(current)</span></a></li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Menu;
