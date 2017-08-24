export const persist = (obj) => { Object.keys(obj).forEach(key => { if (obj) window.sessionStorage['coursica:' + key] = JSON.stringify(obj[key]) }) }
export const load = (key) => {
  const saved = window.sessionStorage['coursica:' + key]
  try {
    return saved ? JSON.parse(saved) : null
  } catch (err) {
    console.error(err)
    return null
  }
}
