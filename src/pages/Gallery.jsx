import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDatabase } from '../supabaseClient.js';

const Gallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCrewmates();
  }, []);

  const loadCrewmates = async () => {
    try {
      const data = await mockDatabase.getCrewmates();
      // Sort by creation date (most recent first)
      const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCrewmates(sortedData);
    } catch (error) {
      console.error('Error loading crewmates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        await mockDatabase.deleteCrewmate(id);
        setCrewmates(crewmates.filter(crewmate => crewmate.id !== id));
      } catch (error) {
        console.error('Error deleting crewmate:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Your Crewmate Gallery</h1>
        <p>Loading your crew...</p>
      </div>
    );
  }

  if (crewmates.length === 0) {
    return (
      <div className="page">
        <h1>Your Crewmate Gallery</h1>
        <div className="empty-state">
          <h3>No crewmates yet!</h3>
          <p>Your gallery is looking a bit empty. Time to create your first crewmate!</p>
          <Link to="/create" className="btn btn-primary">
            Create Your First Crewmate
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Crewmate Gallery</h1>
      <div className="gallery-container">
        <div className="crewmates-grid">
          {crewmates.map((crewmate) => (
            <div key={crewmate.id} className="crewmate-card">
              <Link to={`/crewmate/${crewmate.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="crewmate-name">{crewmate.name}</h3>
                <div className="crewmate-attributes">
                  <div className="attribute-item">
                    <span className="attribute-label">Speed:</span>
                    <span className="attribute-value">{crewmate.speed}</span>
                  </div>
                  <div className="attribute-item">
                    <span className="attribute-label">Color:</span>
                    <span className="attribute-value">{crewmate.color}</span>
                  </div>
                  <div className="attribute-item">
                    <span className="attribute-label">Power:</span>
                    <span className="attribute-value">{crewmate.power}</span>
                  </div>
                </div>
              </Link>
              <div className="card-actions">
                <Link to={`/edit/${crewmate.id}`} className="btn btn-secondary btn-small">
                  Edit
                </Link>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(crewmate.id);
                  }}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;