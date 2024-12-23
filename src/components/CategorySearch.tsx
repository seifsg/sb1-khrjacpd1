import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface CategorySearchProps {
  onSelect: (category: string) => void;
}

// This would typically come from an API or larger data file
const SAMPLE_CATEGORIES = [
  'Accounting',
  'Advertising Agency',
  'Aerospace Company',
  'Art Gallery',
  'Auto Dealer',
  'Auto Repair Shop',
  'Bakery',
  'Bank',
  'Bar',
  'Beauty Salon',
  'Bookstore',
  'Cafe',
  // ... many more categories
];

const CategorySearch: React.FC<CategorySearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = SAMPLE_CATEGORIES.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 50); // Limit to 50 results for performance
      setFilteredCategories(filtered);
      setIsVisible(true);
    } else {
      setFilteredCategories([]);
      setIsVisible(false);
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isVisible && filteredCategories.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCategories.map((category) => (
            <button
              key={category}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={() => {
                onSelect(category);
                setSearchTerm('');
                setIsVisible(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;