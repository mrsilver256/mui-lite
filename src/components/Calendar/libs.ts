export const generateData = () => {
  const days = []
  for (let i = 0; i < 31; i++) {
    days.push(i + 1)
  }
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(i + 1)
  }
  const years = []
  for (let i = 1900; i < 2100; i++) {
    years.push(i)
  }
  const dayInWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return {
    days,
    months,
    years,
    dayInWeek
  }
}

export const formatDate = (d: string) => {
  return d.length == 1 ? '0' + d : d
}

export const isValid = (y: string, m: string, d: string) => {
  return new Date(y + '-' + m + '-' + formatDate(d)).getDate().toString() === d
}
