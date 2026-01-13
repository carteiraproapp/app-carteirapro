import { Suspense } from "react"
import RegisterClient from "./RegisterClient"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    }>
      <RegisterClient />
    </Suspense>
  )
}
