import { Avatar, Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase/config';
import './userInfo.style.scss';
import { AuthContext } from '../../Context/AuthProvider';
function UserInfo(props) {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  return (
    <div className="userInfor">
      <div className="userInfor_container">
        <div>
          <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        </div>
        <div>
          <Typography.Text className="userInfor_container_name">{displayName}</Typography.Text>
        </div>
      </div>
      <div>
        <Button ghost onClick={() => auth.signOut()}>
          Log out
        </Button>
      </div>
    </div>
  );
}

export default UserInfo;
