import {inputRandomized, outputOptimized} from "./task_softserve/Test_optimization"
import {reducerReplacement} from "./task_softserve/Test_reduce"

describe('check "timerMeasurements" function', () => {
    test('check random input', async () => {
        const outputArray = await inputRandomized(10)
        expect(outputArray.length).toBe(10)
    })
    test('check random empty input', async () => {
        const outputArray = await inputRandomized()
        expect(outputArray.length).toBe(1)
    })
})
describe('check "outputOptimized" function with different inputs', () => {
    test('check no inputs', async () => {
        const outputArray = await outputOptimized( 'a', 'b')
        expect(outputArray).toBeUndefined()
        expect(() => {
            outputArray()}).toThrow(TypeError)
    })
    test('check random empty input', async () => {
        const outputArray = await outputOptimized()
        expect(outputArray).toBeUndefined()
    })
    test('check no-empty input', async () => {
        const log = jest.fn()
        global.console = { log }
        const checkedValue = 'best'
        const output = await outputOptimized(checkedValue)
            .then(value => console.log(value))
        expect(log).toHaveBeenCalledWith(output);
    })
})
describe('check "Test_reduce" function with different inputs', () => {
    test('check no inputs', async () => {
        const data = []
        const output = await reducerReplacement(...data).then(value => value.toString() )
        expect(output).toEqual('0')
    })
    test('check raw inputs', async () => {
        const data = ['a', 'b']
        const output = await reducerReplacement(...data).then(value => value.toString() )
        expect(output).toEqual('0a,b')
    })
    test('check inputs with promises', async () => {
        const p1 = Promise.resolve(143134);
        const p2 = 1337.49;
        const p3 =new Promise((resolve, reject) => {
            setTimeout(resolve, 0, "sample");
        });
        const data = [p1, p2, p3]
        const output = await reducerReplacement(...data).then(value => value.toString() )
        expect(output).toEqual('0143134,1337.49,sample')
    })
})
