import { connectToMongo } from './infrastructure';

(async () => {
  try {
    console.info('Initializing the application');
    await connectToMongo();
    // todo: init the express server
  } catch (error) {
    // todo: terminate the application
    console.error(error);
  }
})();
