/**
 * Start the app. I read online this is good practice (lol)
 */

import { logger } from "../logger";
import app from "./main";
import { GeneralError } from "../errors/GeneralError";

// TODO ensure this is running production when on ec2
// TODO may need to add ip into app.listen
(async () => {
  const port = 443;
  app.listen(port, function () {
    logger.debug(`Groupage server listening on port ${port}`);
  });
})();
