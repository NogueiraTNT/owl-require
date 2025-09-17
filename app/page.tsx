import AdminLogin from "./_components/admin-login"

// Página inicial com login administrativo
const Home = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AdminLogin />
    </div>
  )
}

export default Home
