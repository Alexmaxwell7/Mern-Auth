import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import MovieDetail from './components/Movie/MovieDetail/MovieDetail'
import MovieListing from './components/Movie/MovieListing/MovieListing';
import Home from './components/Movie/Home/Home';

function App() {
  return (
    <>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={ <Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movieDashboard"  element={<Home/>} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
          </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
