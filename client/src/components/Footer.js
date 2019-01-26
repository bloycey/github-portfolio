import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css";

const Footer = props => {
  return (
    <footer className="gp-footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              Portfolio made with
              <svg className="heart" viewBox="0 0 32 29.6">
                <path
                  d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                />
              </svg>
              by <Link to={"/"}>Github Portfolio</Link> (
              <a
                href="https://github.com/bloycey/github-portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
              )
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
