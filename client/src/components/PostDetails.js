import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function PostDetails() {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/post/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setPost(res.data.post);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="container mt-5 d-flex justify-content-center">

            {/* Card */}
            <div className="card shadow-lg border-0 animate-card w-75">
                
                {/* Header */}
                <div className="card-header bg-primary text-white text-center">
                    <h3 className="mb-0">Post Details</h3>
                </div>

                {/* Body */}
                <div className="card-body">

                    <h4 className="card-title text-primary mb-3 text-center">
                        {post.topic}
                    </h4>

                    <hr />

                    <div className="mb-3">
                        <strong>Description:</strong>
                        <p className="mt-2">{post.description}</p>
                    </div>

                    <div className="mb-3">
                        <strong>Category:</strong>
                        <p className="mt-2">{post.postCategory}</p>
                    </div>

                    <div className="mb-3 text-muted">
                        <strong>Post ID:</strong>
                        <p className="mt-1">{post._id}</p>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-4">
                        <Link to="/" className="btn btn-outline-primary px-4">
                            ← Back to Posts
                        </Link>
                    </div>

                </div>
            </div>

            {/* Animation */}
            <style>{`
                .animate-card {
                    animation: fadeIn 0.6s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

        </div>
    );
}