import React from "react";
import Stock from "./Stock";

function PortfolioContainer({purchasedStocks, onSellStock}) {
  return (
    <div>
      <h2>My Portfolio</h2>
        {purchasedStocks.map(stock => <Stock key={stock.name} stock={stock} onStockClick={onSellStock} />)}
    </div>
  );
}

export default PortfolioContainer;
