"use client";

import { useState, ReactNode } from "react";

interface BodyField {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  label: string;
}

interface ApiInteractiveProps {
  method: string;
  endpoint: string;
  title?: string;
  description?: string;
  bodyFields?: BodyField[];
  bodyJson?: string;
  responseJson: string;
  responseStatus?: number;
  codeExamples: {
    [key: string]: string;
  };
  defaultLanguage?: string;
}

export function ApiInteractive({
  method,
  endpoint,
  title,
  description,
  bodyFields = [],
  bodyJson,
  responseJson,
  responseStatus = 200,
  codeExamples,
  defaultLanguage = "javascript",
}: ApiInteractiveProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [showSchema, setShowSchema] = useState(false);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    bodyFields.forEach((field) => {
      initial[field.name] = field.default || "";
    });
    return initial;
  });

  const languages = Object.keys(codeExamples);
  const selectedCode = codeExamples[selectedLanguage] || "";

  return (
    <div className="api-interactive">
      <div className="api-interactive__container">
        {/* Right Side - Code & Response */}
        <div className="api-interactive__right">
          {/* Code Block */}
          <div className="api-interactive__code-block">
            <div className="api-interactive__code-header">
              <div className="api-interactive__code-endpoint">
                <span className={`api-method api-method--${method.toLowerCase()}`}>
                  {method}
                </span>
                <code>{endpoint}</code>
              </div>
              <div className="api-interactive__language-selector">
                <span className="api-interactive__language-label">
                  {selectedLanguage === "javascript" ? "Node.js Axios" : selectedLanguage}
                </span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="api-interactive__language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === "javascript" ? "Node.js Axios" : lang}
                    </option>
                  ))}
                </select>
                <span className="api-interactive__language-arrow">▼</span>
              </div>
            </div>
            <div className="api-interactive__code-content">
              <pre>
                <code>{selectedCode}</code>
              </pre>
            </div>
            <div className="api-interactive__code-footer">
              <button className="api-interactive__test-button">Test Request</button>
            </div>
          </div>

          {/* Response Block */}
          <div className="api-interactive__response-block">
            <div className="api-interactive__response-header">
              <span className="api-interactive__response-status">{responseStatus}</span>
              <label className="api-interactive__schema-toggle">
                <input
                  type="checkbox"
                  checked={showSchema}
                  onChange={(e) => setShowSchema(e.target.checked)}
                />
                Show Schema
              </label>
            </div>
            <div className="api-interactive__response-content">
              <pre>
                <code>{responseJson}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
