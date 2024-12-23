import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`
        flex items-center gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-md
        animate-in slide-in-from-right-5 fade-in duration-300
        ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}
      `}
    >
      {type === 'success' ? (
        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
      ) : (
        <XCircle className="text-red-500 flex-shrink-0" size={20} />
      )}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button 
        onClick={onClose}
        className={`
          flex-shrink-0 rounded-lg p-1 transition-colors
          ${type === 'success' ? 'hover:bg-green-100' : 'hover:bg-red-100'}
        `}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;