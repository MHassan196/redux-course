import Account from './components/Account';
import Bonus from './components/Bonus';
import './App.css';
import { useState } from 'react';

function App() {

  const [account, setAccount] = useState({amount:0})
  const [points, setPoints] = useState({value:0})


  const increment = () => {
    setAccount({amount: account.amount+1});
}
const decrement = () => {
    setAccount({amount: account.amount-1});

}
const incrementByAmount = (value) => {
    setAccount({amount: account.amount+value});

}

const incrementBonus = () => {
    setPoints({value: points.value+1})
}
  return (
    <div className="App">
      <h4>App</h4>
      <h3>Current Amount : ${account.amount}</h3>
      <h3>Total Bonus : ${points.value}</h3>

      <Account increment={increment} decrement={decrement} incrementByAmount={incrementByAmount} account={account}></Account>
      <Bonus incrementBonus={incrementBonus} points={points}></Bonus>
    </div>
  );
}

export default App;
