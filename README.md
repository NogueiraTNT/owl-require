# 🦉 CorteZapp Admin - Painel Administrativo

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Painel administrativo super-admin para controle total do sistema CorteZapp, permitindo gerenciamento completo de usuários, gestores, assinaturas e todas as operações do sistema.

## 📋 Características Principais

### 🔐 **Acesso Administrativo**

- **Super Admin**: Controle total do sistema
- **Suporte**: Acesso limitado para suporte técnico
- Autenticação segura com credenciais específicas
- Níveis de acesso diferenciados

### 👥 **Gestão de Usuários**

- **CRUD completo de Gestores**: Criar, visualizar, editar e excluir
- **Visualização de Clientes**: Listar todos os usuários do sistema
- **Gestão de Barbearias**: Controle total das barbearias cadastradas
- **Funcionários**: Gerenciar barbeiros e equipes

### 💳 **Controle de Assinaturas**

- **Planos ativos**: Visualizar planos de cada gestor
- **Datas de vencimento**: Acompanhar vencimentos
- **Status de pagamento**: Controlar situação financeira
- **Renovações**: Gerenciar renovações automáticas

### 📊 **Dashboard Completo**

- **Métricas globais**: Visão geral do sistema
- **Relatórios avançados**: Análises detalhadas
- **Monitoramento**: Acompanhamento em tempo real
- **Analytics**: Dados de uso e performance

### 🛠 **CRUD Completo**

- **Todas as tabelas**: Acesso a todos os dados
- **Operações seguras**: Create, Read, Update, Delete
- **Logs de auditoria**: Rastreamento de alterações
- **Backup de dados**: Proteção contra perda

## 🏗 Estrutura do Sistema

### **Modelos de Dados**

```typescript
// Admin - Nova tabela para administradores
model Admin {
  id        String    @id @default(uuid())
  name      String    // Nome do funcionário
  email     String    @unique // Email para acesso
  password  String    // Senha criptografada
  type      AdminType // SUPORTE ou ADMIN
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

enum AdminType {
  SUPORTE  // Acesso limitado
  ADMIN    // Acesso total
}

// User - Atualizado com telefone
model User {
  phone String? // Para notificações
  // ... outros campos
}

// Worker - Atualizado com contato
model Worker {
  email String? // Para notificações
  phone String? // Para notificações
  // ... outros campos
}
```

### **Funcionalidades Administrativas**

#### **🎛 Dashboard Principal**

- Métricas em tempo real
- Gráficos de crescimento
- Alertas importantes
- Resumo financeiro

#### **👨‍💼 Gestão de Gestores**

- Lista completa de gestores
- Detalhes de cada conta
- Histórico de transações
- Status de assinaturas

#### **🏪 Controle de Barbearias**

- Todas as barbearias cadastradas
- Dados completos e documentos
- Status de funcionamento
- Métricas de performance

#### **💰 Gestão Financeira**

- Receitas do sistema
- Controle de assinaturas
- Inadimplência
- Relatórios financeiros

#### **📱 Sistema de Notificações**

- Notificações para clientes
- Alertas para barbeiros
- Comunicação automática
- Templates personalizados

## 🚀 Instalação e Configuração

### **1. Configuração do Banco**

```bash
# O banco é compartilhado com os outros sistemas
# Usar a mesma DATABASE_URL

# Aplicar novas migrações
npx prisma migrate dev --name add_admin_and_contact_fields

# Gerar cliente
npx prisma generate
```

### **2. Variáveis de Ambiente**

```env
# Banco de Dados (compartilhado)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cortezapp"

# Segurança Admin
ADMIN_JWT_SECRET="chave-super-secreta-admin"

# Notificações (futuro)
TWILIO_ACCOUNT_SID="sua-conta-twilio"
TWILIO_AUTH_TOKEN="seu-token-twilio"
SENDGRID_API_KEY="sua-chave-sendgrid"
```

### **3. Primeiro Acesso**

```bash
# Criar primeiro admin (script)
npm run create-admin

# Ou inserir diretamente no banco
INSERT INTO "Admin" (id, name, email, password, type)
VALUES (uuid_generate_v4(), 'Super Admin', 'admin@cortezapp.com', '$hash', 'ADMIN');
```

## 🔧 Funcionalidades Técnicas

### **Segurança**

- Passwords com hash bcrypt
- Sessões seguras
- Rate limiting
- Logs de auditoria

### **Performance**

- Cache inteligente
- Queries otimizadas
- Paginação eficiente
- Índices de banco

### **Monitoramento**

- Health checks
- Error tracking
- Performance metrics
- Uptime monitoring

## 📊 Páginas Principais

### `/admin/dashboard`

- Visão geral do sistema
- Métricas principais
- Alertas importantes

### `/admin/gestores`

- Lista de todos os gestores
- CRUD completo
- Filtros e busca

### `/admin/barbearias`

- Todas as barbearias
- Status e métricas
- Documentos

### `/admin/usuarios`

- Base de clientes
- Dados de uso
- Suporte

### `/admin/financeiro`

- Receitas e custos
- Assinaturas
- Relatórios

### `/admin/sistema`

- Configurações globais
- Manutenção
- Backups

## 🔐 Níveis de Acesso

### **ADMIN (Super Administrador)**

- ✅ Todos os CRUDs
- ✅ Configurações do sistema
- ✅ Relatórios financeiros
- ✅ Criar outros admins
- ✅ Acesso total

### **SUPORTE (Técnico)**

- ✅ Visualizar dados
- ✅ Suporte a usuários
- ✅ Logs e debugging
- ❌ Alterações financeiras
- ❌ Configurações críticas

## 📞 Suporte e Manutenção

- **Issues**: Relatório de bugs
- **Updates**: Atualizações de segurança
- **Backup**: Rotinas automáticas
- **Monitoring**: Alertas 24/7

---

<div align="center">
  <strong>🔒 Sistema Administrativo CorteZapp - Controle Total 🔒</strong>
</div>
