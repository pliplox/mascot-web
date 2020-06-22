export const getUserName = () => "juan perez";

export const getHour = () => {
  const date = new Date();
  let hourAndMinutes = `${date.getHours()}:${date.getMinutes()}`;
  return hourAndMinutes;
};

export const getToday = () => {
  let day = new Date().getDay();
  if (day === 0) {
    day = 6;
  }
  return day;
};
