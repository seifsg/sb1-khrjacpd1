import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit2 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  label: string;
  onSave: (newValue: string) => Promise<void>;
  type?: 'text' | 'textarea' | 'url' | 'tel';
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  label,
  onSave,
  type = 'text'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      setEditValue(value); // Reset on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="flex items-start gap-2">
            <InputComponent
              ref={inputRef as any}
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`
                flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${type === 'textarea' ? 'min-h-[100px]' : ''}
              `}
              disabled={isLoading}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
              >
                <Check size={20} />
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
          <div className="text-gray-900 min-h-[24px] break-words">
            {value || <span className="text-gray-400">Not set</span>}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
          >
            <Edit2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;