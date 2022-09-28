// ----------------------------------------------------------------------

export type KanbanState = {
  isLoading: boolean;
  error: Error | string | null;
  board: {
    cards: Record<string, KanbanCard>;
    columns: Record<string, KanbanColumn>;
    columnOrder: string[];
  };
};

export type CardComment = {
  id: string;
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  messageType: 'image' | 'text';
  message: string;
};

export type Assignee = {
  id: string;
  avatar: string;
  name: string;
};

export type KanbanCard = {
  id: string;
  name: string;
  description?: string;
  assignee: Assignee[];
  due: [Date | null, Date | null];
  attachments: string[];
  comments: CardComment[];
  completed: boolean;
};

export type KanbanColumn = {
  id: string;
  name: string;
  cardIds: string[];
};

export type KanbanBoard = {
  cards: KanbanCard[];
  columns: KanbanColumn[];
  columnOrder: string[];
};
