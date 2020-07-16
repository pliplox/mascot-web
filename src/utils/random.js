// eslint-disable-next-line import/prefer-default-export
export const randomAnimalImage = (breakpoint = 'lg') => {
  const breakPoints = {
    lg: '1000/720',
    md: '960/691',
    sm: '600/432',
    xs: '320/570'
  };

  const pickedSize = breakPoints[breakpoint];

  const sources = [
    `https://placebear.com/${pickedSize}`,
    `http://placeimg.com/${pickedSize}/animals`,
    `https://placedog.net/${pickedSize}?random`,
    `https://placekitten.com/${pickedSize}`
  ];

  return `url(${sources[Math.floor(Math.random() * sources.length)]})`;
};
