import { Metadata } from "next"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  Settings,
  Building2,
  Phone,
  MapPin,
  Image,
  Palette,
  Eye,
  ArrowLeft,
  CheckCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  FileText,
  Hash,
  Upload,
  Globe,
} from "lucide-react"
import { Alert, AlertDescription } from "@/app/_components/ui/alert"

export const metadata: Metadata = {
  title: "Configurações da Barbearia - Tutorial CorteZapp",
  description:
    "Aprenda a configurar todos os dados da sua barbearia: empresa, contato, endereço, imagens e tema personalizado",
}

export default function ConfiguracoesBarbeariaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/tutoriais"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Tutoriais
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Configurações da Barbearia</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>Configurações</Badge>
                <Badge variant="secondary">Leitura: 18 min</Badge>
                <Badge variant="secondary">Nível: Básico</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Configure todos os dados da sua barbearia no CorteZapp. Aprenda a
            preencher informações da empresa, contato, endereço, upload de
            imagens e personalizar o tema visual da sua barbearia.
          </p>
        </div>

        {/* TL;DR */}
        <Alert className="mb-12 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription>
            <strong className="font-bold">TL;DR (Resumo Rápido):</strong> A
            página de Configurações permite editar todos os dados da sua
            barbearia. Há 5 seções principais: Dados da Empresa, Contato,
            Endereço, Imagens e Configurações Gerais. O sistema preenche
            automaticamente o endereço pelo CEP e valida CPF/CNPJ.
          </AlertDescription>
        </Alert>

        {/* Table of Contents */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Índice do Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#visao-geral" className="text-primary hover:underline">
                  1. Visão Geral da Página
                </a>
              </li>
              <li>
                <a
                  href="#dados-empresa"
                  className="text-primary hover:underline"
                >
                  2. Dados da Empresa
                </a>
              </li>
              <li>
                <a href="#contato" className="text-primary hover:underline">
                  3. Contato
                </a>
              </li>
              <li>
                <a href="#endereco" className="text-primary hover:underline">
                  4. Endereço
                </a>
              </li>
              <li>
                <a href="#imagens" className="text-primary hover:underline">
                  5. Imagens da Barbearia
                </a>
              </li>
              <li>
                <a
                  href="#configuracoes"
                  className="text-primary hover:underline"
                >
                  6. Configurações Gerais
                </a>
              </li>
              <li>
                <a href="#visualizar" className="text-primary hover:underline">
                  7. Visualizar Loja
                </a>
              </li>
              <li>
                <a href="#dicas" className="text-primary hover:underline">
                  8. Dicas Importantes
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Section 1 */}
          <section id="visao-geral">
            <h2 className="mb-6 text-3xl font-bold">
              1. Visão Geral da Página
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  A página de Configurações é onde você gerencia todos os dados
                  da sua barbearia. É uma das páginas mais importantes, pois
                  essas informações são exibidas para seus clientes e usadas em
                  todo o sistema.
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Elementos principais da página:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <Settings className="h-4 w-4" />
                        Título &quot;Dados da Loja&quot;
                      </strong>
                      <p className="text-xs text-blue-700">
                        Cabeçalho da página com nome da seção
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <Eye className="h-4 w-4" />
                        Botão &quot;Visualizar Loja&quot;
                      </strong>
                      <p className="text-xs text-green-700">
                        Abre sua barbearia em nova aba para ver como fica
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <FileText className="h-4 w-4" />5 Seções de Formulário
                      </strong>
                      <p className="text-xs text-purple-700">
                        Dados da Empresa, Contato, Endereço, Imagens,
                        Configurações
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <CheckCircle className="h-4 w-4" />
                        Botão &quot;Salvar Alterações&quot;
                      </strong>
                      <p className="text-xs text-orange-700">
                        Salva todas as modificações feitas no formulário
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Todas as informações
                    preenchidas aqui aparecem para seus clientes no app.
                    Certifique-se de que os dados estão corretos e atualizados.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section id="dados-empresa">
            <h2 className="mb-6 text-3xl font-bold">2. Dados da Empresa</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Informações empresariais</h3>
                    <p className="text-sm text-muted-foreground">
                      Dados oficiais da sua empresa ou CNPJ
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos da seção:</h4>
                  <div className="space-y-4">
                    {/* Código da Loja */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm">Código da Loja</strong>
                        <Badge variant="secondary">Somente leitura</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Código único gerado automaticamente pelo sistema. Não
                        pode ser alterado.
                      </p>
                    </div>

                    {/* Razão Social */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Razão Social *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome oficial da empresa conforme registro (ex:
                        &quot;João Silva ME&quot;, &quot;Barbearia São Paulo
                        LTDA&quot;)
                      </p>
                    </div>

                    {/* Nome Fantasia */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Nome Fantasia *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome comercial da barbearia (ex: &quot;Barbearia do
                        João&quot;, &quot;Corte & Estilo&quot;)
                      </p>
                    </div>

                    {/* CNAE */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">CNAE *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Código de atividade econômica. Selecione na lista
                        suspensa. Para barbearias geralmente é &quot;9602-5/00 -
                        Atividades de cuidados com a beleza&quot;
                      </p>
                    </div>

                    {/* CPF/CNPJ */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">CPF/CNPJ *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        CPF (11 dígitos) ou CNPJ (14 dígitos). O sistema aplica
                        máscara automaticamente e valida o documento.
                      </p>
                    </div>

                    {/* Inscrição Estadual */}
                    <div className="rounded-lg border-2 border-dashed p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm">Inscrição Estadual</strong>
                        <Badge variant="outline">Opcional</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Aparece apenas quando você digita um CNPJ. Necessário
                        para empresas que fazem vendas interestaduais.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Validação automática:</strong> O sistema valida CPF
                    e CNPJ em tempo real. Se o documento for inválido, aparecerá
                    uma mensagem de erro.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section id="contato">
            <h2 className="mb-6 text-3xl font-bold">3. Contato</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Informações de contato</h3>
                    <p className="text-sm text-muted-foreground">
                      Como seus clientes podem entrar em contato
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos da seção:</h4>
                  <div className="space-y-4">
                    {/* Telefones */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Telefones *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Telefones fixos ou celulares com DDD (ex: (11)
                        99999-9999, (11) 3333-3333). Separe múltiplos telefones
                        com vírgula.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Dica:</strong> Use números que você realmente
                    atende. Clientes podem ligar ou enviar mensagem no WhatsApp.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section id="endereco">
            <h2 className="mb-6 text-3xl font-bold">4. Endereço</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Localização da barbearia</h3>
                    <p className="text-sm text-muted-foreground">
                      Endereço completo para clientes encontrarem sua loja
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos da seção:</h4>
                  <div className="space-y-4">
                    {/* CEP */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <strong className="text-sm">CEP *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Código postal (ex: 01234-567). Ao digitar, o sistema
                        preenche automaticamente endereço, bairro, cidade e
                        estado.
                      </p>
                    </div>

                    {/* Endereço */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Endereço *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nome da rua, avenida, etc. Preenchido automaticamente
                        pelo CEP.
                      </p>
                    </div>

                    {/* Número */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Número *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Número do imóvel (ex: 123, 456-A)
                      </p>
                    </div>

                    {/* Complemento */}
                    <div className="rounded-lg border-2 border-dashed p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm">Complemento</strong>
                        <Badge variant="outline">Opcional</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Informações adicionais (ex: Apto, Sala, etc.)
                      </p>
                    </div>

                    {/* Bairro */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Bairro *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Preenchido automaticamente pelo CEP.
                      </p>
                    </div>

                    {/* Cidade */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Cidade *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Preenchido automaticamente pelo CEP.
                      </p>
                    </div>

                    {/* Estado */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Estado *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Selecione na lista suspensa. Preenchido automaticamente
                        pelo CEP.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Preenchimento automático:</strong> Digite o CEP e o
                    sistema busca automaticamente endereço, bairro, cidade e
                    estado usando a API do ViaCEP.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section id="imagens">
            <h2 className="mb-6 text-3xl font-bold">5. Imagens da Barbearia</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <Image className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Fotos da sua barbearia</h3>
                    <p className="text-sm text-muted-foreground">
                      Imagens que aparecem para seus clientes
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos da seção:</h4>
                  <div className="space-y-4">
                    {/* Imagem de Perfil */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Upload className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Imagem de Perfil (Avatar) *
                        </strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Foto principal da barbearia que aparece como avatar
                        circular na listagem. Formatos aceitos: JPG, PNG, GIF.
                      </p>
                    </div>

                    {/* Banner */}
                    <div className="rounded-lg border-2 border-dashed p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Upload className="h-4 w-4 text-gray-600" />
                        <strong className="text-sm">Banner da Barbearia</strong>
                        <Badge variant="outline">Opcional</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Banner horizontal que aparece como fundo no perfil da
                        barbearia. Formatos aceitos: JPG, PNG, GIF.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <Info className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Dica:</strong> Use imagens de boa qualidade que
                    representem bem sua barbearia. Imagens pequenas ou borradas
                    podem prejudicar a imagem profissional.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section id="configuracoes">
            <h2 className="mb-6 text-3xl font-bold">6. Configurações Gerais</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-3">
                    <Palette className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Personalização visual</h3>
                    <p className="text-sm text-muted-foreground">
                      Tema e descrição da sua barbearia
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Campos da seção:</h4>
                  <div className="space-y-4">
                    {/* Descrição */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <strong className="text-sm">
                          Descrição da Empresa *
                        </strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Descreva sua empresa, serviços oferecidos,
                        diferenciais... Aparece para clientes no app.
                      </p>
                    </div>

                    {/* Tema */}
                    <div className="rounded-lg border-2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4 text-primary" />
                        <strong className="text-sm">Tema da Barbearia *</strong>
                        <Badge>Obrigatório</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cor principal da sua barbearia. Escolha entre: Dark
                        (Padrão), Vermelho, Rosa, Laranja, Verde, Azul, Amarelo,
                        Violeta - cada um com versão Claro e Escuro.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-indigo-200 bg-indigo-50">
                  <Info className="h-4 w-4 text-indigo-600" />
                  <AlertDescription className="text-indigo-800">
                    <strong>Personalização:</strong> O tema escolhido define as
                    cores principais da sua barbearia em todas as páginas quando
                    os clientes visitarem.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section id="visualizar">
            <h2 className="mb-6 text-3xl font-bold">7. Visualizar Loja</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-teal-100 p-3">
                    <Eye className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Como sua barbearia aparece</h3>
                    <p className="text-sm text-muted-foreground">
                      Veja como seus clientes visualizam sua barbearia
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-muted-foreground">
                    O botão &quot;Visualizar Loja&quot; abre sua barbearia em
                    uma nova aba, mostrando exatamente como ela aparece para
                    seus clientes no aplicativo. Use esta função para:
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">
                    Verificações importantes:
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-green-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-green-900">
                        <CheckCircle className="h-4 w-4" />
                        Imagens carregando corretamente
                      </strong>
                      <p className="text-xs text-green-700">
                        Verifique se as imagens de perfil e banner estão
                        visíveis
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-blue-900">
                        <CheckCircle className="h-4 w-4" />
                        Informações completas
                      </strong>
                      <p className="text-xs text-blue-700">
                        Confirme se todos os dados estão preenchidos
                        corretamente
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-purple-900">
                        <CheckCircle className="h-4 w-4" />
                        Tema aplicado
                      </strong>
                      <p className="text-xs text-purple-700">
                        Verifique se as cores do tema escolhido estão aplicadas
                      </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 p-3">
                      <strong className="flex items-center gap-2 text-sm text-orange-900">
                        <CheckCircle className="h-4 w-4" />
                        Layout responsivo
                      </strong>
                      <p className="text-xs text-orange-700">
                        Teste em diferentes tamanhos de tela (celular, tablet)
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="border-teal-200 bg-teal-50">
                  <Info className="h-4 w-4 text-teal-600" />
                  <AlertDescription className="text-teal-800">
                    <strong>Dica:</strong> Visualize sua loja sempre que fizer
                    alterações para garantir que tudo está funcionando
                    corretamente.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section id="dicas">
            <h2 className="mb-6 text-3xl font-bold">8. Dicas Importantes</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Melhores práticas:</h4>
                  <div className="space-y-4">
                    {/* Dica 1 */}
                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <h5 className="font-semibold text-blue-900">
                            Mantenha dados atualizados
                          </h5>
                          <p className="text-sm text-blue-800">
                            Sempre que houver mudanças (endereço, telefone,
                            etc.), atualize imediatamente para evitar confusão
                            dos clientes.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 2 */}
                    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <h5 className="font-semibold text-green-900">
                            Use imagens de qualidade
                          </h5>
                          <p className="text-sm text-green-800">
                            Invista em fotos profissionais ou use imagens bem
                            iluminadas e nítidas. A primeira impressão é
                            crucial.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 3 */}
                    <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                          <h5 className="font-semibold text-purple-900">
                            Escolha tema apropriado
                          </h5>
                          <p className="text-sm text-purple-800">
                            Selecione cores que reflitam a identidade da sua
                            barbearia e que sejam agradáveis aos olhos.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 4 */}
                    <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-orange-600" />
                        <div>
                          <h5 className="font-semibold text-orange-900">
                            Teste regularmente
                          </h5>
                          <p className="text-sm text-orange-800">
                            Use o botão &quot;Visualizar Loja&quot;
                            periodicamente para verificar se tudo está
                            funcionando corretamente.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dica 5 */}
                    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="mt-1 h-5 w-5 text-red-600" />
                        <div>
                          <h5 className="font-semibold text-red-900">
                            Validação de documentos
                          </h5>
                          <p className="text-sm text-red-800">
                            O sistema valida CPF e CNPJ automaticamente.
                            Certifique-se de que os documentos estão corretos
                            antes de salvar.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Atenção:</strong> Sempre clique em &quot;Salvar
                    Alterações&quot; após fazer modificações. Caso contrário, as
                    mudanças serão perdidas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <Link href="/tutoriais">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Tutoriais
            </Button>
          </Link>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tutorial anterior</p>
            <Link href="/tutoriais/gerenciar-servicos">
              <Button size="lg" variant="ghost">
                Gerenciar Serviços
              </Button>
            </Link>
          </div>
        </div>

        {/* Help CTA */}
        <Card className="mt-8 border-2">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Dúvidas sobre Configurações?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Nossa equipe está pronta para ajudar você
            </p>
            <Button size="lg">Falar com Suporte</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
