import React from 'react'
import OrderJournal from "../../widget/OrderJournal"


export default class OrderJournalPage extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            defaultPageSize: 0
        }
    }

    render(){
        let background = this.props.theme.page.background

        return(
            <div ref={r => this.main = r} className="orderjournal-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row orderjournal-container">
                    {
                        this.state.defaultPageSize != 0 ? (
                            <OrderJournal {...this.props} defaultPageSize={this.state.defaultPageSize}/>
                        ) : null
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.main) {
            console.log(Math.floor((this.main.offsetHeight - 76) / 26))
            this.setState({
                defaultPageSize: Math.floor((this.main.offsetHeight - 76) / 26)
            })
        }
    }
}
