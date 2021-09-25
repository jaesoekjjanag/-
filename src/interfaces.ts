export interface Address {
  city: string,
  dong: string,
}

export interface User {
  name: string,
  age: number,
  country: string,
  address: Address,
  admin: boolean,
}