export interface Auth0Profile {
  displayName: string;
  emails: { value: string }[];
  id: string;
  locale: string;
  nickname: string;
  name: {
    familyName: string;
    givenName: string;
  };
  picture: string;
  provider: string;
  user_id: string;
}
