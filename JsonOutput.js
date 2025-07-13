import React from 'react';
import ReactMarkdown from 'react-markdown';

const JsonOutput = ({ data }) => {
  return (
    <div className="output-preview">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
};

export default JsonOutput;
