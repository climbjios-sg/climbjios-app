export type User = {
  id: string;
  name: string;
  username: string;
  telegramHandle: string;
};

export type UserRequest = Partial<User>;
export type UserResponse = Partial<User>;

// TODO: move this to auth provider types
export type UserIdentity = UserResponse & {
  avatar?: string;
};
