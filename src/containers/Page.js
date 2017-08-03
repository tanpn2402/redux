let React = require ('react');
let ReactRedux = require('react-redux');
let MenuBar = require('./MenuBar').default;
let actions = require('../actions/lang_actions');

let Page = React.createClass ({

  render() {
    const content = this.props.content;
    const switchLanguage = this.props.switchLanguage;

    console.log(content.page.menu)
    if (content) {
      console.log(content.page.menu)
      return (
        <div>         
          <MenuBar data= {content.page.menu} />
          <ul>
           <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'en')}>EN</a></li>
              <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'vi')}>VI</a></li>
              </ul>

     
        </div>
      );
    } else {
      return;
    }
    
  }
});
 
module.exports = ReactRedux.connect(
  (state) => ({content: state.lang_reducers.content}),
  (dispatch) => ({switchLanguage: (lang) => dispatch(actions.switchLanguage(lang))})
)(Page);
