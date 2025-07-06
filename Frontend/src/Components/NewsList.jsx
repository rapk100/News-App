import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NewsList.css'; // Custom styles

const NewsList = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    axios
      .get('https://news-app-api-pi.vercel.app/api/article')
      .then(res => setArticle(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 news-title">📰 Latest News Articles</h2>
      <div className="row g-4">
        {article.length > 0 ? (
          article.map((articleItem, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
              <div className="news-card">
                <div className="news-card-body">
                  <span className="category-badge">{articleItem.category}</span>
                  <h5 className="news-card-title">{articleItem.title}</h5>
                  <p className="news-card-text">{articleItem.content}</p>
                </div>
                <div className="news-card-footer">
                  <small>
                    <strong>Author:</strong> {articleItem.author}
                    <br />
                    <em>Published:</em> {new Date(articleItem.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No articles available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
