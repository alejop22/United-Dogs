import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Dogs from '../components/Dogs.jsx';
import DogsDetails from '../components/DogDetails.jsx'
import CreateBreed from '../components/CreateBreed.jsx';
import AllDogs from '../components/AllDogs';
import NotFound from '../components/NotFound';
import Main from '../components/Main';
import Footer from '../components/Footer';

function App() {

  return (
    <div className="App">
      <NavBar />
      <p>apalacio</p>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/home' element={<AllDogs />}/>
        <Route path='/dog/details/:id' element={<DogsDetails />}/>
        <Route path='/create/breed' element={<CreateBreed />}/>
        <Route path='/dogs' element={<Dogs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
