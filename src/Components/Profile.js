import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { auth, database } from "../firebase/firebase";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [postedBlogs, setPostedBlogs] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userSnapshot = await database
            .ref("users/" + user.uid)
            .once("value");
          const userData = userSnapshot.val();
          setUserDetails(userData);
        } catch (error) {
          console.log("Error fetching user details:", error);
        }
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    const getPostedBlogs = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const blogsSnapshot = await database
            .ref("blogs")
            .orderByChild("userId")
            .equalTo(user.uid)
            .once("value");
          const blogsData = blogsSnapshot.val();
          const blogsArray = blogsData ? Object.values(blogsData) : [];
          setPostedBlogs(blogsArray);
        } catch (error) {
          console.log("Error fetching posted blogs:", error);
        }
      }
    };

    getPostedBlogs();
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setName(userDetails.name);
    setAge(userDetails.age);
    setAddress(userDetails.address);
  };

  const handleSave = () => {
    const user = auth.currentUser;

    if (user) {
      const userRef = database.ref("users/" + user.uid);
      userRef.update({
        name,
        age,
        address,
      });
      setUserDetails({
        ...userDetails,
        name,
        age,
        address,
      });
      setEditing(false);
    }
  };

  const handleCreateBlog = () => {
    const user = auth.currentUser;

    if (user) {
      const blogRef = database.ref("blogs").push();
      const newBlog = {
        id: blogRef.key,
        userId: user.uid,
        title: blogTitle,
        content: blogContent,
      };
      blogRef.set(newBlog);
      setPostedBlogs([...postedBlogs, newBlog]);
      setBlogTitle("");
      setBlogContent("");
    }
  };

  const handleEditBlog = (blogId) => {
    const editedBlog = postedBlogs.find((blog) => blog.id === blogId);

    if (editedBlog) {
      setBlogTitle(editedBlog.title);
      setBlogContent(editedBlog.content);

      const updatedBlogs = postedBlogs.filter((blog) => blog.id !== blogId);
      setPostedBlogs(updatedBlogs);
    }
  };

  const handleDeleteBlog = (blogId) => {
    database.ref("blogs/" + blogId).remove();

    const updatedBlogs = postedBlogs.filter((blog) => blog.id !== blogId);
    setPostedBlogs(updatedBlogs);
  };

  return (
    <Container className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {userDetails && (
        <div className="profile-content">
          <div className="profile-details-section">
            <h3 className="profile-details-heading">
              Welcome, {userDetails.email}
            </h3>
            {editing ? (
              <Form className="profile-form">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </Form>
            ) : (
              <div className="profile-details">
                <p>Name: {userDetails.name}</p>
                <p>Age: {userDetails.age}</p>
                <p>Address: {userDetails.address}</p>
                <Button
                  variant="secondary"
                  className="profile-edit-button"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>

          <div className="create-blog-section">
            <h3 className="create-blog-heading">Create a New Blog</h3>
            <Form className="blog-form">
              <Form.Group controlId="blogTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="blogContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleCreateBlog}
                style={{ marginTop: "10px" }}
              >
                Post Blog
              </Button>
            </Form>
          </div>

          <div className="posted-blogs-section">
            <h3 className="posted-blogs-heading" style={{ marginTop: "10px" }}>
              Posted Blogs
            </h3>
            {postedBlogs.map((blog) => (
              <Card key={blog.id} className="posted-blog-card">
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                  <Button
                    variant="info"
                    onClick={() => handleEditBlog(blog.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Profile;
