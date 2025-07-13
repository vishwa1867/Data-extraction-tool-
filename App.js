// src/App.js
import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { analyzeDocumentText } from './helpers/gptBeautifier';
import FlowDiagram from './components/FlowDiagram';

const App = () => {
  const [extractedText, setExtractedText] = useState('');
  const [markdownPreview, setMarkdownPreview] = useState('');

  const handleFileUpload = (file) => {
  

  setExtractedText(simulatedOCR.trim());
  setMarkdownPreview('');
};


  const handleBeautify = async () => {
    if (!extractedText) {
      alert('❗ Please upload a file first.');
      return;
    }

    try {
      const beautified = await analyzeDocumentText(extractedText);
      setMarkdownPreview(beautified);
    } catch (error) {
      console.error('Beautify Error:', error);
      alert('⚠️ GPT Beautify failed.');
    }
  };

  return (
    <>
      {/* 🎥 Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src="ede3bae7-05b2-48ef-8196-48f4681b5f7a.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌐 Main Content */}
      <div className="container">
        <header className="welcome">
          <h1> 🐦‍🔥 Welcome to Data Extraction AI</h1>
          <p>Your smart assistant for structured data & GPT beautification</p>
        </header>

        <section className="flowchart">
          <h2> Workflow Overview</h2>
          <FlowDiagram />
        </section>

        <section className="panel">
          <FileUpload onFileUpload={handleFileUpload} />

          <button className="beautify-btn" onClick={handleBeautify}>
            ✨ Analyze & Beautify with GPT
          </button>

          {extractedText && (
            <div>
              <h3>📤 Extracted Text (Simulated OCR)</h3>
              <pre className="json-box">{extractedText}</pre>
            </div>
          )}

          {markdownPreview && (
            <div>
              <h3>📄 GPT Beautified Markdown Output</h3>
              <div className="preview-box">{markdownPreview}</div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default App;
