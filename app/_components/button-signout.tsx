"use client"
import { LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { signOut } from "../_actions/signout"
import { useRouter } from "next/navigation"

const ButtonSignout = () => {
  const router = useRouter()
  const handleLogoutClick = async () => {
    signOut()
    router.push("/")
  }
  return (
    <div className="flex flex-col gap-4 p-5">
      <Button className="justify-start gap-2" onClick={handleLogoutClick}>
        <LogOutIcon size={18} />
        Sair
      </Button>
    </div>
  )
}

export default ButtonSignout
