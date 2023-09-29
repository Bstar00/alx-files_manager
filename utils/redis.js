import redis from 'redis';
import { promisify } from 'util';

/**
 * Class for performing operations with a Redis service.
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  /**
   * Checks if the connection to Redis is alive.
   * @return {boolean} True if the connection is alive, false otherwise.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Gets the value corresponding to a key in Redis.
   * @param {string} key - The key to search for in Redis.
   * @return {Promise<string|null>} The value of the key or null if the key doesn't exist.
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Creates a new key in Redis with a specific TTL (time to live).
   * @param {string} key - The key to be saved in Redis.
   * @param {string} value - The value to be assigned to the key.
   * @param {number} duration - The TTL of the key in seconds.
   * @return {Promise<void>} No return value.
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Deletes a key from the Redis service.
   * @param {string} key - The key to be deleted.
   * @return {Promise<void>} No return value.
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
