import redisClient from './utils/redis';

(async () => {
  try {
    // Check if Redis client is alive
    console.log(`Redis Client is alive: ${redisClient.isAlive()}`);

    // Get the initial value of 'myKey'
    const initialValue = await redisClient.get('myKey');
    console.log(`Initial Value of 'myKey': ${initialValue}`);

    // Set 'myKey' to 12 with a TTL of 5 seconds
    await redisClient.set('myKey', 12, 5);
    console.log('Set "myKey" to 12 with a TTL of 5 seconds');

    // Wait for 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Get the value of 'myKey' again after 10 seconds
    const finalValue = await redisClient.get('myKey');
    console.log(`Value of 'myKey' after 10 seconds: ${finalValue}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    // Close the Redis client gracefully (if necessary)
    redisClient.client.quit();
  }
})();
