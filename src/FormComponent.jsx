import React, { useState } from 'react';

// component used for saving inputted data and passing  it to DisplayComponent
const FormComponent = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label class="formtext">Name: </label>
          <input
            class="formbox"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label class="formtext">Email:</label>
          <input
            class="formbox"
            type="email"
            name="email"
            value={formData.email} //makes sure only valid emails with an @ can be entered
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label class="formtext">Bio:</label>
          <textarea
            class="formbox"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
            required
          />
        </div>

        <button type="submit" class="submit-button">Save Profile</button>
      </form>
    </div>
  );
};

export default FormComponent;
