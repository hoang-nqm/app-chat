import { Col, Row } from 'antd';
import React from 'react';
import RoomList from '../RoomList/roomList';
import UserInfo from '../UserInfo/userInfo';
import './sideBar.style.scss';

function SideBar(props) {
  return (
    <div className="sideBar">
      <Row>
        <Col span={24}>
          <UserInfo></UserInfo>
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  );
}

export default SideBar;
