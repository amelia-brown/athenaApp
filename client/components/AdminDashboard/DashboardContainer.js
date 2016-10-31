import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import RouteHandler from '../RouteHandler';
import { AuthorizedComponent } from 'react-router-role-authorization';
import sessionUtils from '../../utils/sessionUtils';
import articleUtils from '../../utils/articleUtils';
import Bar from './Bar';
import Pie from './Pie';
import Area from './Area';

class DashboardContainer extends AuthorizedComponent {
  constructor (props) {
    super(props)

    this.userRoles = JSON.parse(Cookies.get('roles')); //deserialize json array
    this.notAuthorizedPath = '/not-found';
    this.state = {
      articles: [],
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
    if (!JSON.parse(Cookies.get('roles')).includes('admin')) {browserHistory.push('/not-found');}

    sessionUtils.checkSession().then(() => {
      articleUtils.getArticles()
      .then(articles => this.setState({articles}));
    });
  }

  render () {
    return (
      <div className='dashboard-container bg-warning'>
        <div className="textContainer">
        <h1 className='centerText title'>Admin Dashboard</h1>
        <h4 className='centerText content'>Your one-stop source for intelligent product analytics.</h4>
        </div>
        <div className='exportDiv'>
          <select id="tableSelect" onChange={this.handleTable} defaultValue="default">
            <option value="default" disabled>Select Table</option>
            {this.state.exportOptions.map((table, i) =>
              <option>{table.description}</option>)}
          </select>&nbsp;
          <a className="exportButton" href={this.state.exportTable ? `/api/${this.state.exportTable}` : '#'}>Export</a>
        </div>
        <div className='row'>
          <div className='graph'>
            <Bar articles={this.state.articles} />
          </div>
          <div className='graph'>
            <Pie articles={this.state.articles} />
          </div>
        </div>
        <div className='row'>
          <div className='graph horizontal'>
            <Area />
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardContainer;
