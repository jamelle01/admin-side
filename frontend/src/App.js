import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Add from './pages/Add';
import Navbar from './components/Navbar';
import Edit from './pages/Edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar  />

        <div className="pages">
          <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/add' element= {<Add/>}/>
            <Route path='/Edit/:id' element= {<Edit/>}/>
          </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
