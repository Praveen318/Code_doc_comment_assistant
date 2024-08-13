import React, { useState } from "react";
import axios from "axios";

const DocumentationAssistant = () => {
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");

  const handleGenerateDocs = async () => {
    try {
      const response = await axios.post("https://a0e8-115-117-121-194.ngrok-free.app/generate_docs", { code });
      setDocumentation(response.data.documentation);
    } catch (error) {
      console.error("Error generating documentation", error);
      setDocumentation("Failed to generate documentation.");
    }
  };

  const containerStyle = {
    textAlign: "left",
    padding: "20px"
  };

  const preStyle = {
    backgroundColor: "#f8f8f8",
    padding: "10px",
    border: "1px solid #ccc",
    whiteSpace: "pre-wrap"
  };

  const redTextStyle = {
    color: "red"
  };

  const highlightCode = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index} style={line.startsWith("'''") && line.endsWith("'''") ? redTextStyle : {}}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div style={containerStyle}>
      <h1>Intelligent Documentation Assistant</h1>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      ></textarea>
      <br />
      <button onClick={handleGenerateDocs}>Generate Documentation</button>
      <h2>Generated Documentation:</h2>
      <pre style={preStyle}>{highlightCode(documentation)}</pre>
    </div>
  );
};

export default DocumentationAssistant;
