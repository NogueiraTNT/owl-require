import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * O objeto Session retornado por `useSession`, `getSession` e recebido como prop
   */
  interface Session {
    user: DefaultSession["user"] & {
      id: string
    }
  }
}
