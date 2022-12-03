import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Add from "./pages/Add";
import Navbar from "./components/Navbar";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { admin } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div id='bluebg'></div>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={admin ? <Home /> : <Navigate to='/login' />}
            />
            <Route
              path='/add'
              element={admin ? <Add /> : <Navigate to='/login' />}
            />
            <Route
              path='/Edit/:id'
              element={admin ? <Edit /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!admin ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!admin ? <Signup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
