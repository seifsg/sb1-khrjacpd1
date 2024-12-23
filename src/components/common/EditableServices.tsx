import React, { useState } from 'react';
import { Edit2, Check, X, Plus, Trash2 } from 'lucide-react';
import type { GBPService } from '../../types/gbp-fields';

interface EditableServicesProps {
  services: GBPService[];
  onSave: (services: GBPService[]) => Promise<void>;
}

const EditableServices: React.FC<EditableServicesProps> = ({ services = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedServices, setEditedServices] = useState<GBPService[]>(services);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddService = () => {
    setEditedServices(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: '', description: '', price: '' }
    ]);
  };

  const handleRemoveService = (id: string) => {
    setEditedServices(prev => prev.filter(service => service.id !== id));
  };

  const handleServiceChange = (id: string, field: keyof GBPService, value: string) => {
    setEditedServices(prev => prev.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const handleSave = async () => {
    if (JSON.stringify(editedServices) === JSON.stringify(services)) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editedServices);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save services:', error);
      setEditedServices(services);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedServices(services);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="space-y-4">
          {editedServices.map((service, index) => (
            <div key={service.id} className="flex gap-4 items-start p-4 border rounded-lg">
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                  placeholder="Service name"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={service.description || ''}
                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={service.price || ''}
                  onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                  placeholder="Price (optional)"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={() => handleRemoveService(service.id)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          <button
            onClick={handleAddService}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus size={20} />
            <span>Add Service</span>
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
          {services.length > 0 ? (
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  {service.description && (
                    <p className="mt-1 text-gray-600">{service.description}</p>
                  )}
                  {service.price && (
                    <p className="mt-2 text-gray-900 font-medium">{service.price}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No services added</p>
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

export default EditableServices;