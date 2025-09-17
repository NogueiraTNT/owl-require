const Loading = () => {
  return (
    <div className="grid h-dvh place-items-center from-zinc-100 to-zinc-200">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner estilizado */}
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-300 border-t-violet-600"></div>
          <div className="absolute h-8 w-8 animate-pulse rounded-full bg-violet-600"></div>
        </div>

        {/* Texto */}
        <p className="text-xl font-semibold text-white/80">
          Aguarde, estamos carregando os seus dados...
        </p>

        {/* Barra de progresso fake opcional */}
        <div className="h-2 w-56 overflow-hidden rounded-full bg-zinc-300">
          <div className="h-full w-1/3 animate-[progress_1.5s_ease-in-out_infinite] bg-violet-600"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
