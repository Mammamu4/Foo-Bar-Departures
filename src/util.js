export const formatTimeDifference = (departureTime) => {
  const now = new Date();
  const [hours, minutes] = departureTime.split(":").map(Number);

  const departureDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  if (departureDate < now) {
    departureDate.setDate(departureDate.getDate() + 1);
  }

  const differenceInMs = departureDate - now;

  if (differenceInMs < 0) {
    return "Departed";
  }

  const differenceInMin = Math.floor(differenceInMs / 1000 / 60);

  return differenceInMin;
};
export const removeParentheses = (input) => {
  return input.replace(/\s*\(.*?\)/g, "");
};
