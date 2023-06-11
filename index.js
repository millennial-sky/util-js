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

export const isString = (s) => Object.prototype.toString.call(s) === "[object String]"

export const isNumber = (x) => Object.prototype.toString.call(x) === "[object Number]"

export const dispatcher = () => {
  const table = []

  const dispatcher = (...args) => {
    for (let i = table.length - 1; i >= 0; i--) {
      const [guard, fn] = table[i]
      if (guard(...args)) return fn(...args)
    }
  }

  dispatcher.register = (guard, fn) => {
    table.push([guard, fn])
  }

  return dispatcher
}
