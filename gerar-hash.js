// gerar-hash.js
import bcrypt from "bcryptjs"

// --- COLOQUE A SENHA QUE VOCÊ QUER USAR AQUI ---
const senhaPura = "admin123"
// ------------------------------------------------

const saltRounds = 10 // Fator de custo. 10 é um bom padrão.

// Gera o hash da senha
const hash = bcrypt.hashSync(senhaPura, saltRounds)

console.log("Sua senha pura:", senhaPura)
console.log("--- COPIE O HASH GERADO ABAIXO ---")
console.log(hash)
