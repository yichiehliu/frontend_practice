import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.jsx'
import ShopPage from './pages/shop/shop.jsx'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// const HatsPage = (props) => {
//   console.log(props.history, props.match, props.location)
//   return (
//     <div>
//       <h1>HATS PAGEhhhhh</h1>
//       <h1>HATS PAGEhhhhh</h1>
//     </div>
//   )

// };

function App() {
  return ( 
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
