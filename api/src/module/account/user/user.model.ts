export interface INewUser {
  auth0Id: string;
  email: string;
  name: string;
  provider: 'local' | 'auth0';
  picture: string;
  locale: string;
}

export interface IUserUpdate {
  email: string;
  name: string;
}
