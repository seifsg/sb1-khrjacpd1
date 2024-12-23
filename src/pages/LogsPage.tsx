import React, { useState } from 'react';
import LogTable from '../components/logs/LogTable';
import LogToolbar from '../components/logs/LogToolbar';
import { useLogViewer } from '../hooks/useLogViewer';
import type { LogLevel } from '../utils/logging';

const LogsPage = () => {
  const { logs, handleExport, handleClear } = useLogViewer();
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | undefined>();

  const filteredLogs = selectedLevel 
    ? logs.filter(log => log.level === selectedLevel)
    : logs;

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
            <p className="mt-1 text-gray-500">
              View and manage application logs
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <LogToolbar
              onExport={handleExport}
              onClear={handleClear}
              onFilterChange={setSelectedLevel}
              selectedLevel={selectedLevel}
            />
          </div>
          <LogTable logs={filteredLogs} />
        </div>
      </div>
    </div>
  );
};

export default LogsPage;