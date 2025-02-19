export class UpdateUserDto {
  readonly username?: string;
  // readonly email?: string;
  // Optionally include password if you want to allow password updates
  readonly password?: string;
}
