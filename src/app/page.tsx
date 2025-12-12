export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ✅ App Funcionando!
        </h1>
        <p className="text-gray-600 mb-6">
          Se você está vendo esta mensagem, o aplicativo está carregando corretamente.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            🎉 Servidor rodando na porta 3001
          </p>
        </div>
      </div>
    </div>
  );
}
