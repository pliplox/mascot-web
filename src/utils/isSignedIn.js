/**
 * Verifies wether or not the user is signed in the system.
 * @return {Boolean} True if user is signed in, false otherwise.
 */
const isSignedIn = () => {
  const tokenId = localStorage.getItem('tokenId');
  return tokenId !== undefined && tokenId !== null;
};

export default isSignedIn;
