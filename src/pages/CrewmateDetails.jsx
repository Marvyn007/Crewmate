import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDatabase } from '../supabaseClient.js';

const CrewmateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCrewmate();
  }, [id]);

  const loadCrewmate = async () => {
    try {
      const data = await mockDatabase.getCrewmate(id);
      if (!data) {
        navigate('/gallery');
        return;
      }
      setCrewmate(data);
    } catch (error) {
      console.error('Error loading crewmate:', error);
      navigate('/gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        await mockDatabase.deleteCrewmate(id);
        navigate('/gallery');
      } catch (error) {
        console.error('Error deleting crewmate:', error);
        alert('Error deleting crewmate. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!crewmate) {
    return (
      <div className="page">
        <h1>Crewmate not found</h1>
        <Link to="/gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="page">
      <div className="details-header">
        <h1>Crewmate Details</h1>
        <Link to="/gallery" className="btn btn-secondary">
          ← Back to Gallery
        </Link>
      </div>

      <div className="details-content">
        <h2>{crewmate.name}</h2>
        
        <div className="attributes-grid">
          <div className="attribute-item">
            <span className="attribute-label">Speed:</span>
            <span className="attribute-value">{crewmate.speed}</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">Color:</span>
            <span className="attribute-value">{crewmate.color}</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">Special Power:</span>
            <span className="attribute-value">{crewmate.power}</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">Created:</span>
            <span className="attribute-value">{formatDate(crewmate.created_at)}</span>
          </div>
        </div>

        <div className="crewmate-description">
          <h3>About this Crewmate:</h3>
          <p>
            {crewmate.name} is a {crewmate.color.toLowerCase()} crewmate with {crewmate.speed.toLowerCase()} speed 
            and the incredible power of {crewmate.power.toLowerCase()}. This makes them a valuable 
            member of any space crew, ready to take on the challenges of interstellar exploration!
          </p>
        </div>
      </div>

      <div className="action-buttons">
        <Link to={`/edit/${crewmate.id}`} className="btn btn-primary">
          Edit Crewmate
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Crewmate
        </button>
      </div>
    </div>
  );
};

export default CrewmateDetails;