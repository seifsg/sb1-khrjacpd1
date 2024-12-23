import { useState, useCallback } from 'react';
import { LogLevel, getLogs, clearLogs, exportLogs } from '../utils/logging';
import type { LogFilter } from '../utils/logging';

export function useLogViewer() {
  const [filter, setFilter] = useState<LogFilter>({});

  const logs = getLogs(filter);

  const handleExport = useCallback(() => {
    const blob = new Blob([exportLogs()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-logs-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      clearLogs();
    }
  }, []);

  return {
    logs,
    filter,
    setFilter,
    handleExport,
    handleClear
  };
}