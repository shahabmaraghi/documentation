"use client";

import { ReactNode } from "react";

interface ApiRequestResponseProps {
  method: string;
  endpoint: string;
  children: ReactNode;
}

export function ApiRequestResponse({ 
  method, 
  endpoint, 
  children 
}: ApiRequestResponseProps) {
  return (
    <div className="api-request-response">
      <div className="api-request-response__header">
        <span className={`api-method api-method--${method.toLowerCase()}`}>
          {method}
        </span>
        <code className="api-endpoint">{endpoint}</code>
      </div>
      <div className="api-request-response__body">
        {children}
      </div>
    </div>
  );
}


