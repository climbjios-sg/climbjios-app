export type User = {
  id: string;
  name: string;
  username: string;
  telegramHandle: string;
};

export type RequestUser = Partial<User>;
export type ResponseUser = Partial<User>;

// TODO: move this to auth provider types
export type UserIdentity = ResponseUser & {
  avatar?: string;
};
