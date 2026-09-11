import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    authRole?: "admin" | "patient" | "doctor";
  }
}