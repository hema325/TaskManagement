import { Permissions } from "../enums/permissions";

export interface User {
  id: number;
  userName: string;
  permissions: Permissions[];
}