export enum Permissions {
  None = 0,

  // user permissions
  UserCreate = 1,
  UserRead = 2,
  UserChangePermission = 3,
  UserDelete = 4,

  // task permissions
  TaskCreate = 10,
  TaskUpdate = 11,
  TaskDelete = 12,
  TaskRead = 13,
}