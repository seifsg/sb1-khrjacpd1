import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Date Range</label>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={16} />
          <DatePicker
            selected={dateRange.start ? new Date(dateRange.start) : null}
            onChange={(date) => 
              onDateRangeChange({
                ...dateRange,
                start: date ? date.toISOString().split('T')[0] : ''
              })
            }
            selectsStart
            startDate={dateRange.start ? new Date(dateRange.start) : null}
            endDate={dateRange.end ? new Date(dateRange.end) : null}
            placeholderText="Start date"
            dateFormat="MMM d, yyyy"
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            popperClassName="date-picker-popper"
            popperPlacement="bottom-start"
            isClearable
          />
        </div>
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={16} />
          <DatePicker
            selected={dateRange.end ? new Date(dateRange.end) : null}
            onChange={(date) =>
              onDateRangeChange({
                ...dateRange,
                end: date ? date.toISOString().split('T')[0] : ''
              })
            }
            selectsEnd
            startDate={dateRange.start ? new Date(dateRange.start) : null}
            endDate={dateRange.end ? new Date(dateRange.end) : null}
            minDate={dateRange.start ? new Date(dateRange.start) : null}
            placeholderText="End date"
            dateFormat="MMM d, yyyy"
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            popperClassName="date-picker-popper"
            popperPlacement="bottom-start"
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;