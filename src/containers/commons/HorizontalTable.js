import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
export default class HorizontalTable extends Component {

	constructor(props) {
    		super(props)
    	}

	render() {
		console.log('HorizontalTable', this.props)
		return(
			<div className="horizontal-table">

				{
					this.props.showHeader !== undefined ? '' : 
						this.props.showHeader === false ? '' :
							(
								<div className="ht-header">
									<div className="ht-tr">
										{
							      			this.props.header.map(e => {
							      				return ( 
							      					<div className="ht-th">
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