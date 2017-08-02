const React = require('react') 
const { connect } = require('react-redux') 
const { withTranslate, IntlActions } = require('react-redux-multilingual')

const App = ({ translate, dispatch }) => {
  return (
    <div>
      <p>{translate('hey')}</p>
      {translate('hello')}

      <p>
        <button
          onClick={() => {
            dispatch(IntlActions.setLocale('en'))
          }}>Switch to English</button>
        <button
          onClick={() => {
            dispatch(IntlActions.setLocale('vi'))
          }}>Switch to Vietnamese</button>
      </p>
    </div>
  )
}

module.exports = connect()(withTranslate(App))