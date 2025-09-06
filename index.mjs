import { fileURLToPath } from 'url'
import yahooFinance from 'yahoo-finance2'
import { Command } from 'commander'
import { AsciiTable3 } from 'ascii-table3'

const __filename = fileURLToPath(import.meta.url)
const program = new Command()

export async function getData(ticker) {
  if(!ticker){
    throw new Error('Ticker is required')
  }
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
  const table = new AsciiTable3()
  table
    .setTitle('Details of Ticker')
    .setHeading('Details', 'Value')
    .setAlignCenter(1)
    .setAlignCenter(2)
    .addRow('Symbol', data.symbol)
    .addRow('Name', data.name)
    .addRow('Type', data.type)
    .addRow('Price', data.price)
    .addRow('Change (%)', data.change?.toFixed(2) + ' %')
    .addRow('Market Cap', data.marketCap);
  
  table.setStyle('unicode-mix').setJustify()
  console.log(table.toString())
  return table.toString()
}

export function showCompare(dataList) {
  const table = new AsciiTable3()
  table
    .setTitle('Tickers Comparison')
    .setHeading('Symbol', 'Name', 'Price', 'Change (%)', 'Market Cap')
    .setHeadingAlignCenter()
    .setAlignCenter(3)
    .setAlignCenter(5)
    .setAlignCenter(4)

  for (const data of dataList) {
    table.addRow(
      data.symbol,
      data.name,
      data.price,
      data.change?.toFixed(2) + ' %',
      data.marketCap ? data.marketCap.toLocaleString() : '-'
    )
  }

  table.setStyle('unicode-mix')
  console.log(table.toString())
  return table.toString()
}

async function main() {
  program
    .option('-t, --ticker <string>', 'name of equity')
    .option('-c, --compare <string>', 'ticker comparison comma separated (e.g. AAPL,GOOGL)')

  program.parse()
  
  const options = program.opts()
  
  if (options.ticker) {
    showTable(await getData(options.ticker))
  }

  if (options.compare) {
    const tickers = options.compare.split(',').map(t => t.trim().toUpperCase())
    const listTickers = []
    for (const t of tickers) {
      try {
        listTickers.push(await getData(t))
      } catch (e) {
        console.error(e.message)
      }
    }
    if (listTickers.length > 0) showCompare(listTickers)
  }

}

if (__filename === process.argv[1]) {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
}
