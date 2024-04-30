export enum UserType {
  ADMIN = 'admin'
}

export const UserTypeLabel = new Map<string, string>([['admin', 'Administrador']]);

export const UserTypeOptions = Array.from(UserTypeLabel).map(userType => ({
  id: userType[0],
  label: userType[1]
}));
