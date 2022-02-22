import { useState } from "react";
import "./converter.css";

const Converter = () => {
    const [currency1, setCurrency1] = useState("UAH");
    const [currency2, setCurrency2] = useState("UAH");
    const [amount1, setAmount1] = useState("");
    const [amount2, setAmount2] = useState("");

    // inputs
    const handler1 = async (e) => {
        setAmount1(e.target.value);
        const url = `https://api.currencylayer.com/convert?access_key=ddae669c88583b8e38ef7e1522b4335a&from=${currency1}&to=${currency2}&amount=${e.target.value}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.result) {
            setAmount1("");
            setAmount2("");
        } else {
            setAmount2(data.result.toFixed(2));
        }
    };
    const handler2 = async (e) => {
        setAmount2(e.target.value);
        const url = `https://api.currencylayer.com/convert?access_key=ddae669c88583b8e38ef7e1522b4335a&from=${currency2}&to=${currency1}&amount=${e.target.value}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.result) {
            setAmount1("");
            setAmount2("");
        } else {
            setAmount1(data.result.toFixed(2));
        }
    };

    // selects
    const handler3 = async (e) => {
        setCurrency1(e.target.value);
        const url = `https://api.currencylayer.com/convert?access_key=ddae669c88583b8e38ef7e1522b4335a&from=${e.target.value}&to=${currency2}&amount=${amount1}`;
        const response = await fetch(url);
        const data = await response.json();

        setAmount2(data.result.toFixed(2));
    };
    const handler4 = async (e) => {
        setCurrency2(e.target.value);
        const url = `https://api.currencylayer.com/convert?access_key=ddae669c88583b8e38ef7e1522b4335a&from=${currency1}&to=${e.target.value}&amount=${amount1}`;
        const response = await fetch(url);
        const data = await response.json();

        setAmount2(data.result.toFixed(2));
    };

    return (
        <div className="converter">
        <div className="converter__currency">
          <input type="text" value={amount1} placeholder="Amount" onInput={handler1} />
          <select onChange={handler3}>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="converter__currency">
          <input type="text" value={amount2} placeholder="Amount" onInput={handler2}/>
          <select onChange={handler4}>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    )
};

export default Converter;