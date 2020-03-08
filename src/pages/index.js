import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableAction from '../lib/Table_Action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [
  {
    headerName: 'Name',
    field: 'name',
  },
  {
    headerName: 'Favorite',
    field: 'favorite',
  },
  {
    headerName: 'PlayPerDay',
    field: 'playperday',
  },
];

class TablePage extends Component {
  createRowData() {
    const rowData = [];
    const {
      family: { allIds, byId },
      hobby: { hbyId },
    } = this.props;

    allIds.forEach(e => {
      const c = {};
      c.name = byId[e].name;
      c.favorite = '';
      c.playperday = 0;
      byId[e].favorite.forEach(str => {
        c.favorite += str;
        c.playperday += hbyId[str].playperday;
      });
      rowData.push(c);
    });
    return rowData;
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: '200px', width: '600px' }}
      >
        <AgGridReact columnDefs={columnDefs} rowData={this.createRowData()} />
        <button
          onClick={() => {
            this.props.changeName({ id: 'junno', nextId: 'juno' });
          }}
        >
          Change Name as juno
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ TableAction }) => ({
  family: TableAction.family,
  hobby: TableAction.hobby,
});

const mapDispatchToProps = dispatch => ({
  changeName: bindActionCreators(tableAction.changeName, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
