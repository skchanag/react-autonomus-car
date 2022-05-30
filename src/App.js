import { React } from 'react';
import Panel from './components/Panel';
import Result from './components/Result';

function App() {
  return (
    <div className="container">
      <h1>Autonomous Car</h1>
      <Result />
      <Panel />
    </div>
  );
}

export default App;
