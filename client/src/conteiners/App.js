import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Dogs from '../components/Dogs.jsx';
import DogsDetails from '../components/DogDetails.jsx'
import CreateBreed from '../components/CreateBreed.jsx';
import imgDog from '../assets/Dog3.jpg';
import AllDogs from '../components/AllDogs';
import NotFound from '../components/NotFound';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Dogs />}/>
        <Route path='/dog/details/:id' element={<DogsDetails />}/>
        <Route path='/create/breed' element={<CreateBreed />}/>
        <Route path='/dogs' element={<AllDogs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <div>
        <img className='img-dog' src={imgDog} alt='Perrito'/>
      </div>
    </div>
  );
}

export default App;
