import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRouter from './components/Router/PrivateRouter';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Dashboard' element={<PrivateRouter />}>
          <Route path='' element={<About />} />
        </Route>
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Policy' element={<Policy />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
