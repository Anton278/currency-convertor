import { useEffect, useState } from "react";
import Converter from "./components/converter";
import "./App.css";

function App() {
  const [rate, setRate] = useState(null);

  const getRate = async () => {
    const url1 = "https://api.currencylayer.com/live?access_key=ddae669c88583b8e38ef7e1522b4335a&source=USD&currencies=UAH";
    const url2 = "https://api.currencylayer.com/live?access_key=ddae669c88583b8e38ef7e1522b4335a&source=EUR&currencies=UAH";

    const response1 = await fetch(url1);
    const data1 = await response1.json();

    const response2 = await fetch(url2);
    const data2 = await response2.json();


    setRate({
      USDUAH: data1.quotes.USDUAH,
      EURUAH: data2.quotes.EURUAH
    });
  };

  useEffect(() => {
    getRate();
  }, []);

  return (
    rate &&
    <>
      <div className="title">Current exchange rate:</div>
      <div className="usd-rate">USD: {rate.USDUAH}</div>
      <div className="euro-rate">EURO: {rate.EURUAH}</div>
      <div className="title">Currency converter:</div>
      <Converter />
    </>
  );
}

export default App;
