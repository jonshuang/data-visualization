import './App.css';
import Page from './Page';
import { FilterProvider } from './Context';

function App() {
  return (
    <FilterProvider>
      <Page />
    </FilterProvider>
  );
}

export default App;
