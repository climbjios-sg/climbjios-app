// ----------------------------------------------------------------------

export type ChatState = {
  isLoading: boolean;
  error: Error | string | null;
  contacts: {
    byId: Record<string, Participant>;
    allIds: string[];
  };
  conversations: {
    byId: Record<string, Conversation>;
    allIds: string[];
  };
  activeConversationId: null | string;
  participants: Participant[];
  recipients: Participant[];
};

export type Contact = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address: string;
  phone: string;
  email: string;
  lastActivity: Date | string | number;
  status: string;
  position: string;
};

export type Participant = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address?: string;
  phone?: string;
  email?: string;
  lastActivity?: Date | string | number;
  status?: 'online' | 'offline' | 'away' | 'busy';
  position?: string;
};

export type TextMessage = {
  id: string;
  body: string;
  contentType: 'text';
  attachments: string[];
  createdAt: Date;
  senderId: string;
};

export type ImageMessage = {
  id: string;
  body: string;
  contentType: 'image';
  attachments: string[];
  createdAt: Date;
  senderId: string;
};

export type Message = TextMessage | ImageMessage;

export type Conversation = {
  id: string;
  participants: Participant[];
  type: string;
  unreadCount: number;
  messages: Message[];
};

export type SendMessage = {
  conversationId: string;
  messageId: string;
  message: string;
  contentType: 'text';
  attachments: string[];
  createdAt: Date | string | number;
  senderId: string;
};
