const YahooFinance = require("yahoo-finance2").default;
const { Command } = require('commander')
const { AsciiTable3 } = require('ascii-table3')

const yahooFinance = YahooFinance
const program = new Command()
const table = new AsciiTable3()

program
  .option('-t, --ticker <string>', 'name of equity')

program.parse()
const options = program.opts()

async function main() {
  const quote = await yahooFinance.quote(options.ticker);

  table
    .setTitle('Details of Ticker')
    .setHeading('Details', 'Value')
    .setAlignCenter(1)
    .setAlignCenter(2)
    .addRow('Symbol', quote.symbol)
    .addRow('Name', quote.longName)
    .addRow('Type', quote.quoteType)
    .addRow('Price', quote.regularMarketPrice)
    .addRow('Change (%)', quote.regularMarketChangePercent)
    .addRow('Market Cap', quote.marketCap);
  
  table.setStyle('unicode-mix')
  table.setJustify()
  console.log(table.toString())
  console.log(table.transpose().setStyle('unicode-mix').toString())
}

(async () => {
  try {
    await main() 
  } catch (error) {
    console.log(error)
  }
})()