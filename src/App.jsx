import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isToday, getDay, addMonths, subMonths } from 'date-fns';

const getCurrentYearMonth = (year, month) => format(new Date(year, month - 1), 'yyyy年MM月');

const renderDay = (day) => {
  return (
    <div
      className="date-not-current"
      key={format(day, 'yyyy-MM-dd')}
    >
      {format(day, 'd')}
    </div>
  );
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRange = (date) => {
    if (!startDate || date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (date >= startDate) {
      setEndDate(date);
    }
  };

  const isDateRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleMonthChange = (type) => {
    let newDate;
    if (type === 'prev') {
      newDate = subMonths(currentDate, 1);
    } else {
      newDate = addMonths(currentDate, 1);
    }
    setCurrentDate(newDate);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth() + 1);
  };

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [currentYear, currentMonth]);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDaysOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDaysOfMonth
  });
  const startingSlots = getDay(firstDayOfMonth);
  const totalSlots = 42; // 7*6
  const filledSlots = startingSlots + daysInMonth.length;
  const endingSlots = totalSlots - filledSlots;

  const prevMonthStart = subMonths(firstDayOfMonth, 1);
  const prevMonthDays = startingSlots > 0 ? eachDayOfInterval({
    start: prevMonthStart,
    end: endOfMonth(prevMonthStart)
  }).slice(-startingSlots) : [];

  const nextMonthStart = addMonths(firstDayOfMonth, 1);
  const nextMonthDays = eachDayOfInterval({
    start: startOfMonth(nextMonthStart),
    end: endOfMonth(nextMonthStart)
  }).slice(0, endingSlots);

  return (
    <div className="container">
      <div className="calendar">
        <div className="header">
          <div className="month-select left" onClick={() => handleMonthChange('prev')}></div>
          <span>{getCurrentYearMonth(currentYear, currentMonth)}</span>
          <div className="month-select right"  onClick={() => handleMonthChange('next')}></div>
        </div>
        <div className='main'>
          {prevMonthDays.map((day) => renderDay(day))}
          {daysInMonth.map((day) => {
            const rangeStyle = isDateRange(day) ? 'active' : '';
            const todayStyle = isToday(day) ? 'today' : '';
            return (
              <div 
                className={`date ${rangeStyle} ${todayStyle}`}
                key={format(day, 'yyyy-MM-dd')}
                onClick={() => handleDateRange(day)}
                >
                {format(day, 'd')}
              </div>
            );
          })}
          {nextMonthDays.map((day) => renderDay(day))}
        </div>
      </div>
    </div>
  );
}

export default App;
