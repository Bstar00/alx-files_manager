import redisClient from './redis';
import dbClient from './db';

/**
 * Get the authentication token from the request headers.
 * @param {object} request - The HTTP request object.
 * @returns {string} The authentication token.
 */
async function getAuthToken(request) {
  const token = request.headers['x-token'];
  return `auth_${token}`;
}

/**
 * Find a user's ID by their authentication token.
 * @param {object} request - The HTTP request object.
 * @returns {Promise<string|null>} The user's ID or null if not found.
 */
async function findUserIdByToken(request) {
  try {
    const key = await getAuthToken(request);
    const userId = await redisClient.get(key);
    return userId || null;
  } catch (error) {
    console.error(`Error finding user ID by token: ${error.message}`);
    throw error;
  }
}

/**
 * Find a user by their user ID.
 * @param {string} userId - The user's ID.
 * @returns {Promise<object|null>} The user object or null if not found.
 */
async function findUserById(userId) {
  try {
    const user = await dbClient.users.findOne({ _id: userId });
    return user || null;
  } catch (error) {
    console.error(`Error finding user by ID: ${error.message}`);
    throw error;
  }
}

export { findUserIdByToken, findUserById };
