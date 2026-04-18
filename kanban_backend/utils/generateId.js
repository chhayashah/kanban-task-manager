let currentId = 0;

export const generateId = () => {
  currentId += 1;
  return currentId;
};
