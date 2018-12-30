import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import UserList from '../../components/UserList';
import styles from './styles.less';

// Export this for unit testing more easily
export class Home extends PureComponent {
  componentDidMount() {
    const { fetchUsersIfNeeded } = this.props;

    fetchUsersIfNeeded();
  }

  renderUserList = () => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'USERS_INVALID' ||
      home.readyStatus === 'USERS_REQUESTING'
    )
      return <p>Loading...</p>;

    if (home.readyStatus === 'USERS_FAILURE')
      return <p>Oops, Failed to load list!</p>;

    return <UserList list={home.list} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => ({ home });

const mapDispatchToProps = dispatch => ({
  fetchUsersIfNeeded: () => {
    dispatch({
      type: 'USERS_SUCCESS',
      data: [
        { id: 1, name: 'wang' },
        { id: 2, name: 'zhao' },
        { id: 3, name: 'qian' }
      ]
    });
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
