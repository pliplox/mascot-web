export const getUserName = () => "juan perez";

export const getHour = () => {
  const date = new Date();
  const hourAndMinutes = `${date.getHours()}:${date.getMinutes()}`;
  return hourAndMinutes;
};

export const getToday = () => new Date().getDay() - 1;
