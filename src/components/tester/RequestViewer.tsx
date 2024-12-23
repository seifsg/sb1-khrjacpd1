import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { RequestDetails } from '../../types/gbp-tester';

interface RequestViewerProps {
  request: RequestDetails | null;
  error: string | null;
}

export default function RequestViewer({ request, error }: RequestViewerProps) {
  if (!request && !error) return null;

  return (
    <>
      {request && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-medium mb-2">Last Request Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">URL:</span> {request.url}
            </p>
            <p>
              <span className="font-medium">Method:</span> {request.method}
            </p>
            <div>
              <p className="font-medium mb-1">Headers:</p>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(request.headers, null, 2)}
              </pre>
            </div>
            {request.error && (
              <div>
                <p className="font-medium text-red-600 mb-1">Error Response:</p>
                <pre className="bg-red-50 p-2 rounded text-red-700">
                  {JSON.stringify(request.error, null, 2)}
                </pre>
              </div>
            )}
            {request.response && (
              <div>
                <p className="font-medium text-green-600 mb-1">Response:</p>
                <pre className="bg-green-50 p-2 rounded text-green-700">
                  {JSON.stringify(request.response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg mb-6">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}
    </>
  );
}