import React, { useState } from 'react';
import FormComponent from './FormComponent';
import DisplayComponent from './DisplayComponent';

// Main Component Function
const MainComponent = () => {
  const [profileData, setProfileData] = useState(null);

  const handleSaveProfile = (data) => {
    setProfileData(data);
  };

  return (
    <div class="main-container">
      <h1>Record Store</h1>
      <FormComponent onSave={handleSaveProfile} />
      {profileData && <DisplayComponent profileData={profileData} />}
    </div>
  );
};

export default MainComponent;