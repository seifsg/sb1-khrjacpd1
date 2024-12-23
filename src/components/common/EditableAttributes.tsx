import React, { useState } from 'react';
import { Edit2, Check, X, Plus, Trash2 } from 'lucide-react';
import type { GBPAttribute } from '../../types/gbp-fields';

interface EditableAttributesProps {
  attributes: GBPAttribute[];
  onSave: (attributes: GBPAttribute[]) => Promise<void>;
}

const EditableAttributes: React.FC<EditableAttributesProps> = ({ attributes = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAttributes, setEditedAttributes] = useState<GBPAttribute[]>(attributes);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAttribute = () => {
    setEditedAttributes(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: '', value: '', group: '' }
    ]);
  };

  const handleRemoveAttribute = (id: string) => {
    setEditedAttributes(prev => prev.filter(attr => attr.id !== id));
  };

  const handleAttributeChange = (id: string, field: keyof GBPAttribute, value: string | boolean) => {
    setEditedAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
  };

  const handleSave = async () => {
    if (JSON.stringify(editedAttributes) === JSON.stringify(attributes)) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editedAttributes);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save attributes:', error);
      setEditedAttributes(attributes);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedAttributes(attributes);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="space-y-4">
          {editedAttributes.map((attribute, index) => (
            <div key={attribute.id} className="flex gap-4 items-start p-4 border rounded-lg">
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={attribute.name}
                  onChange={(e) => handleAttributeChange(attribute.id, 'name', e.target.value)}
                  placeholder="Attribute name"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {typeof attribute.value === 'boolean' ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={attribute.value}
                      onChange={(e) => handleAttributeChange(attribute.id, 'value', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span>Enabled</span>
                  </label>
                ) : (
                  <input
                    type="text"
                    value={attribute.value as string}
                    onChange={(e) => handleAttributeChange(attribute.id, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                )}
                <input
                  type="text"
                  value={attribute.group || ''}
                  onChange={(e) => handleAttributeChange(attribute.id, 'group', e.target.value)}
                  placeholder="Group (optional)"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={() => handleRemoveAttribute(attribute.id)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          <button
            onClick={handleAddAttribute}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus size={20} />
            <span>Add Attribute</span>
          </button>

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
          {attributes.length > 0 ? (
            <div className="space-y-4">
              {attributes.map(attribute => (
                <div key={attribute.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{attribute.name}</h3>
                    {attribute.group && (
                      <span className="text-sm text-gray-500">{attribute.group}</span>
                    )}
                  </div>
                  <p className="mt-1 text-gray-600">
                    {typeof attribute.value === 'boolean'
                      ? attribute.value ? 'Yes' : 'No'
                      : attribute.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No attributes added</p>
          )}
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

export default EditableAttributes;