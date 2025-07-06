import { useState } from 'react';
import NewsArticleForm from './Components/NewsArticleForm';
import NewsList from './Components/NewsList';
import DeleteArticle from './Components/DeleteArticle';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthor, setAuthor] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container mt-4">
      <h1>News App</h1>
      <button
        className="btn btn-success m-2"
        onClick={() => {
          if (!isLoggedIn) {
            setAuthor(true);
          } else {
            setAuthor(!isAuthor);
          }
        }}
      >
        Switch to {isAuthor ? 'Viewer' : 'Author'}
      </button>

      {/* When Author Mode */}
      {isAuthor ? (
        isLoggedIn ? (
          <>
            <NewsArticleForm setauther={setAuthor} />
            <DeleteArticle />
          </>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )
      ) : (
        <NewsList />
      )}
    </div>
  );
}

export default App;
