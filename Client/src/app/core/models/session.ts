import { Permissions } from "../enums/permissions";

export interface Session {
  userName: string;
  permissions: Permissions[];
  token: string;
  expiresAt: string; // ISO string from backend (DateTime)
}