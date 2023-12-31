import { GiftedChat } from 'react-native-gifted-chat';
import { useState, useEffect, useCallback } from 'react';

const Chats = () =>{
    const [messages, setMessages] = useState([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]);
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, []);
      useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

    return (
        <GiftedChat style={{flex: 1}}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }} />
    )
}

export default Chats