import yahooFinance from 'yahoo-finance2'
import { Command } from 'commander'
import { AsciiTable3 } from 'ascii-table3'

const program = new Command()
const table = new AsciiTable3()

export async function getData(ticker) {
  const quote = await yahooFinance.quote(ticker)
  return {
    symbol: quote.symbol,
    name: quote.longName,
    type: quote.quoteType,
    price: quote.regularMarketPrice,
    change: quote.regularMarketChangePercent,
    marketCap: quote.marketCap,
  };
}

export function showTable(data){
  table
    .setTitle('Details of Ticker')
    .setHeading('Details', 'Value')
    .setAlignCenter(1)
    .setAlignCenter(2)
    .addRow('Symbol', data.symbol)
    .addRow('Name', data.name)
    .addRow('Type', data.type)
    .addRow('Price', data.price)
    .addRow('Change (%)', data.change)
    .addRow('Market Cap', data.marketCap);
  
  table.setStyle('unicode-mix').setJustify()
  console.log(table.toString())
  return table.toString()

}

async function main() {
  program
    .option('-t, --ticker <string>', 'name of equity')

  program.parse()
    const options = program.opts()
  
  showTable(await getData(options.ticker))  
}

try {
  await main()
} catch (e) {
  console.error(e)
}