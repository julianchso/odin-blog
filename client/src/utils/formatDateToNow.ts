import { useState, useEffect } from 'react';
import { format, formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';

const FormatDateToNow = (dateTime: Date) => {
  const [Key, setKey] = useState(0);
  const date = parseISO(Object.values(dateTime).toString());

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const days = differenceInDays(new Date(), date);

  if (days > 1) {
    return format(date, 'LLLL d, u');
  }

  const dateToNow = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  });

  return dateToNow;
};

export default FormatDateToNow;
