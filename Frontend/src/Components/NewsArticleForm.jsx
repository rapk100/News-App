import React, { useState } from 'react';
import axios from 'axios';

const NewsArticleForm = ({ setauther }) => {
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		content: '',
		category: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/article', formData);
			if (res.status === 201) {
				setFormData({
					title: '',
					author: '',
					content: '',
					category: ''
				});
				alert('Article Created Successfully');
				setauther(false);
			}
		} catch (error) {
			console.log('Error:', error.response?.data || error.message);
		}
	};

	return (
		<div className="container mt-5">
			<div className="card shadow">
				<div className="card-header bg-primary text-white">
					<h2 className="mb-0">Add New Article</h2>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Title</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="form-control"
								placeholder="Enter article title"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Author</label>
							<input
								type="text"
								name="author"
								value={formData.author}
								onChange={handleChange}
								className="form-control"
								placeholder="Enter author name"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Content</label>
							<textarea
								name="content"
								value={formData.content}
								onChange={handleChange}
								className="form-control"
								rows="5"
								placeholder="Enter article content"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Category</label>
							<input
								type="text"
								name="category"
								value={formData.category}
								onChange={handleChange}
								className="form-control"
								placeholder="Enter category"
							/>
						</div>
						<button type="submit" className="btn btn-success w-100">
							Add Article
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewsArticleForm;
