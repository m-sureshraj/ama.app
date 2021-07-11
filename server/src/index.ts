import { connectToMongo, createServer, logger } from './infrastructure';
import { router } from './bootstrap';

(async () => {
  logger.info('Initializing the application');
  await connectToMongo();

  createServer(router);
})();
