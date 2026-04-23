import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: "",
            description: "",
            postCategory: ""
        };
    }


    // Handle input changes
    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    };


    // Handle form submit
    onSubmit = (e) => {
        e.preventDefault();

        const { topic, description, postCategory } = this.state;

        const data = {
            topic:topic,
            description:description,
            postCategory:postCategory
        };

        axios.post("http://localhost:8000/post/save", data).then((res) => {
            if (res.data.success) {
                alert("Post Created Successfully!");
                this.setState({
                    topic: "",
                    description: "",
                    postCategory: ""
                });
            }
        });
    };

    render() {
        return (
            <div className="container mt-5 d-flex justify-content-center">

                <div className="card shadow-lg border-0 animate-card w-75">

                    {/* Header */}
                    <div className="card-header bg-primary text-white text-center">
                        <h3>Create New Post</h3>
                    </div>

                    {/* Form */}
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>

                            {/* Topic */}
                            <div className="mb-3">
                                <label className="form-label">Topic</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="topic"
                                    placeholder="Enter topic"
                                    value={this.state.topic}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                             {/*Description */}
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter description"
                                    rows="3"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                ></textarea>
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <label className="form-label">Post Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="postCategory"
                                    placeholder="Enter category"
                                    value={this.state.postCategory}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            {/* Button */}
                            <div className="text-center">
                                <button type="submit" className="btn btn-success px-4" onclick={this.onSubmit}>
                                    <i className="far fa-check-square"></i>
                                    &nbsp; Save
                                </button>
                            </div>

                        </form>
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
}