export type TYPE_ROLE = "empleado" | "admin"

export interface UserInterface {
  email: string;
  user: string;
  role: TYPE_ROLE;
  password?: string;
}
