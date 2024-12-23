import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={16} />
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start date"
          dateFormat="MMM d, yyyy"
          isClearable
          popperClassName="react-datepicker-left"
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8]
              }
            }
          ]}
        />
      </div>
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={16} />
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End date"
          dateFormat="MMM d, yyyy"
          isClearable
          popperClassName="react-datepicker-right"
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8]
              }
            }
          ]}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;