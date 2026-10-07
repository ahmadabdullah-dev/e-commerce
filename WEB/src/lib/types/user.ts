export type UserDto = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    isEmailConfirmed: boolean,
    role: string
}
export type RequestUpdateCurrentEmailDto = {
  email: string;
}

export type UpdateCurrentEmailDto = {
  code: string;
}