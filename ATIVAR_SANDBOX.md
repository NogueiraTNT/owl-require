# 🚀 Ativar WhatsApp Sandbox - Passo a Passo

## ✅ Status Atual

- ✅ Twilio configurado corretamente
- ✅ Mensagem enviada com sucesso
- ❌ **Sandbox não ativado** (por isso não chega no WhatsApp)

## 📱 Como Ativar o Sandbox

### Passo 1: Acesse o Console do Twilio

1. Vá para [console.twilio.com](https://console.twilio.com)
2. Faça login com suas credenciais

### Passo 2: Configure o WhatsApp Sandbox

1. No menu lateral, clique em **Messaging**
2. Clique em **Try it out**
3. Selecione **Send a WhatsApp message**
4. Você verá uma tela com instruções do sandbox

### Passo 3: Ative o Sandbox (IMPORTANTE!)

1. **Abra o WhatsApp no seu celular**
2. **Envie uma mensagem para:** `+1 415 523 8886`
3. **Digite exatamente:** `join <código-do-sandbox>`
   - O código será mostrado na tela (ex: `join sandbox-abc123`)
4. **Envie a mensagem**
5. **Aguarde a confirmação** no console do Twilio

### Passo 4: Verifique a Ativação

Após enviar a mensagem, você deve ver:

- ✅ Status "Connected" no console
- ✅ Mensagem de confirmação
- ✅ Possibilidade de enviar mensagens

## 🔄 Teste Após Ativação

### 1. Teste no Console do Twilio

1. No console, vá para **Messaging > Try it out > Send a WhatsApp message**
2. Envie uma mensagem de teste para seu número: `+558596844565`
3. Verifique se recebe a mensagem

### 2. Teste na Aplicação

1. Acesse `/admin/notificacoes`
2. Use o painel de teste
3. Envie uma mensagem para seu número

## ⚠️ Importante

### Limitações do Sandbox:

- **Apenas números que enviaram mensagem para o sandbox** podem receber mensagens
- **Limite de 1000 mensagens por mês** na conta gratuita
- **Apenas mensagens de texto** são suportadas no sandbox

### Para Testar:

1. **Primeiro:** Envie uma mensagem para o sandbox (`+1 415 523 8886`)
2. **Depois:** Use esse número para receber mensagens de teste

## 🆘 Se Ainda Não Funcionar

### Verifique:

1. **Código do sandbox correto** - deve ser exatamente como mostrado no console
2. **Número correto** - deve ser `+1 415 523 8886`
3. **Formato da mensagem** - deve ser `join <código>`
4. **Status no console** - deve mostrar "Connected"

### Alternativa:

Se o número `+14155238886` não funcionar, tente:

```env
TWILIO_WHATSAPP_NUMBER="whatsapp:+12243780906"
```

## 📞 Links Úteis

- **Console Twilio:** https://console.twilio.com
- **WhatsApp Sandbox:** https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
- **Documentação:** https://www.twilio.com/docs/whatsapp/sandbox

## 🚨 Erro 63005: "Channel did not accept given content"

Este erro ocorre quando o conteúdo da mensagem não é aceito pelo WhatsApp. **Solução implementada:**

1. **Mensagens simplificadas** - Removidos emojis e formatação especial
2. **Sanitização automática** - Sistema remove caracteres problemáticos
3. **Conteúdo limpo** - Apenas texto simples é enviado

### O que foi corrigido:

- ✅ Removidos emojis problemáticos
- ✅ Removida formatação markdown (_texto_)
- ✅ Removidos caracteres especiais
- ✅ Mensagens em texto simples

---

**🎯 Após ativar o sandbox, as mensagens devem chegar no seu WhatsApp!**
