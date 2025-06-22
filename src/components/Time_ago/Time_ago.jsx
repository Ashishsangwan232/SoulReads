import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const getNextUpdateDelay = (createdAt) => {
  const diff = dayjs().diff(dayjs(createdAt), 'second');

  if (diff < 60) return 1000; // update every second
  if (diff < 3600) return 60000; // update every minute
  if (diff < 86400) return 3600000; // update every hour
  return 86400000; // update daily for old comments
};

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState(dayjs(createdAt).fromNow());

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(dayjs(createdAt).fromNow());
    };

    updateTime(); // initial call
    const delay = getNextUpdateDelay(createdAt);
    const interval = setInterval(updateTime, delay);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <p>{timeAgo}</p>;
};

export default TimeAgo;
