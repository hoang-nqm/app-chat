import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React from 'react';
import styled from 'styled-components';
import AppProvider, { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import useFireStore from '../../hook/useFireStore';
import './roomList.style.scss';
const PanelStyled = styled(CollapsePanel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
function RoomList(props) {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <PanelStyled header="List room" key="1">
        {rooms.map((room) => (
          <LinkStyled onClick={() => setSelectedRoomId(room.id)} key={room.id}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          onClick={handleAddRoom}
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
        >
          Join Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}

export default RoomList;
