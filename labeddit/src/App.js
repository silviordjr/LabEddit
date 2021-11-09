import GlobalState from "./context/GlobalState";
import RouterPages from "./route/RouterPages";
import GlobalStyle from "./theme/GlobalStyle";
import Footer from '../src/components/Footer'

function App() {
  return (
    <div>
      <GlobalState>
      <GlobalStyle />
      <RouterPages/>
      <Footer />
      </GlobalState>
    </div>
  );
}

export default App;
