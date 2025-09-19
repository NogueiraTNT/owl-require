// Configuração específica para o WhatsApp
const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode")
const fs = require("fs")
const path = require("path")

console.log("🔍 [CONFIG] Iniciando configuração WhatsApp...")

// Estado global
let client = null
let isConnected = false
let isConnecting = false
let qrCode = null
let isReady = false

// Diretório para salvar dados de autenticação
const AUTH_DIR = path.join(__dirname, "whatsapp-auth")

// Criar diretório se não existir
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true })
}

// Função para conectar
async function connectWhatsApp() {
  if (isConnecting) {
    console.log("⚠️ [CONFIG] Conexão já em andamento")
    return
  }

  if (isConnected && client) {
    console.log("✅ [CONFIG] WhatsApp já está conectado")
    return
  }

  isConnecting = true
  isReady = false

  try {
    console.log("🔄 [CONFIG] Iniciando conexão WhatsApp...")

    client = new Client({
      authStrategy: new LocalAuth({
        clientId: "cortezapp-admin",
        dataPath: AUTH_DIR,
      }),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      },
      webVersionCache: {
        type: "remote",
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html`,
      },
    })

    // Event: QR Code gerado
    client.on("qr", (qr) => {
      console.log("📱 [CONFIG] QR Code gerado!")

      // Gerar QR Code em base64
      qrcode.toDataURL(qr, (err, url) => {
        if (err) {
          console.error("❌ [CONFIG] Erro ao gerar QR Code:", err)
        } else {
          qrCode = url
          console.log("✅ [CONFIG] QR Code em base64 gerado!")
        }
      })
    })

    // Event: Cliente autenticado
    client.on("authenticated", () => {
      console.log("🔐 [CONFIG] WhatsApp autenticado!")
    })

    // Event: Cliente pronto
    client.on("ready", () => {
      isConnected = true
      isConnecting = false
      isReady = true
      qrCode = null
      console.log("✅ [CONFIG] WhatsApp está pronto!")
      console.log("📱 [CONFIG] Número:", client.info?.wid?.user)
    })

    // Event: Falha na autenticação
    client.on("auth_failure", (msg) => {
      console.error("❌ [CONFIG] Falha na autenticação:", msg)
      isConnecting = false
    })

    // Event: Desconectado
    client.on("disconnected", (reason) => {
      console.log("🔌 [CONFIG] Desconectado:", reason)
      isConnected = false
      isReady = false
      isConnecting = false
    })

    // Inicializar cliente
    await client.initialize()
  } catch (error) {
    console.error("❌ [CONFIG] Erro na conexão:", error)
    isConnecting = false
  }
}

// Função para obter status
function getStatus() {
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
function getQR() {
  return qrCode
}

// Auto-conectar se configurado
if (process.env.WHATSAPP_AUTO_CONNECT === "true") {
  console.log("🔄 [CONFIG] Auto-conexão habilitada - aguardando 3s...")
  setTimeout(() => {
    connectWhatsApp().catch((error) => {
      console.error("❌ [CONFIG] Erro na conexão automática:", error)
    })
  }, 3000)
}

// Exportar funções
module.exports = {
  connectWhatsApp,
  getStatus,
  getQR,
}
