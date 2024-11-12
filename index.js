

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3010;
let stocks = [
  {
    id: 1,
    name: 'reliance industries',
    price: 2500,
    growth: 3.5,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 2,
    name: 'hdfc bank',
    price: 1800,
    growth: 4.2,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 3,
    name: 'icici bank',
    price: 1600,
    growth: 5.1,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 4,
    name: 'tata consultancy services',
    price: 3200,
    growth: 2.9,
    industry: 'finance',
    exchange: 'bse',
    price: 1900,
  },
  {
    id: 5,
    name: 'infosys',
    price: 2900,
    growth: 3.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 7,
    name: 'sun pharmaceutical',
    price: 2300,
    growth: 3.2,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 8,
    name: 'cipla',
    growth: 2.6,
    price: 2100,
    exchange: 'bse',
    industry: 'pharma',
  },
  {
    id: 9,
    name: 'ntpc',
    price: 1200,
    growth: 4.1,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 10,
    name: 'power grid corporation',
    price: 1500,
    growth: 3.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 11,
    name: 'adani power',
    price: 2200,
    growth: 5.3,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 12,
    name: 'lupin',
    price: 2000,
    growth: 4.5,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 13,
    name: 'axis bank',
    price: 1750,
    growth: 2.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 14,
    name: 'state bank of india',
    price: 1450,
    growth: 3.6,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 15,
    name: 'bajaj finance',
    price: 2650,
    growth: -2.9,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 17,
    name: 'biocon',
    price: 1850,
    growth: 3.9,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 18,
    name: 'torrent power',
    price: 1600,
    growth: 2.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 19,
    name: 'tata power',
    price: 1750,
    growth: 4.0,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 20,
    name: 'jsw energy',
    price: 1450,
    growth: 3.1,
    industry: 'power',
    exchange: 'bse',
  },
];
app.get('/stocks', (req, res) => {
  res.json({ stocks });
});

// Endpoint 2: Sort stocks by pricing
function sortStocksByPricing(stock1, stock2, pricing) {
  if (pricing === 'low-to-high') {
    return stock1.price - stock2.price;
  } else if (pricing === 'high-to-low') {
    return stock2.price - stock1.price;
  } else {
    return 0;
  }
}

// Endpoint to get stocks sorted by pricing
app.get('/stocks/sort/pricing', (req, res) => {
  let pricing = req.query.pricing; 
  let stockCopy = stocks.slice(); 
  let result = stockCopy.sort((stock1,stock2)=>sortStocksByPricing(stock1,stock2,pricing)) 
  res.json({ stocks: result }); 
});

// Endpoint 3: Sort stocks by growth
function sortStocksByGrowth(stock1,stock2, growth) {
  if (growth === 'high-to-low') {
    return stock2.growth - stock1.growth
  } else if(growth === 'low-to-high'){
    return stock1.growth - stock2.growth
  }
  return 0;
}

app.get('/stocks/sort/growth', (req, res) => {
  let growth = req.query.growth;
  let stockCopy = stocks.slice();
  let result = stockCopy.sort((stock1,stock2)=>sortStocksByGrowth(stock1,stock2,growth))
  res.json({ stocks: result });
});

// Endpoint 4: Filter stocks by exchange (NSE/BSE)
function filterByExchange(stockObj, exchange) {
  return stockObj.filter(
    (stock) => stock.exchange.toLowerCase() === exchange.toLowerCase()
  );
}

app.get('/stocks/filter/exchange', (req, res) => {
  let exchange = req.query.exchange;
  let filteredStocks = filterByExchange(stocks, exchange);
  res.json({ stocks: filteredStocks });
});

// Endpoint 5: Filter stocks by industry
function filterByIndustry(stockObj, industry) {
  return stockObj.filter(
    (stock) => stock.industry.toLowerCase() === industry.toLowerCase()
  );
}

app.get('/stocks/filter/industry', (req, res) => {
  let industry = req.query.industry;
  let filteredStocks = filterByIndustry(stocks, industry);
  res.json({ stocks: filteredStocks });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
