import mut from './module.js'

// 2.1: A portfolio is always created with an empty number of shares (and no ticker symbols in it)
test('new portfolio ~ empty', () => {
    const p = new mut.Portfolio();
    expect(p.symbols).toEqual([]);
    expect(p.shares).toEqual([]);
});

// 2.2: The stock portfolio shall answer whether it is empty (no shares owned)
test('isEmpty() ~ true', () => {
    const p = new mut.Portfolio();
    expect(p.isEmpty()).toBe(true);
});

// 2.3: The stock portfolio shall answer its count of unique ticker symbols
test('stockCount() ~ filled(2)', ()=>{
  const p = new mut.Portfolio();
  p.symbols=['GME', 'RBLX']
  p.shares=[5, 10]
  expect(p.stockCount()).toBe(2);
});


// 2.4: Make a purchase. Given a symbol and # of shares, the portfolio should be updated accordingly (add shares to a symbol)
test('(1)purchaseStock(symbol, share) ~ +share', ()=>{
  const p = new mut.Portfolio();

  p.purchaseStock('AAPL', 25);

  expect(p.symbols[0]).toBe('AAPL');
  expect(p.shares[0]).toBe(25);
});

// 2.5: Make a sale. Given a symbol and # of shares, the portfolio should be updated accordingly (subtract shares from a symbol)
test('(1)sellStock(symbol, share) ~ -share', ()=>{
    const p = new mut.Portfolio();
  
    p.purchaseStock('AAPL', 25);
    p.sellStock('AAPL',20)

    expect(p.symbols[0]).toBe('AAPL');
    expect(p.shares[0]).toBe(5);
  });


// 2.6: The stock portfolio shall answer how many shares exist for a given symbol.
test("(1)getShares(symbol) ~ amount", ()=>{
    const p = new mut.Portfolio();
    p.purchaseStock('AAPL', 50);
    p.sellStock('AAPL',10);

    expect(p.getShares('AAPL')).toBe(40);
});

// 2.7: The portfolio should keep only owned symbols. If symbols are in the portfolio, that means at least one stock should be owned.
test('symbols must be owned by shares ~ if at 0 then doesn\'t exist', () => {
    const p = new mut.Portfolio();
  
    p.purchaseStock('AAPL', 20);  
    p.sellStock('AAPL', 20);
  
    expect(p.isEmpty()).toBe(true);
    expect(p.shares).toEqual([]);
  });

// 2.8: It should not be possible to sell too many shares. Raise an exception (named ShareSaleException) when attempting to sell more shares than actually owned by the portfolio.
test('cannot oversell stocks ~ throws predef err', () => {
    const p = new mut.Portfolio();
  
    p.purchaseStock('AAPL', 20);  
    expect(()=>p.sellStock('AAPL', 25)).toThrowError(mut.ShareSaleException);

  });
