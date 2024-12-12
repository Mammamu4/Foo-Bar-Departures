export const formatTimeDifference = (departureTime) => {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const fullDepartureTime = `${currentDate}T${departureTime}`;
  const departureDate = new Date(fullDepartureTime);
  const differenceInMs = departureDate - now;

  if (differenceInMs < 0) {
    return "Departed";
  }

  const differenceInMin = Math.floor(differenceInMs / 1000 / 60);

  return `${differenceInMin} min`;
};