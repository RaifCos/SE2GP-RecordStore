import React from 'react';

//component for displaying saved data
//imported from FormComponent component
const DisplayComponent = ({ profileData }) => {
  return (
    <div class="profile-display">
      <p><span class="bluetext">Name:</span> {profileData.name}</p>
      <p><span class="bluetext">Email:</span> {profileData.email}</p>
      <p><span class="bluetext">Bio:</span> {profileData.bio}</p>
    </div>
  );
};

export default DisplayComponent;