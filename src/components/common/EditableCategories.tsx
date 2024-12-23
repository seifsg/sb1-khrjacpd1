import React, { useState } from 'react';
import Select from 'react-select';
import { Edit2, Check, X } from 'lucide-react';

// Sample categories - in a real app, this would come from an API
const ALL_CATEGORIES = [
  'Restaurant',
  'Cafe',
  'Bar',
  'Retail Store',
  'Grocery Store',
  'Hotel',
  'Gym',
  'Salon',
  'Spa',
  'Medical Clinic',
  'Dental Office',
  'Real Estate Agency',
  'Auto Repair',
  'Bank',
  'Insurance Agency',
].map(cat => ({ value: cat, label: cat }));

interface EditableCategoriesProps {
  categories: string[];
  onSave: (categories: string[]) => Promise<void>;
}

const EditableCategories: React.FC<EditableCategoriesProps> = ({
  categories,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(cat => ({ value: cat, label: cat }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (JSON.stringify(selectedCategories.map(c => c.value)) === JSON.stringify(categories)) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(selectedCategories.map(c => c.value));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save categories:', error);
      setSelectedCategories(categories.map(cat => ({ value: cat, label: cat })));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedCategories(categories.map(cat => ({ value: cat, label: cat })));
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
      {isEditing ? (
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              isMulti
              value={selectedCategories}
              onChange={(selected) => setSelectedCategories(selected as any)}
              options={ALL_CATEGORIES}
              isDisabled={isLoading}
              placeholder="Search categories..."
              className="text-sm"
              classNamePrefix="select"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px',
                  borderColor: '#e5e7eb',
                  '&:hover': {
                    borderColor: '#e5e7eb'
                  }
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#eff6ff' : 'white',
                  color: state.isSelected ? 'white' : '#374151'
                })
              }}
            />
          </div>
          <div className="flex items-start gap-2">
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
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
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

export default EditableCategories;