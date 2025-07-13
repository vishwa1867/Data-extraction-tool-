// src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileUpload;
