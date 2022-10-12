import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFireStore from '../../hook/useFireStore';
import Message from '../Message/message';
import './chatWindow.style.scss';

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid #a7a7a7;
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
function ChatWindow(props) {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['message']);

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };
  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFireStore('messages', condition);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);
  return (
    <div className="chatWindow">
      {selectedRoom.id ? (
        <>
          <div className="chatWindow_header">
            <div className="chatWindow_header_infor">
              <p>{selectedRoom.name}</p>
              <span>{selectedRoom.description}</span>
            </div>
            <div className="chatWindow_header_btnGroup">
              <Button
                onClick={() => setIsInviteMemberVisible(true)}
                icon={<UserAddOutlined />}
                type="text"
              >
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
          <div className="chatWindow_content">
            <div className="chatWindow_content_messagelist" ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </div>
            <div className="chatWindow_content_form">
              <FormStyled form={form}>
                <Form.Item name="message">
                  <Input
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                    placeholder="Enter text"
                    bordered={false}
                    autoComplete="off"
                  />
                </Form.Item>
                <Button type="primary" onClick={handleOnSubmit}>
                  Send
                </Button>
              </FormStyled>
            </div>
          </div>
        </>
      ) : (
        <Alert message="Hay chon phong" type="info" showIcon style={{ margin: 5 }} closable />
      )}
    </div>
  );
}

export default ChatWindow;
