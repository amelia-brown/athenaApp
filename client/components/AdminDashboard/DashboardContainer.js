import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import RouteHandler from '../RouteHandler';
import { AuthorizedComponent } from 'react-router-role-authorization';
import sessionUtils from '../../utils/sessionUtils';
import Bar from './Bar';
import Pie from './Pie';
import Area from './Area';

class DashboardContainer extends AuthorizedComponent {
  constructor (props) {
    super(props)

    this.userRoles = JSON.parse(Cookies.get('roles')); //deserialize json array
    this.notAuthorizedPath = '/not-found';
    this.state = {
      exportOptions: 
        [
          {
            description: 'Articles', 
            endpoint: 'kbExport'
          }, {
            description: 'Article-Ticket Relations', 
            endpoint: 'kbRelationsExport'
          }, {
            description: 'Tickets', 
            endpoint: 'ticketExport'
          }, {
            description: 'Ticket-Article Relations', 
            endpoint: 'ticketRelationsExport'
          }
        ] 
    }
    this.handleTable = this.handleTable.bind(this);
  }
  handleTable(e) {
    this.setState({
      exportTable: this.state.exportOptions
        .find(table => table.description === e.target.value).endpoint
    });
  }
  componentWillMount () {
    sessionUtils.checkSession();
  }

  render () {
    return (
      <div className='container bg-warning'>
        <h1 className='centerText'>Admin Dashboard</h1>
        <h4 className='centerText'>Your one-stop source for intelligent product analytics.</h4>
        <br />
        <div className='export'>
          <select id="tableSelect" onChange={this.handleTable} defaultValue="default">
            <option value="default" disabled>Select Table</option>
            {this.state.exportOptions.map((table, i) => 
              <option dataIndex={i}>{table.description}</option>)}
          </select>
          <a href={this.state.exportTable ? `/api/${this.state.exportTable}` : '#'}>Export</a>
        </div>
        <div className='row'>
          <div className='col-xs-6 col-xs-push-1'>
            <Bar />
          </div>
          <div className='col-xs-6'>
            <Pie />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-xs-push-1'>
            <Area />
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardContainer;
