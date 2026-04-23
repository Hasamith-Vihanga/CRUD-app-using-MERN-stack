import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8000/posts")
      .then(res => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingPosts
          });
        }
      })
      .catch(err => console.log(err));
  }

  // ✅ FIXED DELETE FUNCTION
  onDelete = (id) => {

    if (window.confirm("Are you sure you want to delete this post?")) {

      axios.delete(`http://localhost:8000/post/delete/${id}`)
        .then(() => {
          alert("Deleted successfully");
          this.retrievePosts(); // refresh list
        })
        .catch(err => {
          console.log(err);
          alert("Delete failed");
        });

    }
  }

  render() {
    return (
      <div className="container mt-5">

        <h3 className="text-center text-primary mb-4">All Posts</h3>

        <div className="card shadow-lg">
          <div className="card-body">

            <table className="table table-hover align-middle">

              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Topic</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {this.state.posts.map((post, index) => (
                  <tr key={post._id}>

                    <th>{index + 1}</th>

                    <td>
                      <Link 
                        to={`/post/${post._id}`} 
                        style={{ textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        {post.topic}
                      </Link>
                    </td>

                    <td>{post.description}</td>
                    <td>{post.postCategory}</td>

                    <td>
                      <Link 
                        to={`/edit/${post._id}`} 
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Link>

                      &nbsp;

                      {/* ✅ FIXED DELETE BUTTON */}
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => this.onDelete(post._id)}
                      >
                        <i className="far fa-trash-alt"></i> Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <div className="text-end mt-3">
              <Link to="/add" className="btn btn-success">
                + Create New Post
              </Link>
            </div>

          </div>
        </div>

      </div>
    );
  }
}