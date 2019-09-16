import React from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
          <Route path="/"
                 render={(props) => <Header {...props}
                 />
                 }
          />
          <Route path="/"
                 render={(props) => <Home {...props}
                 />
                 }
          />
          <Route path="/"
                 render={(props) => <Footer {...props}
                 />
                 }
          />
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
