import { connectToMongo, createServer } from './infrastructure';
import { router } from './bootstrap';

(async () => {
  console.info('Initializing the application');
  await connectToMongo();

  createServer(router);
})();
