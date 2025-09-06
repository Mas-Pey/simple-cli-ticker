import { expect, test } from 'vitest'
import { getData, showTable } from './index.mjs'

test('can get data from yahoo finance using ticker parameter', async () => {
    const data = await getData('AAPL')
    expect(data.symbol).toBe('AAPL')
    expect(data.name).toBe('Apple Inc.')
    expect(data.type).toBe('EQUITY')
    expect(data.price).toEqual(expect.any(Number))
    expect(data.change).toEqual(expect.any(Number))
    expect(data.marketCap).toEqual(expect.any(Number))
})

test('cannot get data missing ticker symbol', async () => {
    await expect(getData()).rejects.toThrow('Ticker is required')
})

test('can show table', () => {
    const data = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'EQUITY',
        price: 299.10,
        change: 0.5,
        marketCap: 32914123
    }
    try {
        showTable(data)
    } catch (err) {
        expect(err).toBeFalsy()
    }
})