import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDatabase } from '../supabaseClient.js';

const CreateCrewmate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    power: ''
  });

  const speedOptions = ['Slow', 'Normal', 'Fast', 'Super Fast'];
  const colorOptions = ['Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown'];
  const powerOptions = ['Teleportation', 'Invisibility', 'Super Strength', 'Flying', 'Telepathy', 'Time Control', 'Shapeshifting', 'Fire Control', 'Ice Control', 'Lightning'];

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
      await mockDatabase.addCrewmate(formData);
      navigate('/gallery');
    } catch (error) {
      console.error('Error creating crewmate:', error);
      alert('Error creating crewmate. Please try again.');
    }
  };

  return (
    <div className="page">
      <h1>Create a New Crewmate</h1>
      
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

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create Crewmate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCrewmate;