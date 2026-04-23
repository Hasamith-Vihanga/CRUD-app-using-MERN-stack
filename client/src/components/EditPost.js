import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost() {

    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [postCategory, setPostCategory] = useState("");

    const { id } = useParams(); //get post id
    const navigate = useNavigate();

    //Load existing data
    useEffect(() => {

        console.log("ID:", id); 

        axios.get(`http://localhost:8000/post/${id}`)
            .then((res) => {
                console.log("Response:", res.data); 

                if (res.data.success) {
                    setTopic(res.data.post.topic);
                    setDescription(res.data.post.description);
                    setPostCategory(res.data.post.postCategory);
                }
            })
            .catch(err => console.log(err));

    }, [id]);

    // Update post
    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            topic,
            description,
            postCategory
        };

        axios.put(`http://localhost:8000/post/update/${id}`, data)
            .then((res) => {
                console.log(res.data);

                alert("Post updated successfully!");

                // redirect after update
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">

            <div className="card shadow-lg border-0 w-75 animate-card">

                <div className="card-header bg-primary text-white text-center">
                    <h3>Edit Post</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={onSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Post Category</label>
                            <input
                                type="text"
                                className="form-control"
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success px-4">
                                Update
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <style>{`
                .animate-card {
                    animation: fadeIn 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </div>
    );
}