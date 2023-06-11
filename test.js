import assert from "node:assert"
import {pick, todo, match, isString, isNumber, dispatcher} from "./index.js"

suite("pick", () => {
  test("picks all and only the given properties", () => {
    const x = pick({a: 1, b: 2, c: 3}, "b", "c")
    assert.deepEqual(x, {b: 2, c: 3})
  })
})

suite("todo", () => {
  test("throws", () => assert.throws(() => todo()))
})

suite("match", () => {
  test("works when a kind is handled", () => {
    assert.equal(
      match({kind: "a", x: 1}, {
        a: ({x}) => x,
        b: () => null
      }),
      1
    )
  })

  test("throws when a kind is not handled", () => {
    assert.throws(() => {
      match({kind: "a"}, {
        b: () => 1,
        c: () => 2
      })
    })
  })
})

suite("isString", () => {
  test("handles string literals", () => assert.strictEqual(isString("a"), true))
  test("handles string objects", () => assert.strictEqual(isString(new String("a")), true))
  test("handles number literals", () => assert.strictEqual(isString(12), false))
})

suite("isNumber", () => {
  test("handles number literals", () => assert.strictEqual(isNumber(1), true))
  test("handles number objects", () => assert.strictEqual(isNumber(new Number(1)), true))
  test("handles NaN", () => assert.strictEqual(isNumber(Number.NaN), true))
  test("handles Infinity", () => assert.strictEqual(isNumber(Number.POSITIVE_INFINITY), true))
  test("handles string literals", () => assert.strictEqual(isNumber("a"), false))
})

suite("dispatcher", () => {
  test("works in simple cases", () => {
    const show = dispatcher()

    show.register(isNumber, (x) => `Num ${x}`)
    show.register(isString, (x) => `Str "${x}"`)

    assert.strictEqual(show(1), "Num 1")
    assert.strictEqual(show("a"), "Str \"a\"")
  })

  test("the last registration wins", () => {
    const show = dispatcher()

    show.register(isNumber, (x) => `Num1 ${x}`)
    show.register(isNumber, (x) => `Num2 ${x}`)

    assert.strictEqual(show(1), "Num2 1")
  })
})