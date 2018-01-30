import React from "react"
import {Icon} from 'react-fa'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class NewsPost extends React.Component {
    constructor(props) {
        super(props)
    }

    showUserDetail() {
        this.props.showUserDetail(true)
    }

    render() {
        let {username, date, content, image} = this.props

        return (
            <div className="newspost">
                
                <div className="wrapper">
                    <div className="avt" onClick={e => this.showUserDetail()}>
                        <img src={require("../../assets/images/user.jpeg")} className="avt-img"/>
                    </div>
                    <div className="post">
                        <p className="usrname" onClick={e => this.showUserDetail()}>{username}</p>
                        <p className="date">{date}</p>
                        <p className="content">{content}</p>
                        {
                            image == undefined ? null :
                            <img src={require("../../assets/images/" + image)} />
                        }
                    </div>
                </div>

                
                <div className="post-control">
                    <div className="col-xs-6">
                        <div className="reaction">
                            <Icon size='1x' name="thumbs-o-up" />
                            <span className="like-counter">{100}</span>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="reaction">
                            <Icon size='1x' name="commenting" />
                            <span className="like-counter">{100}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NewsPost.defaultProps = {
    username: "UserName 123",
    date: "2018-01-01 10:10",
    content: "It will depend on the private school. At some of them, kids will get a very distorted notion of how the world works and who is in it.Of course, that can happen at some public schools, too, but it’s more likely in private schools."
}

const mapStateToProps = (state) => {
    return {
        data: state.stockstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    showUserDetail: (show) => {
        dispatch(actions.showUserDetail(show))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)
