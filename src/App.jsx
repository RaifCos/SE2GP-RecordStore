import './App.css';
import RecordsTableComponent from './components/RecordsTableComponent';
import ArtistsTableComponent from './components/ArtistsTableComponent';
import CartsTableComponent from './components/CartsTableComponent';

function App() {
  return (
    <div className="App">
      <RecordsTableComponent />
      <ArtistsTableComponent />
      <CartsTableComponent />
    </div>
  );
}

export default App;