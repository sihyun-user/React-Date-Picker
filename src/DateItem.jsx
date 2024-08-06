import React from 'react';
import { format, isToday } from 'date-fns';

const DateItem = ({ date, startDate, endDate, onClick }) => {
  const dateKey = format(date, 'yyyy-MM-dd');
  const isStartDate = startDate && dateKey === format(startDate, 'yyyy-MM-dd');
  const selectedStyle = isStartDate || (date >= startDate && date <= endDate) ? 'active' : '';
  const todayStyle = isToday(date) ? 'today' : '';
  return (
    <div 
      className={`date ${selectedStyle} ${todayStyle}`}
      key={dateKey}
      onClick={() => onClick(date)}
      >
      {format(date, 'd')}日
    </div>
  );
};

export default DateItem;