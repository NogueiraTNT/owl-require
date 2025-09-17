const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function createFirstAdmin() {
  try {
    // Verificar se já existe algum admin
    const existingAdmin = await prisma.admin.findFirst()

    if (existingAdmin) {
      console.log("❌ Já existe um administrador no sistema")
      console.log(
        `Admin existente: ${existingAdmin.name} (${existingAdmin.email})`,
      )
      return
    }

    // Dados do primeiro admin
    const adminData = {
      name: "Super Administrador",
      email: "admin@cortezapp.com",
      password: "cortezapp2024!", // Senha padrão - DEVE SER ALTERADA
      type: "ADMIN",
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminData.password, 12)

    // Criar admin
    const admin = await prisma.admin.create({
      data: {
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        type: adminData.type,
      },
    })

    console.log("✅ Primeiro administrador criado com sucesso!")
    console.log("")
    console.log("📋 Dados de acesso:")
    console.log(`Email: ${admin.email}`)
    console.log(`Senha: ${adminData.password}`)
    console.log(`Tipo: ${admin.type}`)
    console.log("")
    console.log("⚠️  IMPORTANTE: Altere a senha após o primeiro login!")
    console.log("")
  } catch (error) {
    console.error("❌ Erro ao criar administrador:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createFirstAdmin()
