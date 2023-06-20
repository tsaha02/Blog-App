import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Carousel,
} from "react-bootstrap";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const response = await fetch("https://dev.to/api/articles?per_page=10");
      const data = await response.json();

      if (response.ok) {
        if (data.length > 0) {
          setLatestBlogs(data);
          setError("");
        } else {
          setLatestBlogs([]);
          setError("No latest blogs found.");
        }
      } else {
        setError("Error occurred while fetching latest blogs.");
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching latest blogs.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://dev.to/api/articles?q=${searchQuery}&per_page=10`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.length > 0) {
          setSearchResults(data);
          setError("");
        } else {
          setSearchResults([]);
          setError("No results found.");
        }
      } else {
        setError("Error occurred while fetching search results.");
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching search results.");
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="home-page">
      <Container>
        <h1 className="text-center mt-4 pt-4">Welcome to My Blog</h1>

        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {error && <p className="text-danger mt-3">{error}</p>}

        <Row className="mt-4">
          <Col>
            <h2>Latest Blogs</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          <Carousel indicators={false} pause="hover" interval={1000}>
            {latestBlogs.map((blog, index) => {
              if (index % 6 === 0) {
                const endIndex = index + 6;
                const blogsToDisplay = latestBlogs.slice(index, endIndex);

                return (
                  <Carousel.Item key={index}>
                    <Row>
                      {blogsToDisplay.map((blogItem) => (
                        <Col key={blogItem.id} md={2} className="mb-4">
                          <Card style={{ width: "100%", height: "100%" }}>
                            <Card.Img
                              variant="top"
                              src={blogItem.cover_image}
                            />
                            <Card.Body>
                              <Card.Title style={{ fontSize: "15px" }}>
                                {blogItem.title}
                              </Card.Title>
                              <Button
                                variant="primary"
                                href={blogItem.url}
                                target="_blank"
                              >
                                Read More
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                );
              }
              return null;
            })}
          </Carousel>
        </Row>

        <Row className="mt-4">
          <Col>
            <h2>Search Results</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          {searchResults.map((result) => (
            <Col key={result.id} md={2} className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={result.cover_image} />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Button variant="primary" href={result.url} target="_blank">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
