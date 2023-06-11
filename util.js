export const pick = (obj, ...keys) => {
  const res = {}
  for (const key of keys) {
    res[key] = obj[key]
  }
  return res
}

export const todo = (msg) => { throw new Error("TODO" + (msg ? `: ${msg}` : "")) }

export const match = (obj, cases) => {
  const kind = obj.kind
  if (cases[kind] === undefined) {
    if (cases["_"] !== undefined) return cases["_"](obj)
    throw new Error(`No case for ${kind}`)
  }
  return cases[kind](obj)
}
