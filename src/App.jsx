import './App.css';
import RecordsTableComponent from './RecordsTableComponent';
import ArtistsTableComponent from './ArtistsTableComponent';
import CartsTableComponent from './CartsTableComponent';

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
