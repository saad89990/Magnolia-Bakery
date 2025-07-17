import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/signup.js';
import { CartProvider } from './components/contextreducer.js';
import Cart from './screens/Cart.js';
import EditProfile from './components/Editprofile.js';
import FAQ from './screens/FAQ.js';
import Privacy from './screens/Privacy.js';
import Terms from './screens/Terms.js';
import Cakes from './screens/Cakes.js';
import About from './screens/About.js';
import Contact from './screens/Contact.js';
import Navbar from './components/Navbar.js';
import Testimonial from './screens/Testimonials.js';
import ProtectedRoute from './protectedRoutes.js';
import MyOrders from './screens/MyOrders.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            {/* Protected Routes */}

            <Route
             exact path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} 
            />
            
            <Route
             exact path='/profile/edit' element={
              <ProtectedRoute><EditProfile /> </ProtectedRoute> }
            />

            <Route 
            exact path='/myorders' element={
              <ProtectedRoute><MyOrders /></ProtectedRoute> 
            }/>

            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonial" element={<Testimonial />} />



          </Routes>
        </div>
        
      </Router>
    </CartProvider>
  );
}

export default App;
