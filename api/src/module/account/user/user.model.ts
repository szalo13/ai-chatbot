export interface IUser {
  id: number;
  auth0Id: string;
  email: string;
  name: string;
  picture: string;
  locale: string;
  provider: 'local' | 'auth0';
  organization: {
    id: number;
    publicId: string;
    name: string;
  };
}

export interface INewUser {
  auth0Id: string;
  email: string;
  name: string;
  provider: 'local' | 'auth0';
  picture: string;
  locale: string;
  organization: {
    name: string;
  };
}

export interface IUserUpdate {
  email: string;
  name: string;
}
