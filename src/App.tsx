import Router from './router/Router';
import { Footer, Header } from './view/layouts';
import useStart from './start/useStart';

function App() {
  useStart();

  return (
    <div className="im-app">
      <div className="im-app-content" id="im-app-content">
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
