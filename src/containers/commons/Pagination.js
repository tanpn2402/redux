import React from "react"
import { FormControl } from 'react-bootstrap'

export default class Pagination extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			page: 1,
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			page: nextProps.totalPage > 0 ? nextProps.pageIndex : 0,
		});
	}

	render() {
		let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
		let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader
		return (
			<div className="form-inline form-group pagination-top">
				{
					this.props.onFirstPage === undefined ? '' :
						(
							<button type="button" className="hks-btn btn-pagination-top"
								onClick={this.onFirstPage.bind(this)}>
								<span className="glyphicon glyphicon-step-backward" />
							</button>
						)
				}
				<button type="button" className="hks-btn btn-pagination-top" style={widgetheader}
					onClick={this.onPrevPage.bind(this)}>
					<span className="glyphicon glyphicon-triangle-left" />
				</button>

				<span style={{ color: font2 }} >Page</span>

				<input type="number" value={this.state.page} 
					id="pageinput" className="hks-input page-input"
					onKeyDown={e => this.onPageChange(e)}
					onChange={e => e.target.value > 0 ? this.setState({ page: e.target.value }) : 0}
					style={{ textAlign: "center" }} 
				/>

				<span style={{ color: font2 }}> of {this.props.totalPage}  </span>
				
				<button type="button" className="hks-btn btn-pagination-top" style={widgetheader}
					onClick={this.onNextPage.bind(this)}>
					<span className="glyphicon glyphicon-triangle-right" />
				</button>

				{
					this.props.onLastPage === undefined ? '' :
						(
							<button type="button" className="hks-btn btn-pagination-top" style={widgetheader}
								onClick={this.onFirstPage.bind(this)}>
								<span className="glyphicon glyphicon-step-forward" />
							</button>
						)
				}

				{
					this.props.onReloadPage === undefined ? '' :
						(
							<button type="button" className="hks-btn btn-pagination-top" style={widgetheader}
								onClick={this.onReloadPage.bind(this)}>
								<span className="glyphicon glyphicon-refresh"></span>
							</button>
						)
				}

				{
					this.props.onExportExcel === undefined ? '' :
						(
							<button type="button" className="hks-btn btn-pagination-top btn-export" style={widgetheader}
								onClick={this.props.onExportExcel.bind(this)}>
								Export Report
		        		</button>
						)
				}

			</div>
		)
	}

	onNextPage() {
		if (this.state.page < this.props.totalPage && this.props.onPageChange) {
			this.props.onPageChange(this.state.page + 1)
		}
	}

	onPrevPage() {
		if (this.state.page > 1 && this.props.onPageChange) {
			this.props.onPageChange(this.state.page - 1)
		}
	}

	onFirstPage() {
		if (this.state.page > 1 && this.props.totalPage > 1 && this.props.onPageChange) {
			this.props.onPageChange(1)
		}
	}

	onLastPage() {
		if (this.props.totalPage > 1 && this.state.page != this.props.totalPage && this.props.onPageChange) {
			this.props.onPageChange(this.props.totalPage)
		}
	}

	onReloadPage() {
		if (this.props.onPageChange) {
			this.props.onPageChange(this.state.page)
		}
	}

	onPageChange(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			let pageSelected = e.target.value
			if (pageSelected > 0 && pageSelected <= this.props.totalPage && this.props.onPageChange) {
				this.props.onPageChange(e.target.value)
			}
		}
	}

}