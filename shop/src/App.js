import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRouter from './components/Router/PrivateRouter';
import ForgetPassword from './pages/Auth/ForgetPassword';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Dashboard' element={<PrivateRouter />}>
          <Route path='user' element={<UserDashboard />} />
          <Route path='admin' element={<AdminDashboard />} />
        </Route>
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Policy' element={<Policy />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
