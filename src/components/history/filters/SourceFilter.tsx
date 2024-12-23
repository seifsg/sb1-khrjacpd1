import React from 'react';
import Select from 'react-select';

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'google', label: 'Google' },
  { value: 'owner', label: 'Owner/Manager' },
  { value: 'user', label: 'User' }
];

interface SourceFilterProps {
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({
  selectedSources,
  onSourcesChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Who made changes</label>
      <Select
        isMulti
        value={SOURCE_OPTIONS.filter(option => selectedSources.includes(option.value))}
        onChange={(selected) => {
          onSourcesChange(selected ? selected.map(option => option.value) : []);
        }}
        options={SOURCE_OPTIONS}
        className="text-sm"
        classNamePrefix="select"
        placeholder="Select sources"
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
  );
};

export default SourceFilter;