import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StorePage from './pages/Store';
import ItemPage from './pages/ItemPage';
import InventoryPage from './pages/InventoryPage';
import PurchasePage from './pages/PurchasePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard />}>
      <Route index element={<Dashboard/>}/>
      <Route path='/store' element={<StorePage/>}/>
      <Route path='/item' element={<ItemPage/>}/>
      <Route path='/inventory' element={<InventoryPage/>}/>
      <Route path='/purchase' element={<PurchasePage/>}/>
      </Route>
      
      

      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
