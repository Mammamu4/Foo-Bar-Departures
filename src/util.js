export const formatTimeDifference = (departureTime) => {
  const now = new Date();
  const [hours, minutes] = departureTime.split(':').map(Number);
  
  const departureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  
  // If the calculated time is earlier than now, it means it's for the next day
  if (departureDate < now) {
    departureDate.setDate(departureDate.getDate() + 1);
  }

  const differenceInMs = departureDate - now;

  if (differenceInMs < 0) {
    return "Departed";
  }

  const differenceInMin = Math.floor(differenceInMs / 1000 / 60);

  return `${differenceInMin} min`;
};