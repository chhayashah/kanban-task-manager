/**
 * utils/generateId.js
 * Simple auto-incrementing ID generator.
 * In a real app this would be a DB sequence or UUID.
 */

let currentId = 0;

const generateId = () => {
  currentId += 1;
  return currentId;
};

module.exports = { generateId };
