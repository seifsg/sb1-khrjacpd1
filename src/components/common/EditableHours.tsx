import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import type { BusinessHours, DayHours } from '../../types/gbp-fields';

interface EditableHoursProps {
  hours?: BusinessHours;
  onSave: (hours: BusinessHours) => Promise<void>;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const EditableHours: React.FC<EditableHoursProps> = ({ hours = {}, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHours, setEditedHours] = useState<BusinessHours>(hours);
  const [isLoading, setIsLoading] = useState(false);

  const handleDayChange = (day: string, field: keyof DayHours, value: string | boolean) => {
    setEditedHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof BusinessHours],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    if (JSON.stringify(editedHours) === JSON.stringify(hours)) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editedHours);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save hours:', error);
      setEditedHours(hours);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedHours(hours);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="space-y-4">
          {DAYS.map(day => {
            const dayHours = editedHours[day as keyof BusinessHours] || { open: '', close: '', isClosed: false };
            return (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 font-medium capitalize">{day}</div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!dayHours.isClosed}
                    onChange={(e) => handleDayChange(day, 'isClosed', !e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span>Open</span>
                </label>
                {!dayHours.isClosed && (
                  <>
                    <input
                      type="time"
                      value={dayHours.open}
                      onChange={(e) => handleDayChange(day, 'open', e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={dayHours.close}
                      onChange={(e) => handleDayChange(day, 'close', e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                  </>
                )}
              </div>
            );
          })}
          <div className="flex justify-end gap-2 mt-4">
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
      ) : (
        <div className="relative">
          <div className="space-y-2">
            {DAYS.map(day => {
              const dayHours = hours[day as keyof BusinessHours];
              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 font-medium capitalize">{day}</div>
                  <div className="text-gray-600">
                    {dayHours?.isClosed ? (
                      'Closed'
                    ) : dayHours ? (
                      `${dayHours.open} - ${dayHours.close}`
                    ) : (
                      'Not set'
                    )}
                  </div>
                </div>
              );
            })}
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

export default EditableHours;