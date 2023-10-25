"use client";
import React, { useEffect, useState } from "react";

const TimeComponent = ({ eventStart, eventEnd, showEnd, showDetails }) => {
  const [clientTimezone, setClientTimezone] = useState(null);

  // Function to get the client's timezone
  const getClientTimezone = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setClientTimezone(userTimezone);
  };

  useEffect(() => {
    getClientTimezone();
  }, []); // Run this effect only once on component mount

  // Function to format a date/time to the client's timezone
  const formatToClientTimezone = (date) => {
    if (!clientTimezone) return "Loading..."; // Handle the case when clientTimezone is not set yet

    const options = showDetails
      ? {
          timeZone: clientTimezone,
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      : {
          timeZone: clientTimezone,
          month: "short", // Use abbreviated month (e.g., "Oct")
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  // Format event start and end times to the client's timezone
  const formattedStartDate = formatToClientTimezone(eventStart);
  const formattedEndDate = showEnd ? formatToClientTimezone(eventEnd) : null;

  return (
    <time dateTime={eventStart.toISOString()}>
      {formattedStartDate}{" "}
      {showEnd && formattedEndDate && `- ${formattedEndDate}`}
    </time>
  );
};

export default TimeComponent;
