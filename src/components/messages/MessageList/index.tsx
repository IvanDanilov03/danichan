import React from 'react';
import { Message } from '../../../../types';

export interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const isEmpty = messages.length === 0;

  return (
    <ul>
      {isEmpty && (
        <div className="bg-white mx-auto p-5 text-center">
          <h2>No messages yet :c</h2>
          <p>Be first)</p>
        </div>
      )}
      {messages.map(({ id, text, writtenAt, writtenBy }) => {
        const writtenAtFormatted = writtenAt.toDate().toLocaleString();
        const { uid, username } = writtenBy;

        return (
          <li key={id} className="flex flex-col bg-white mt-5 p-5">
            <div className="flex justify-between mb-2 text-blue-800">
              <div className="flex">
                <div className="whitespace-nowrap mr-5">
                  {username ?? 'Anon'}
                </div>
                <div className="whitespace-nowrap">UID: {uid}</div>
              </div>
              <div className="whitespace-nowrap ml-5">{writtenAtFormatted}</div>
            </div>
            <div>{text}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
