"use server"

// Versão simplificada do serviço WhatsApp para debug
console.log("🔍 [SIMPLE] Carregando serviço WhatsApp simplificado...")

// Estado global do cliente
let client: any = null
let isConnected = false
let isConnecting = false
let qrCode: string | null = null
let isReady = false

// Status do WhatsApp Central
export const getWhatsAppStatus = async () => {
  console.log("🔍 [SIMPLE] getWhatsAppStatus chamado")
  return {
    connected: isConnected,
    ready: isReady,
    connecting: isConnecting,
    available: true,
    phone: client?.info?.wid?.user || null,
    lastConnection: isConnected ? new Date() : undefined,
  }
}

// Função para obter QR Code
export const getQRCode = async (): Promise<string | null> => {
  console.log(
    "🔍 [SIMPLE] getQRCode chamado, qrCode:",
    qrCode ? "disponível" : "não disponível",
  )
  return qrCode
}

// Função para conectar ao WhatsApp (versão simplificada)
export const connectWhatsApp = async (): Promise<void> => {
  console.log("🔍 [SIMPLE] connectWhatsApp chamado")

  if (isConnecting) {
    console.log("⚠️ [SIMPLE] Conexão já em andamento")
    return
  }

  if (isConnected && client) {
    console.log("✅ [SIMPLE] WhatsApp já está conectado")
    return
  }

  isConnecting = true
  console.log("🔄 [SIMPLE] Iniciando conexão...")

  try {
    // Simular geração de QR Code
    console.log("📱 [SIMPLE] Simulando geração de QR Code...")
    qrCode =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

    // Simular conexão após 5 segundos
    setTimeout(() => {
      isConnected = true
      isConnecting = false
      isReady = true
      qrCode = null
      console.log("✅ [SIMPLE] Conexão simulada concluída!")
    }, 5000)
  } catch (error) {
    console.error("❌ [SIMPLE] Erro na conexão:", error)
    isConnecting = false
  }
}

// Auto-conectar se configurado
console.log("🔍 [SIMPLE] Verificando auto-conexão...")
console.log(
  "🔍 [SIMPLE] WHATSAPP_AUTO_CONNECT:",
  process.env.WHATSAPP_AUTO_CONNECT,
)

if (process.env.WHATSAPP_AUTO_CONNECT === "true") {
  console.log("🔄 [SIMPLE] Auto-conexão habilitada - aguardando 3s...")
  setTimeout(() => {
    console.log("🔄 [SIMPLE] Iniciando auto-conexão...")
    connectWhatsApp().catch((error) => {
      console.error("❌ [SIMPLE] Erro na conexão automática:", error)
    })
  }, 3000)
} else {
  console.log("❌ [SIMPLE] Auto-conexão NÃO habilitada")
}
