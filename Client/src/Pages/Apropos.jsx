import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import images
import myPhoto from "./Apropos_Images/myPhoto.jpg";
import Friend1Photo from "./Apropos_Images/Friend1Photo.jpg";
import Freind2Photo from "./Apropos_Images/Freind2Photo.jpg";
import Friend3Photo from "./Apropos_Images/Friend3Photo.jpeg";
import React from "./Apropos_Images/React.png";
import FireBase from "./Apropos_Images/FireBase.png";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: black;
  color: #fff;
  min-height: 100vh;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 250px;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 90%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  padding: 1rem;
  text-align: center;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CommentSection = styled.div`
  width: 100%;
  max-width: 800px;
  color: #fff;
  margin-bottom: 2rem;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
  margin-bottom: 1rem;

  &::placeholder {
    color: #aaa;
  }
`;

const CommentButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const RateUsContainer = styled.div`
  margin-bottom: 2rem;
  color: #fff;
`;

const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Star = styled.span`
  font-size: 2rem;
  color: ${({ filled }) => (filled ? 'gold' : '#ccc')};
  cursor: pointer;
`;

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const TechnologyImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 1rem;
`;

const Apropos = () => {
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments);
    }, []);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleCommentSubmit = (comment) => {
        setComments([...comments, comment]);
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    return (
        <Container>
            <h1>A propos</h1>
            <CardsContainer>
                <Card>
                    <CardImage src={myPhoto} alt="My Photo"/>
                    <CardOverlay>
                        <p>Matallah Abdessamed</p>
                        <p>He was the responsible of the Admin Interface of this web app</p>
                    </CardOverlay>
                </Card>
                <Card>
                    <CardImage src={Friend1Photo} alt="Friend 1 Photo"/>
                    <CardOverlay>
                        <p>Mous Mohamed</p>
                        <p>Did a part of the Client interface and has designed the logo and other stuffs</p>
                    </CardOverlay>
                </Card>
                <Card>
                    <CardImage src={Freind2Photo} alt="Friend 2 Photo"/>
                    <CardOverlay>
                        <p>Morouche Mohammed</p>
                        <p>He did the other part of the Client interface and other backend features</p>
                    </CardOverlay>
                </Card>
                <Card>
                    <CardImage src={Friend3Photo} alt="Friend 3 Photo"/>
                    <CardOverlay>
                        <p>Ougherb Mohammed</p>
                        <p>Was the responsible of the report and the presentation of our web app and he also contributed
                            in the admin interface</p>
                    </CardOverlay>
                </Card>
            </CardsContainer>
            <RateUsContainer>
                <h2>Rate Us</h2>
                <RatingStars>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            filled={value <= rating}
                            onClick={() => handleRatingClick(value)}
                        >
                            &#9733;
                        </Star>
                    ))}
                </RatingStars>
            </RateUsContainer>
            <CommentSection>
                <h2>Comment Section</h2>
                {comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
                ))}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(e.target.comment.value);
                    e.target.comment.value = '';
                }}>
                    <CommentInput type="text" name="comment" placeholder="Enter your comment"/>
                    <CommentButton className = "button-ani" type="submit">Submit</CommentButton>
                </form>
            </CommentSection>
            <h2>Technologies Used</h2>
            <TechnologiesContainer>;
                <TechnologyImage src={React} alt="React"></TechnologyImage>
                <TechnologyImage src={FireBase} alt="FireBase"></TechnologyImage>
            </TechnologiesContainer>
            <p>This web app is built using React, styled-components, and other technologies.</p>
        </Container>
    );
};

export default Apropos;