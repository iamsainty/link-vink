import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ErrorNavbar from "./ErrorNavbar";
import { Helmet } from "react-helmet-async";
import defaulimage from "../../media/Link-Vink-share.png";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #343a40;
`;

const NotFoundMessage = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #6c757d;
`;

const StyledButton = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
`;
function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title>404 Not Found - Link Vink</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="404 Not Found - Link Vink" />
        <meta
          name="description"
          content="Sorry, the page you're looking for cannot be found. Return to the homepage and explore other content on Link Vink."
        />
        <meta name="keywords" content="404, Not Found, Link Vink, Error Page" />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://link-vink.vercel.app" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://link-vink.vercel.app" />
        <meta property="og:title" content="404 Not Found - Link Vink" />
        <meta
          property="og:description"
          content="Sorry, the page you're looking for cannot be found. Return to the homepage and explore other content on Link Vink."
        />
        <meta property="og:image" content={defaulimage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://link-vink.vercel.app" />
        <meta property="twitter:title" content="404 Not Found - Link Vink" />
        <meta
          property="twitter:description"
          content="Sorry, the page you're looking for cannot be found. Return to the homepage and explore other content on Link Vink."
        />
        <meta property="twitter:image" content={defaulimage} />
      </Helmet>

      <ErrorNavbar />
      <NotFoundContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundMessage>
          Oops! The page you're looking for doesn't exist. <br />
          But don't worry, you can find plenty of other things on our homepage.
        </NotFoundMessage>
        <StyledButton className="btn btn-outline-dark" onClick={goHome}>
          Go Home
        </StyledButton>
      </NotFoundContainer>
    </>
  );
}

export default ErrorPage;
