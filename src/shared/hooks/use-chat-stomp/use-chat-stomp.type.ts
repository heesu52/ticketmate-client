export interface UnreadMessage {
  chatRoomId: string;
  lastMessage: string;
  sendDate: number[];
  unReadMessageCount: number;
}

export interface ReadAckMessage {
  chatRoomId: string;
  lastReadMessageId: string;
  readDate: string;
  readerId: string;
  senderId: string;
  type: 'READ_ACK';
}
