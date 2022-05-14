export default function (time: string | undefined): string {
  if (!time) return ""
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return `${y}-${m >= 10 ? m : '0' + m}-${d >= 10 ? d : '0' + d} ${hh >= 10 ? hh: '0' + hh}:${mm >= 10 ? mm : '0' + mm}:${ss >= 10 ? ss : '0' + ss}`
}