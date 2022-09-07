import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [purchasedStocks, setPurchasedStocks] = useState(stocks)
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState([])
  

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then(res => res.json())
    .then(data => setStocks([...data]))
  }, [])

  function buyStock(stock){
    const boughtStock = purchasedStocks.find(
      pstock => pstock.id === stock.id
    )
    if(!boughtStock) {
      setPurchasedStocks([...purchasedStocks, stock])
    }
  }

  function sellStock(stock){
    const sellThisStock = purchasedStocks.filter((purchased) => purchased.id !== stock.id)
    setPurchasedStocks(sellThisStock)
  }

  function handleChangeSort(e){
    setSortBy(e.target.value)
  }

  if(sortBy === "Alphabetically"){
    stocks.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })
  }
  
  if(sortBy === "Price"){
    stocks.sort(function(a, b){
        let x = a.price;
        let y = b.price;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })
  }

  function handleChangeType(e){
    if (e.target.value === "Tech"){
      let techStocks = stocks.filter((stock) => stock.type === "Tech")
      setFilterBy(techStocks)
    } else if (e.target.value === "Sportswear"){
      let sportsStocks = stocks.filter((stock) => stock.type === "Sportswear")
      setFilterBy(sportsStocks)
    } else {
      let finStocks = stocks.filter(stock => stock.type === "Finance")
      setFilterBy(finStocks)
    }
  }

 console.log(filterBy)


  return (
    <div>
      <SearchBar onHandleChangeSort={handleChangeSort} onHandleChangeType={handleChangeType}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterBy} onBuyStock={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer purchasedStocks={purchasedStocks} onSellStock={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
