import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockDatabase } from '../supabaseClient.js';

const UpdateCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    power: ''
  });
  const [loading, setLoading] = useState(true);

  const speedOptions = ['Slow', 'Normal', 'Fast', 'Super Fast'];
  const colorOptions = ['Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown'];
  const powerOptions = ['Teleportation', 'Invisibility', 'Super Strength', 'Flying', 'Telepathy', 'Time Control', 'Shapeshifting', 'Fire Control', 'Ice Control', 'Lightning'];

  useEffect(() => {
    loadCrewmate();
  }, [id]);

  const loadCrewmate = async () => {
    try {
      const crewmate = await mockDatabase.getCrewmate(id);
      if (!crewmate) {
        navigate('/gallery');
        return;
      }
      setFormData({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
        power: crewmate.power
      });
    } catch (error) {
      console.error('Error loading crewmate:', error);
      navigate('/gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAttributeSelect = (attribute, value) => {
    setFormData({
      ...formData,
      [attribute]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.speed || !formData.color || !formData.power) {
      alert('Please fill in all fields and select all attributes!');
      return;
    }

    try {
      await mockDatabase.updateCrewmate(id, formData);
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error('Error updating crewmate:', error);
      alert('Error updating crewmate. Please try again.');
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

  return (
    <div className="page">
      <div className="details-header">
        <h1>Update Crewmate</h1>
        <Link to={`/crewmate/${id}`} className="btn btn-secondary">
          ← Back to Details
        </Link>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter crewmate name"
              required
            />
          </div>

          <div className="attributes-section">
            <div className="attribute-group">
              <label>Speed:</label>
              <div className="attribute-options">
                {speedOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`attribute-option ${formData.speed === option ? 'selected' : ''}`}
                    onClick={() => handleAttributeSelect('speed', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="attribute-group">
              <label>Color:</label>
              <div className="attribute-options">
                {colorOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`attribute-option ${formData.color === option ? 'selected' : ''}`}
                    onClick={() => handleAttributeSelect('color', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="attribute-group">
              <label>Special Power:</label>
              <div className="attribute-options">
                {powerOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`attribute-option ${formData.power === option ? 'selected' : ''}`}
                    onClick={() => handleAttributeSelect('power', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button type="submit" className="btn btn-primary">
              Update Crewmate
            </button>
            <button 
              type="button" 
              onClick={handleDelete} 
              className="btn btn-danger"
            >
              Delete Crewmate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCrewmate;