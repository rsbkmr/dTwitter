import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { Web3Provider } from "./contexts/web3";

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <Navbar />
        <Main />
      </div>
    </Web3Provider>
  );
}

export default App;
