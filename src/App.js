import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PeoplePage from './pages/PeoplePage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/people" element={<PeoplePage/>}/>
      <Route path="/map" element={<MapPage/>}/>
    </Routes>
  );
}

export default App;
