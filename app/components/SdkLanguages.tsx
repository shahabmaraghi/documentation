"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function SdkLanguages() {
  const [activeTab, setActiveTab] = useState("nodejs");

  const sdks = [
    {
      id: "python",
      name: "Python",
      icon: "/python.svg",
      command: "pip install ghasedakpack",
      language: "bash",
      link: "https://pypi.org/project/ghasedakpack/",
    },
    {
      id: "php",
      name: "PHP",
      icon: "/php.svg",
      command: "composer require ghasedak/php",
      language: "bash",
      link: "https://packagist.org/packages/ghasedak/php",
    },
    {
      id: "java",
      name: "Java",
      icon: "/java.svg",
      command: "// Add to pom.xml\n<dependency>\n  <groupId>io.github.ghasedak</groupId>\n  <artifactId>ghasedak-java</artifactId>\n  <version>1.0.0</version>\n</dependency>",
      language: "xml",
      link: "https://github.com/ghasedakapi/ghasedak-java",
    },
    {
      id: "nodejs",
      name: "Node.js",
      icon: "/nodejs.svg",
      command: "npm install --save ghasedak",
      language: "bash",
      link: "https://www.npmjs.com/package/ghasedak",
    },
    {
      id: "go",
      name: "Go",
      icon: "/go.svg",
      command: "go get github.com/ghasedakapi/ghasedak-go",
      language: "bash",
      link: "https://github.com/ghasedakapi/ghasedak-go",
    },
    {
      id: "dotnet",
      name: ".NET",
      icon: "/netcore.png",
      command: "dotnet add package Ghasedak.Core",
      language: "bash",
      link: "https://www.nuget.org/packages/Ghasedak.Core/",
    },
  ];

  const activeSDK = sdks.find((sdk) => sdk.id === activeTab) || sdks[0];

  return (
    <div className="sdk-tabs">
      <h3 className="sdk-tabs__title">نصب  sdk </h3>
      
      <div className="sdk-tabs__container">
        <div className="sdk-tabs__nav">
          {sdks.map((sdk) => (
            <button
              key={sdk.id}
              className={`sdk-tab ${activeTab === sdk.id ? "sdk-tab--active" : ""}`}
              onClick={() => setActiveTab(sdk.id)}
            >
              <img src={sdk.icon} alt={sdk.name} className="sdk-tab__icon" />
              <span className="sdk-tab__name">{sdk.name}</span>
            </button>
          ))}
        </div>

        <div className="sdk-tabs__content">
          <div className="sdk-command">
            <div className="sdk-command__code">
              <SyntaxHighlighter
                language={activeSDK.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: "transparent",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  fontFamily: '"Courier New", Courier, monospace',
                }}
                PreTag="div"
              >
                {activeSDK.command}
              </SyntaxHighlighter>
            </div>
            <a
              href={activeSDK.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sdk-command__link"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>مشاهده مستندات</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

