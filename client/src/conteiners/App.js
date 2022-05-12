import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Dogs from '../components/Dogs.jsx';
import DogsDetails from '../components/DogDetails.jsx'
import CreateBreed from '../components/CreateBreed.jsx';
import imgDog from '../assets/Dog3.jpg';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Dogs />}/>
        <Route path='/dog/details/:id' element={<DogsDetails />}/>
        <Route path='/create/breed' element={<CreateBreed />}/>
      </Routes>
      <div>
        <img className='img-dog' src={imgDog} alt='Perrito'/>
      </div>
    </div>
  );
}

export default App;
