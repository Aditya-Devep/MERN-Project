import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Details from './components/Details';
import Cart from './components/Cart';

const App = () => {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={< Home />} />

          <Route path='/products' element={< Products />} />

          <Route path='/details/:id' element={< Details />} />

          <Route path='/addtocart' element={< Cart />} />

          {/* Fallback Routing  */}

          <Route path='*' element={<Home />} />

        </Routes>

      </Router>

    </>
  )
}

export default App
