import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Details from "./pages/Details";
function App() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <Routes>
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/products/:id" element={<MainLayout><Details /></MainLayout>} />
      </Routes>
    </div>
  )
}

export default App