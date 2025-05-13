export interface User {
  id: number;
  name: string;
  email: string;
  isShipyardOwner: boolean;
}

export interface Ship {
  id: number;
  name: string;
  status: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues extends LoginValues {
  name: string;
  isShipyardOwner: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
