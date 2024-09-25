export class CreateAdminDto {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  authId: string;
}

export class AdminLoginDto {
  username: string;
  password: string;
}