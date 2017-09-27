import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
export default class HorizontalTable extends Component {

	constructor(props) {
    		super(props)
    	}

	render() {
		console.log('HorizontalTable', this.props)
		let headerValue = this.props.header.slice(1, this.props.header.length)
		return(
			<div className="horizontal-table" style={{height: this.props.height}}>

				{
					this.props.showHeader !== undefined ? '' : 
						this.props.showHeader === false ? '' :
							(
								<div className="ht-header">
									<div className="ht-tr">
										{
											<div className="ht-th ht-title">
					      						{this.props.header[0]} 
					      					</div>
										}
										{
							      			headerValue.map(e => {
							      				return ( 
							      					<div className="ht-th ht-value">
							      						{e} 
							      					</div>
							      				)
							      			})
							      		}
									</div>
								</div>
							)
				}
								
				<div className="ht-body">
					{this.props.title.map(e => {
						return (
							<div className="ht-tr">
								<div className="ht-td ht-title" key={e.accessor}> 
									{e.Header} 
								</div>
								{
									this.props.data[e.accessor] !== undefined ? 
			    							this.props.data[e.accessor].map(el => {
			    								return ( 
			    									<div className="ht-td ht-value"> 
			    										{el} 
		    										</div>)
			    							})
			    						: (<div className="ht-td ht-value"></div>)
								}
							</div>	
						)
					})}
				</div>


			</div>
		)
	}
}