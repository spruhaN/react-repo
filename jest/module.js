class ShareSaleException extends Error {
    constructor(message) {
      super(message);
    }
}
class Portfolio {
    // 2.1
    constructor() {
      this.symbols = [];
      this.shares = [];
    }
    // 2.2
    isEmpty() {
        return this.stockCount() === 0;
    }
    // 2.3
    stockCount() {
        return this.symbols.length;
    }
    // 2.4
    purchaseStock(given_symbol, given_shares) {
        const index = this.symbols.indexOf(given_symbol);
        if(given_shares < 0){
            throw new Error('no negative shares!');
        }
        if (index !== -1) {
          this.shares[index] += given_shares;
        }else if(given_shares !== 0) {
            this.symbols.push(given_symbol);
            this.shares.push(given_shares);
        }
    }
    //2.5
    sellStock(given_symbol, given_shares) {
        const index = this.symbols.indexOf(given_symbol);
        if(given_shares < 0){
            throw new Error('no negative shares!');
        }
        if (given_shares !== 0){
            if (index === -1) {
            throw new Error('symbol does not exist');
            } else if (given_shares > this.shares[index]) {
                //2.7
                throw new ShareSaleException('invalid shares_val: shares exceed amount');
            } else {
            this.shares[index] -= given_shares;
            if (this.shares[index] === 0) {
                this.symbols.splice(index, 1);
                this.shares.splice(index, 1);
            }
            }
        }
    }
    //2.6
    getShares(given_symbol){
        const index = this.symbols.indexOf(given_symbol);
        if(index !== -1) {
            return this.shares[index];
        }else{
            throw new Error("this symbol does not exist")
        }
    }
  }
export default { Portfolio, ShareSaleException };
