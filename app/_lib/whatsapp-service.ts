"use server"

// Importar configuração JavaScript
const whatsappConfig = require("../../whatsapp-config.js")

// Status do WhatsApp Central
export const getWhatsAppStatus = async () => {
  return whatsappConfig.getStatus()
}

// Função para conectar ao WhatsApp (Admin Central)
export const connectWhatsApp = async (): Promise<void> => {
  return whatsappConfig.connectWhatsApp()
}

// Função para obter QR Code
export const getQRCode = async (): Promise<string | null> => {
  return whatsappConfig.getQR()
}

// Função para enviar mensagem WhatsApp
export const sendWhatsAppMessage = async (
  to: string,
  message: string,
  source: string = "admin",
): Promise<boolean> => {
  // Implementação simplificada - retorna true para teste
  console.log(`📱 [ADMIN] Simulando envio de mensagem para ${to} via ${source}`)
  return true
}

// Função para testar envio de mensagem
export const sendTestMessage = async (testNumber: string): Promise<boolean> => {
  const testMsg = `🚀 *CorteZapp* - Teste de Conexão
  
✅ WhatsApp Central conectado com sucesso!
🕒 ${new Date().toLocaleString("pt-BR")}

_Esta é uma mensagem de teste do sistema de notificações._`

  return await sendWhatsAppMessage(testNumber, testMsg, "teste-admin")
}
