export const getNotificationTypeIcon = (type: string) => {
  switch (type) {
    case "email":
      return "📧"
    case "whatsapp":
      return "📱"
    case "sms":
      return "💬"
    case "push":
      return "🔔"
    default:
      return "📢"
  }
}

export const getNotificationStatusColor = (status: string) => {
  switch (status) {
    case "sent":
      return "bg-green-100 text-green-800"
    case "delivered":
      return "bg-blue-100 text-blue-800"
    case "read":
      return "bg-purple-100 text-purple-800"
    case "failed":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getNotificationStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return "✅"
    case "delivered":
      return "📨"
    case "read":
      return "👁️"
    case "failed":
      return "❌"
    case "pending":
      return "⏳"
    default:
      return "❓"
  }
}

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "agora mesmo"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} min atrás`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h atrás`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} dias atrás`
  } else {
    return formatDate(date)
  }
}

export const getNotificationChannelName = (channel: string): string => {
  switch (channel) {
    case "email":
      return "Email"
    case "whatsapp":
      return "WhatsApp"
    case "sms":
      return "SMS"
    case "push":
      return "Push Notification"
    default:
      return "Desconhecido"
  }
}

export const getNotificationChannelColor = (channel: string): string => {
  switch (channel) {
    case "email":
      return "bg-blue-100 text-blue-800"
    case "whatsapp":
      return "bg-green-100 text-green-800"
    case "sms":
      return "bg-purple-100 text-purple-800"
    case "push":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getNotificationChannelIcon = (channel: string) => {
  switch (channel) {
    case "email":
      return "📧"
    case "whatsapp":
      return "📱"
    case "sms":
      return "💬"
    case "push":
      return "🔔"
    default:
      return "📢"
  }
}

export const getBookingStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getBookingStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return "✅"
    case "pending":
      return "⏳"
    case "cancelled":
      return "❌"
    case "completed":
      return "🎉"
    default:
      return "❓"
  }
}
