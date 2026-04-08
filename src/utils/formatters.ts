const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const detailDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  hour12: false,
})

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatDetailDate(dateISO: string): string {
  const date = new Date(dateISO)
  return detailDateFormatter.format(date)
}

export function formatListDate(dateISO: string, now = new Date()): string {
  const date = new Date(dateISO)

  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.floor(
    (startOfNow.getTime() - startOfDate.getTime()) / (24 * 60 * 60 * 1000),
  )

  if (diffDays >= 0 && diffDays <= 6) {
    return weekdayFormatter.format(date)
  }

  return shortDateFormatter.format(date)
}
