import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux'
import ReactTable from "react-table"
import VerticalTable from '../VerticalTable'
// import Porfolio2 from '../Porfolio2'
import * as actions from '../../actions'

class Portfolio extends Component {
  constructor(props) {
      super(props)

    this.state ={

      columns2 : [
        {
          Header: 'Tổng quan',
          headerClassName: 'General',
          columns: [{
            Header: 'Tổng tài sản',
            accessor: 'totalAsset',
          }, {
            Header: 'Tài sản thực có',
            accessor: 'equity'
          }, {
            Header: 'Tổng giá trị chứng khoán',
            accessor: 'stockValue'
          }, {
            Header: 'Lãi/Lỗ',
            accessor: 'profitLoss'
          }, {
            Header: '% Lãi/lỗ (trên tài sản thực có)',
            accessor: 'PLPercent'
          }]
        },
        {
          Header: 'Thông tin tài khoản tiền',
          headerClassName: 'AccountInfo',
          columns: [{
            Header: 'Số dư tiền mặt',
            accessor: 'cashBalance'
          }, {
            Header: 'Số dư ứng trước',
            accessor: 'mvAvailAdvanceMoney'
          }, {
            Header: 'Tiền mua CK đã khớp',
            accessor: 'Tiền mua' //not
          }, {
            Header: 'Tiền mua CK chờ khớp',
            accessor: 'tổng giá trị chứng khoán' // chưa tìm dc
          }, {
            Header: 'Tiền(rút, chuyển khoản) chờ duyệt',
            accessor: 'CPendingWithdrawal'
          }, {
            Header: 'Tiền bán T+0',
            accessor: '% lãi lỗ' //chưa dc
          }, {
            Header: 'Tiền bán T+1',
            accessor: 'CDueSell'
          }, {
            Header: 'Tiền bán T+2',
            accessor: '% lãi lỗ' //chưa dc
          }
        ]
        },
        {
          Header: 'Đánh giá tài sản',
          headerClassName: 'rate',
          columns: [{
            Header: 'Tổng tài sản đảm bảo',
            accessor: 'equityMar'
          }, {
            Header: 'Vốn thực có',
            accessor: 'totalAssetMaintenance'
          }, {
            Header: 'Giá trị chứng khoán đảm bảo',
            accessor: 'stockMaintenance'
          }, {
            Header: 'Giá trị tiền mặt đảm bảo',
            accessor: 'cashMaintenance'
          }, {
            Header: 'Dư nợ kí quỹ',
            accessor: 'Lãi/lỗ' //chưa dc
          }, {
            Header: 'Tăng nợ do lệnh mua',
            accessor: '% lãi lỗ' //chưa dc
          }, {
            Header: 'Lãi vay cộng dồn',
            accessor: 'Lãi/lỗ' //chưa dc
          }, {
            Header: 'Hạn mức tín dụng',
            accessor: '% lãi lỗ' //chưa dc
          }
        ]
        },
        {
          Header: 'Trạng thái kí quỹ',
          headerClassName: 'Trạng thái kí quỹ',
          columns: [{
            Header: 'Khả năng vay kí quỹ',
            accessor: 'số dư tiền mặt' //not
          }, {
            Header: 'Tỉ lệ kí quỹ tối thiểu bắt buộc',
            accessor: 'số du ứng trước' //not
          }, {
            Header: 'Tỉ lệ kí quỹ hiện tại',
            accessor: 'curLiqMargin'
          }, {
            Header: 'Gọi bổ sung ký quỹ (tùy chọn)',
            accessor: 'tổng giá trị chứng khoán' // chưa tìm dc
          }, {
            Header: 'Nộp tiền mặt',
            accessor: 'Lãi/lỗ' //chưa dc
          }, {
            Header: 'Bán CK trong danh mục ký quỹ',
            accessor: '% lãi lỗ' //chưa dc
          }, {
            Header: 'Bán CK ngoài danh mục ký quỹ',
            accessor: 'Lãi/lỗ' //chưa dc
          }]
        }
      ],

      columns : [
      {
        Header: 'STT',
        accessor: 'STT',
        maxWidth: 50
      },
      {
        Header: 'Mã CK',
        accessor: 'mvStockID',
        maxWidth: 60
      },
      {
        Header: 'Khối lượng',
        headerClassName: 'volume',
        columns: [{
          Header: 'Tổng khối lượng',
          accessor: 'mvTradableQty',
        }, {
          Header: 'Số dư GD',
          accessor: 'mvTSettled'
        }, {
          Header: 'Số dư khoanh giữ',
          accessor: 'mvHoldingAmt' // not sure
        }, {
          Header: 'Mua T0',
          accessor: 'mvQueuingBuy' //not sure
        }, {
          Header: 'Mua T1',
          accessor: 'mvTT1UnsettleBuy' // not sure
        }, {
          Header: 'Mua T2',
          accessor: 'mvTDueBuy'
        }, {
          Header: 'Cầm cố',
          accessor: 'mvTMortgageQty'
        }, {
          Header: 'Phong tỏa (BT+DK)',
          accessor: 'conditionalHold' //not sure
        }, {
          Header: 'Chờ THQ',
          accessor: 'mvTEntitlementQty'
        }, {
          Header: 'Chờ giao dịch',
          accessor: 'mvTAwaitingTraceCert'
        }, {
          Header: 'Chờ lưu kí',
          accessor: 'mvTAwaitingDepositCert'
        }, {
          Header: 'Chờ rút',
          accessor: 'mvTAwaitingWithdrawalCert'
        }]
      },
      {
        Header: 'Giá',
        headerClassName: 'price',
        columns: [{
          Header: 'Giá TB',
          accessor: 'mvAvgPrice'
        }, {
          Header: 'Giá hiện tại',
          accessor: 'mvMarketPrice'
        }]
      },
      {
        Header: 'Đánh giá danh mục',
        headerClassName: 'rate',
        columns: [{
          Header: 'Giá trị mua',
          accessor: 'mvWAC'
        }, {
          Header: 'Giá trị thị trường',
          accessor: 'mvMarketValue'
        }, {
          Header: 'Lãi/Lỗ',
          accessor: 'mvPL'
        }, {
          Header: '% Lãi/Lỗ',
          accessor: 'mvPLPercent'
        }]
      },
      {
        Header: '(%) Ký quỹ',
        headerClassName: 'deposit',
        columns: [{
          Header: '% Cho vay',
          accessor: 'mvMarginPercentage'
        }, {
          Header: 'Giá trị vay',
          accessor: 'mvMartginValue'
        }, {
          Header: '% Đảm báo',
          accessor: 'maintenancePercentage'
        }, {
          Header: 'Giá trị đảm bảo',
          accessor: 'maintenanceValue'
        }]
      }]
    }

    this.header= ['First', 'Second',]
    this.title = [{
        title: 'One',
        accessor: 'one'
      },
      {
        title: 'Two',
        accessor: 'two'
      }
    ]

    this.da = {
      'one': ['1'],
      'two': ['2']
    }

    this.id = 'porfolio'
  }

  render() {
    /*var data = this.props.data.mvPortfolioBeanList === undefined ? [] : this.props.data.mvPortfolioBeanList
    var data2 = this.props.data.mvPortfolioAccSummaryBean === undefined ? [] : this.props.data.mvPortfolioAccSummaryBean
    return (
      <div>
        <Porfolio
          data2 = {data2}
          columns2 = {this.state.columns2}
          data={data}
          columns={this.state.columns}/>
      </div>
    );*/
    return(
      <div id={this.id + '-body'} className="layout-body">
        <div>
          <span>TIỀN</span>
        </div>

        <div>
          <div className="col-md-3">
            <VerticalTable header={this.header} title={this.title} data={this.da}/>
          </div>
          <div className="col-md-3">
            <VerticalTable header={this.header} title={this.title} data={this.da}/>
          </div>
          <div className="col-md-3">
            <VerticalTable header={this.header} title={this.title} data={this.da}/>
          </div>
          <div className="col-md-3">
            <VerticalTable header={this.header} title={this.title} data={this.da}/>
          </div>
        </div>
        <div className="clear-fix" ></div>
        <div>
          <VerticalTable header={this.header} title={this.title} data={this.da}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
      //this.props.getData()
  }
}

const mapStateToProps = (state) => {
  return {
    //data: state.porfolio.data,
    //data2: state.porfolio.data2,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getData: () => {
    //dispatch(actions.getPorfolio())
    //dispatch(actions.getPorfolio2())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
