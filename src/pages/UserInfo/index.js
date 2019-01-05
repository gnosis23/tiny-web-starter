import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import UserCard from '../../components/UserCard';
import styles from './styles.less';

// Export this for unit testing more easily
export class UserInfo extends PureComponent {
  componentDidMount() {
    const { fetchUserIfNeeded, match } = this.props;

    fetchUserIfNeeded(match.params.id);
  }

  renderUserCard = () => {
    const {
      userInfo,
      match: { params }
    } = this.props;
    const userInfoById = userInfo[params.id];

    if (!userInfoById || userInfoById.readyStatus === 'USER_REQUESTING')
      return <p>Loading2...</p>;

    if (userInfoById.readyStatus === 'USER_FAILURE')
      return <p>Oops, Failed to load info!</p>;

    return <UserCard info={userInfoById.info} />;
  };

  render() {
    return (
      <div className={styles.UserInfo}>
        <Helmet title="User Info" />
        {this.renderUserCard()}
      </div>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

const mapDispatchToProps = dispatch => ({
  fetchUserIfNeeded: id => {
    dispatch({
      type: 'userInfo/fetchUser',
      payload: { id }
    });
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserInfo);
