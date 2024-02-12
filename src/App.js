import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PeoplePage from './pages/PeoplePage';
import MapPage from './pages/MapPage';
import AnimalPage from './pages/AnimalPage';
import WarehousePage from './pages/WarehousePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/people" element={<PeoplePage/>}/>
      <Route path="/map" element={<MapPage/>}/>
      <Route path="/animals" element={<AnimalPage/>}/>
      <Route path="/warehouse" element={<WarehousePage/>}/>
    </Routes>
  );
}

export default App;
