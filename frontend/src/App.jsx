import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import ProductsPage from './pages/ProductsPage';
import Shop from './components/Shop';
import Contacts from './components/Contacts';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Comparision from './components/Comparision';
import About from './components/About';
import CartSidebar from './components/CartSidebar';

// Layout component that includes Header and Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Landing />
            </Layout>
          } />
          <Route path="/products" element={
            <Layout>
              <ProductsPage />
            </Layout>
          } />
          <Route path="/shop" element={
            <Layout>
              <Shop />
            </Layout>
          } />
        <Route path="/contact" element={
          <Layout>
            <Contacts />
          </Layout>
        } />
        <Route path="/cart" element={
          <Layout>
            <Cart />
          </Layout>
        } />
        <Route path="/checkout" element={
          <Layout>
            <Checkout />
          </Layout>
        } />
        <Route path="/comparison" element={
          <Layout>
            <Comparision />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        </Routes>
        <CartSidebar />
      </Router>
    </CartProvider>
  );
};

export default App;
