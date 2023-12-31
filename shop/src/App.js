import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminPrivateRouter from './components/Router/AdminPrivateRouter';
import UserPrivateRouter from './components/Router/UserPrivateRouter';
import ForgetPassword from './pages/Auth/ForgetPassword';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import Order from './pages/Admin/Order';
import Products from './pages/Admin/Products';
import CreateProduct from './pages/Admin/CreateProduct';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import ProductEdit from './pages/Admin/ProductEdit';
import ProductDetails from './pages/ProductDetails';
import CategorysProduct from './pages/CategorysProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Category/:id' element={<CategorysProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/Dashboard/Admin' element={<AdminPrivateRouter />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='CreateCategory' element={<CreateCategory />} />
          <Route path='CreateProduct' element={<CreateProduct />} />
          <Route path='Products' element={<Products />} />
          {/* <Route path='Products/:id' element={<ProductEdit />} /> */}
          <Route path='Product/:id' element={<ProductEdit />} />
          <Route path='Orders' element={<Order />} />
        </Route>
        <Route path='/Dashboard/User' element={<UserPrivateRouter />}>
          <Route path='' element={<UserDashboard />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='Orders' element={<Orders />} />
        </Route>
        <Route path='/product/details/:id' element={<ProductDetails />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
