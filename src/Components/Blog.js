import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.to/api/articles?per_page=10"
        );
        setArticles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVisibleArticles(articles.slice(0, 10));
  }, [articles]);

  const handleReadMore = (index) => {
    setExpandedArticle(index);
  };

  const handleCollapse = () => {
    setExpandedArticle(null);
  };

  const handleImageError = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].cover_image = "";
    setArticles(updatedArticles);
  };

  return (
    <Container className="blog-container">
      <h1 className="blog-title">Blogs</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {visibleArticles.map((article, index) => (
          <Col key={article.id}>
            <Card className="blog-card">
              {article.cover_image && (
                <Card.Img
                  variant="top"
                  src={article.cover_image}
                  alt="Blog Thumbnail"
                  onError={() => handleImageError(index)}
                  className="blog-image"
                />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                {expandedArticle === index ? (
                  <>
                    <Card.Text>{article.body_markdown}</Card.Text>
                    {article.user && <p>Author: {article.user.name}</p>}
                    {article.organization && (
                      <p>Publication: {article.organization.name}</p>
                    )}
                    <Button
                      variant="secondary"
                      onClick={handleCollapse}
                      className="blog-button"
                    >
                      Collapse
                    </Button>
                    <Button
                      variant="primary"
                      href={article.url}
                      target="_blank"
                      className="blog-button"
                      style={{ marginLeft: "5px" }}
                    >
                      Open in New Tab
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleReadMore(index)}
                    className="blog-button"
                  >
                    Read More
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
