import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Routes, Route, BrowserRouter as Router,} from 'react-router-dom'
import AddWord from "./containers/addWord/addWord";
import WordList from "./containers/wordList/wordList";
import LearnWords from "./containers/learnWords/learnWords";
import ThemesList from "./containers/themesList/themesList";
function App() {
   let addRouters =(
      <Routes>
          <Route path="/" element={<h1>1</h1>} />
          <Route path="/add-word" element={<AddWord/>} />
          <Route path="/learn-words" element={<LearnWords/>} />
          <Route path="/words-list" element={<WordList/>} />
          <Route path="/themes-list" element={<ThemesList/>} />
      </Routes>
  );

  return (
      <Router>
          <Layout>
              {addRouters}
          </Layout>
      </Router>
  );
}

export default App;
