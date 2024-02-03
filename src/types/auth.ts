export interface UserDetails {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  address: {
    city: string;
    number: string;
  };
}

export interface Login {
  username: string;
  password: string;
}
