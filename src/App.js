import "./App.css";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StorePage from "./pages/Store";
import ItemPage from "./pages/ItemPage";
import InventoryPage from "./pages/InventoryPage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./components/authentication/LoginPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/" element={<Dashboard />}>
                <Route path="/store" element={<StorePage />} />
                <Route path="/item" element={<ItemPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/purchase" element={<PurchasePage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
