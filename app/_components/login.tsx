"use client"

import Image from "next/image"
import { signIn } from "@/app/_actions/signin"
import { Button } from "@/app/_components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"

export default function Login() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="mb-4 flex items-center justify-center">
          <Image src="/icone_png.png" alt="Logo" width={100} height={100} />
        </div>
        <CardTitle>Login Manager</CardTitle>
        <CardDescription>
          Entre na sua conta para gerenciar seu negócio.
        </CardDescription>
      </CardHeader>

      {/* AQUI é a mudança: a Server Action vai no action do form */}
      <form action={signIn}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
