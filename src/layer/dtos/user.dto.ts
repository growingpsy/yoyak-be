// src/res/dtos/user/user.dto.ts
export class CreateUserDto {
    readonly user_name!: string;
    readonly user_nick!: string;
    readonly user_email!: string;
    readonly email_verified!: boolean;
    readonly user_pwd!: string;
  }

  export class UpdateUserDto {
    readonly user_name?: string;
    readonly user_nick?: string;
    readonly user_email?: string;
    readonly email_verified?: boolean;
    readonly user_pwd?: string;
  }
  
export class UserResponseDto {
    user_id!: number;
    user_name!: string;
    user_nick!: string;
    user_email!: string;
    email_verified!: boolean;
    user_pwd!: string;
    ban_count!: number;
    created_at!: Date;
    updated_at!: Date;
  }
  