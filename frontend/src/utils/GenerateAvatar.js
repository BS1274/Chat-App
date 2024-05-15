// Function to generate Robohash avatar URL
const generateRobohashAvatar = (seed) =>
  `https://robohash.org/${seed}.svg`;

// Function to generate avatar data using Robohash API
export const generateAvatar = () => {
  const data = [];

  for (let i = 0; i < 6; i++) {
    const res = generateRobohashAvatar(Math.random());
    data.push(res);
  }

  return data;
};
