// app/_constants/cnae.ts

export const CNAE_OPTIONS = [
  { value: "9602-5/01", label: "Cabeleireiros, manicure e pedicure" },
  {
    value: "9602-5/02",
    label: "Atividades de estética e outros serviços de cuidados com a beleza",
  },
  {
    value: "9602-5/03",
    label: "Atividades de banhos, saunas, bronzeamento e congêneres",
  },
  {
    value: "4711-3/01",
    label:
      "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
  },
  {
    value: "4711-3/02",
    label:
      "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados",
  },
  { value: "4713-0/01", label: "Lojas de departamentos" },
  {
    value: "4713-0/02",
    label: "Lojas de variedades, exceto lojas de departamentos",
  },
  {
    value: "4721-1/02",
    label: "Padaria e confeitaria com predominância de revenda",
  },
  {
    value: "4721-1/03",
    label: "Comércio varejista de doces, balas, bombons e semelhantes",
  },
  {
    value: "4781-4/00",
    label: "Comércio varejista de artigos do vestuário e acessórios",
  },
  { value: "4782-2/01", label: "Comércio varejista de calçados" },
  {
    value: "4789-0/01",
    label: "Comércio varejista de suvenires, bijuterias e artesanatos",
  },
  {
    value: "4789-0/02",
    label: "Comércio varejista de artigos de caça, pesca e camping",
  },
  { value: "4789-0/03", label: "Comércio varejista de armas e munições" },
  { value: "4789-0/04", label: "Comércio varejista de artigos de colchoaria" },
  {
    value: "4789-0/05",
    label: "Comércio varejista de artigos de tapeçaria, cortinas e persianas",
  },
  {
    value: "4789-0/06",
    label:
      "Comércio varejista de outros artigos de uso pessoal e doméstico não especificados anteriormente",
  },
  {
    value: "4789-0/07",
    label: "Comércio varejista de produtos saneantes domissanitários",
  },
  { value: "4789-0/08", label: "Comércio varejista de artigos de iluminação" },
  {
    value: "4789-0/99",
    label:
      "Comércio varejista de outros produtos não especificados anteriormente",
  },
  {
    value: "5611-2/01",
    label:
      "Restaurantes e outros estabelecimentos de serviços de alimentação e bebidas",
  },
  {
    value: "5611-2/02",
    label: "Bares e outros estabelecimentos especializados em servir bebidas",
  },
  {
    value: "5611-2/03",
    label: "Lanchonetes, casas de chá, de sucos e similares",
  },
  {
    value: "5620-1/01",
    label:
      "Fornecimento de alimentos preparados preponderantemente para empresas",
  },
  {
    value: "5620-1/02",
    label: "Serviços de alimentação para eventos e recepções - bufê",
  },
  {
    value: "5620-1/03",
    label: "Cantinas - serviços de alimentação privativos",
  },
  {
    value: "5620-1/04",
    label:
      "Fornecimento de alimentos preparados preponderantemente para consumo domiciliar",
  },
] as const

export const ESTADOS_BRASIL = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
] as const

// Função utilitária para validar CPF
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/[^\d]/g, "")

  if (cleanCPF.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false // Sequências como 111.111.111-11

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0
  if (checkDigit !== parseInt(cleanCPF.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0
  if (checkDigit !== parseInt(cleanCPF.charAt(10))) return false

  return true
}

// Função utilitária para validar CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "")

  if (cleanCNPJ.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false // Sequências como 11.111.111/1111-11

  let size = cleanCNPJ.length - 2
  let numbers = cleanCNPJ.substring(0, size)
  const digits = cleanCNPJ.substring(size)
  let sum = 0
  let pos = size - 7

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  size = size + 1
  numbers = cleanCNPJ.substring(0, size)
  sum = 0
  pos = size - 7

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false

  return true
}

// Função para formatar CPF
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/[^\d]/g, "")
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

// Função para formatar CNPJ
export const formatCNPJ = (cnpj: string): string => {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "")
  return cleanCNPJ.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  )
}

// Função para formatar CEP
export const formatCEP = (cep: string): string => {
  const cleanCEP = cep.replace(/[^\d]/g, "")
  return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2")
}
