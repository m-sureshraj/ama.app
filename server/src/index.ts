import { connectToMongo } from './infrastructure';

(async () => {
  try {
    console.info('Initializing the application');
    await connectToMongo();
  } catch (error) {
    // todo: terminate the application
  }
})();
