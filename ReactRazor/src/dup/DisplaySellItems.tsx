import { useState, useEffect } from "react";
import MarketOrder from "../components/MarketOrder";

// a function to display the sell items with error handling
export default function DisplaySellItems() {
  const [error, setError] = useState(null as any | null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://dealerdevnet.lyra.live/api/dealer/Orders")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Got orders result", result);
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Error loading orders!", error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {items.map((blk) => (
          <MarketOrder
            key={(blk as any).AccountID}
            orderId={(blk as any).AccountID}
            sellerName={(blk as any).UserName}
            offering={(blk as any).Order.offering}
            biding={(blk as any).Order.biding}
            sellerRatings={
              Math.round(((blk as any).Finished / (blk as any).Total) * 100) +
              "%"
            }
            lastUpdated={(blk as any).TimeStamp}
            orderStatus={(blk as any).UOStatus}
            price={(blk as any).Order.price}
            amount={(blk as any).Order.amount}
            limitMin={(blk as any).Order.limitMin}
            limitMax={(blk as any).Order.limitMax}
            daoName="The First DAO"
            sellerTrades={(blk as any).Total + " Trades"}
            offeringIcon="../asserts/icbaselinegeneratingtokens.svg"
            bidingIcon="../asserts/carbonuserservicedesk.svg"
          />
        ))}
      </>
    );
  }
}
