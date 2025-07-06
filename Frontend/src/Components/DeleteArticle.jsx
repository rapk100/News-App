import axios from "axios";
import { useEffect, useState } from "react";

const DeleteArticle = () => {
  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get("https://news-app-api-pi.vercel.app/api/article")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [deleted]);

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`https://news-app-api-pi.vercel.app/api/article/${articleId}`);
      alert("Article deleted");
      setDeleted(!deleted);
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article");
    }
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article._id);
    setEditFormData({
      title: article.title,
      category: article.category,
      author: article.author,
      content: article.content || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://news-app-api-pi.vercel.app/api/article/${editingArticleId}`, editFormData);
      alert("Article updated successfully");
      setEditingArticleId(null);
      setDeleted(!deleted); // Refresh the articles list
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article");
    }
  };

  const handleCancelEdit = () => {
    setEditingArticleId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Articles</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) =>
                editingArticleId === article._id ? (
                  <tr key={article._id}>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author"
                        value={editFormData.author}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleUpdateSubmit}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={article._id}>
                    <td>{article.title}</td>
                    <td>{article.category}</td>
                    <td>{article.author}</td>
                    <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(article._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditClick(article)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No articles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteArticle;
