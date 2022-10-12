import { Col, Row } from 'antd';
import React from 'react';
import ChatWindow from '../ChatWindow/chatWindow';
import SideBar from '../Sidebar/sideBar';

function ChatRoom(props) {
  return (
    <div>
      <Row>
        <Col span={8}>
          <SideBar />
        </Col>
        <Col span={16}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

export default ChatRoom;
