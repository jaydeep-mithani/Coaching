export const getDateAndTimeHandler = (utcString) => {
  // Create a Date object from the UTC string
  const utcDate = new Date(utcString);

  // Get the individual date and time components
  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1; // Months are 0-based, so add 1
  const day = utcDate.getUTCDate();
  let hours = utcDate.getUTCHours();
  const minutes = utcDate.getUTCMinutes();

  let amPmIndicator = "AM";
  if (hours >= 12) {
    amPmIndicator = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  // Format the components as needed
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes} ${amPmIndicator}`;
  return { formattedDate, formattedTime };
};
