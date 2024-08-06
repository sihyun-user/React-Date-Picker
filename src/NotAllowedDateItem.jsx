import React from 'react';
import { format } from 'date-fns';

const NotAllowedDateItem = ({ date }) => {
  return (
    <div
      className="date-not-allowed"
      key={format(date, 'yyyy-MM-dd')}
    >
      {format(date, 'd')}日
    </div>
  );
}

export default NotAllowedDateItem;