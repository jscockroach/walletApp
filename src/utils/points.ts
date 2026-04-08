const MS_PER_DAY = 24 * 60 * 60 * 1000

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear()
  const month = date.getMonth()

  if (month >= 2 && month <= 4) {
    return new Date(year, 2, 1)
  }

  if (month >= 5 && month <= 7) {
    return new Date(year, 5, 1)
  }

  if (month >= 8 && month <= 10) {
    return new Date(year, 8, 1)
  }

  return month === 11 ? new Date(year, 11, 1) : new Date(year - 1, 11, 1)
}

function getDayOfSeason(date: Date): number {
  const seasonStart = getSeasonStart(date)
  const diff = date.getTime() - seasonStart.getTime()
  return Math.floor(diff / MS_PER_DAY) + 1
}

export function calculateDailyPoints(date: Date): number {
  const seasonDay = getDayOfSeason(date)

  if (seasonDay <= 1) {
    return 2
  }

  if (seasonDay === 2) {
    return 3
  }

  let twoDaysAgo = 2
  let previousDay = 3

  for (let day = 3; day <= seasonDay; day += 1) {
    const current = Math.round(twoDaysAgo + previousDay * 0.6)
    twoDaysAgo = previousDay
    previousDay = current
  }

  return previousDay
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`
  }

  return String(points)
}
