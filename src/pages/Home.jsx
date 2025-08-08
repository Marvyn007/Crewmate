import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page">
      <div className="home-content">
        <h1>Welcome to Crewmate Creator!</h1>
        <p className="home-description">
          Here you can create your very own set of crewmates, each with their own unique 
          personality and attributes. Build your dream team of space explorers, each with 
          customizable traits that make them special. From speed and color to special 
          abilities - the possibilities are endless!
        </p>
        <div className="cta-buttons">
          <Link to="/create" className="btn btn-primary">
            Create a Crewmate
          </Link>
          <Link to="/gallery" className="btn btn-secondary">
            View Your Crew
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;