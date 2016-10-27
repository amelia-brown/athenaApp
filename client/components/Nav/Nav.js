import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import beefalo from '../../images/beefalo.png';
import DashboardButton from './DashboardButton';
import TicketsButton from './TicketsButton';
import ProfileButton from './ProfileButton';
import Cookies from 'js-cookie';
import SettingsButton from './SettingsButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { connect } from 'react-redux';
import { getAuthLevel } from '../../actions';
import { resetCurrentUser } from '../../actions';
import ram from '../../images/beefalo.png';

import sessionUtils from '../../utils/sessionUtils';



const NavContainer = ({dispatch, auth, location}) => {
  const goToHomePage = () => {
    // e.preventDefault();
    browserHistory.push('/');
  };

  const signout = () => {
    sessionUtils.signout();
    dispatch(resetCurrentUser());
    dispatch(getAuthLevel(['guest']));
    browserHistory.push('/login');
  }
  return (
    <div className="nav-container">
    {console.log(location)}
      { location.pathname !== '/' ?
      <nav className="side-nav" role="navigation">
        <ul className="nav-items">
          <li>
            <Link to='/articles'
              activeClassName="active">
              Articles
            </Link>
            {/*
//<<<<<<< HEAD
                //<a className="navbar-brand" onClick={goToHomePage}>
                  //<img id='beefaloLogo' src={beefalo} alt="" />
                //</a>
            //</div>

            //<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                //<ul className="nav navbar-nav">
                    //<li>
                      //<Link to='/articles'>Articles</Link>
                    //</li>
                    //<TicketsButton />
                    //<DashboardButton />
                    //<ProfileButton />
                    //<SettingsButton />
                    //<LogoutButton signout={signout.bind(this)} />
                    //<LoginButton />
                //</ul>
            //</div>
        //</div>
    //</nav>
//=======
//*/}
          </li>
          <TicketsButton />
          <DashboardButton />
          <ProfileButton />
          <SettingsButton />
        </ul>
      </nav>
      : null}
      <div className="top-nav">
        <Link to='/' className="logo">
          <img src={ ram } alt="logo"/>
        </Link>
        { Cookies.get('roles')
          && JSON.parse(Cookies.get('roles'))[0] === 'guest'
        ? <Link to='/login'
           className='logoutnav'>Login</Link>
        : <Link onClick={signout}
            className='logoutnav'>Logout</Link>
      }
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  auth: state.userReducer
})

const Nav = connect()(NavContainer);

export default Nav;

//                <a className="navbar-brand" onClick={goToHomePage}>
//                  <img id='beefaloLogo' src={beefalo} alt="" />
//                </a>
