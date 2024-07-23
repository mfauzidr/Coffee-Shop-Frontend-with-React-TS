import React, { ChangeEvent } from 'react';

interface DatePickerProps {
  responsiveDisplay: string;
}

const DatePicker = ({ responsiveDisplay }: DatePickerProps) => {
  const [date, setDate] = React.useState<string>('');

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <label className={`text-sm items-center bg-gray-100 p-2 font-bold ${responsiveDisplay}`}>
      <input
        type="date"
        id="date"
        name="date"
        className="outline-none bg-gray-100"
        value={date}
        onChange={handleDate}
      />
    </label>
  );
};

export default DatePicker;
