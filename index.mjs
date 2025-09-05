import YahooFinance from 'yahoo-finance2'
import { Command } from 'commander'

const yahooFinance = YahooFinance
const program = new Command()

program
  .option('-t, --ticker <string>', 'name of equity')

program.parse();

const data = await yahooFinance.quote('AAPL')

console.log(data)

const options = program.opts();

console.log(options.ticker)
