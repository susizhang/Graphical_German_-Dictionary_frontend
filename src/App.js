import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./config";
import Introduction from "./components/Introduction";

function App() {
  const [searchedWord, setSearchedWord] = useState({});
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${baseUrl}/:${input}`).then(({ data }) => {
      setSearchedWord(data);
      //   console.log(searchedWord);
      navigate(`/searchResult/${input}`);
      setInput("");
    });
  };

  if (!searchedWord) return "Loading";

  return (
    <div>
      <nav className="bg-slate-200 flex  px-8 gap-8 justify-between grid grid-cols-8">
        <div className="col-span-1">
          <Link to="/">
            <img src="" alt="logo" />
          </Link>
        </div>
        <div className="border-b-2 col-span-5">
          <form onSubmit={handleSubmit}>
            <input
              className="w-10/12"
              type="text"
              placeholder="Schreiben Sie das gesuchte Wort auf"
              value={input}
              onChange={(x) => setInput(x.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              Suchen
            </button>
          </form>
        </div>
        <div className="col-span-2 flex gap-8">
          <Link to="/wordbook">Mein Wörterbuch</Link>
          <Link>theme</Link>
        </div>
      </nav>

      <Routes>
        <Route path="introduction" element={<Introduction />} />
        <Route path="/" element={<Home />} />
        <Route path="/wordbook" element={<Home />} />
        <Route path="/login" />
        <Route path="/signup" />

        <Route
          path="/searchResult/:input"
          element={<SearchResult searchedWord={searchedWord} />}
        />
      </Routes>
    </div>
  );
}

export default App;
