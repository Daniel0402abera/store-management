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
import PrivateRoutes from "./services/privateRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard/store" element={<StorePage />} />
                  <Route path="/dashboard/item" element={<ItemPage />} />
                  <Route
                    path="/dashboard/inventory"
                    element={<InventoryPage />}
                  />
                  <Route
                    path="/dashboard/purchase"
                    element={<PurchasePage />}
                  />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
