import { Suspense } from "react"
import CallbackClient from "./CallbackClient"
import { Loader2 } from "lucide-react"

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto" />
          <p className="text-gray-300">Carregando...</p>
        </div>
      </div>
    }>
      <CallbackClient />
    </Suspense>
  )
}
