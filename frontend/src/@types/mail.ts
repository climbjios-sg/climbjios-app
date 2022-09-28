// ----------------------------------------------------------------------

export type MailState = {
  isLoading: boolean;
  error: Error | string | null;
  mails: {
    byId: Record<string, Mail>;
    allIds: string[];
  };
  labels: MailLabel[];
};

export type MailLabelId =
  | 'all'
  | 'inbox'
  | 'sent'
  | 'drafts'
  | 'trash'
  | 'spam'
  | 'important'
  | 'starred'
  | 'id_social'
  | 'id_promotions'
  | 'id_forums';

export type MailLabel = {
  id: MailLabelId;
  type: string;
  name: string;
  unreadCount: number;
  color?: string;
};

export type Mail = {
  id: string;
  labelIds: string[];
  folder: string | undefined;
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  subject: string;
  message: string;
  createdAt: Date | string | number;
  files: string[];
  from: {
    name: string;
    email: string;
    avatar: null | string;
  };
  to: {
    name: string;
    email: string;
    avatar: null | string;
  }[];
};
