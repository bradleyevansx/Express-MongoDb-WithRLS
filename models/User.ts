import { Entity } from "./contracts/Entity";
import { Role } from "./enums/Role";

export interface User extends Entity {
  username: string;
  password: string;
  role: Role;
}
