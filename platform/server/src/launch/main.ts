import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import { validationResult } from "express-validator";
import fs from "fs";
import https from "https";
import path from "path";

import fullConfig from "../../server.config.json";
import { isLoggedIn, passport } from "../authenticator";
import { executeForEachRoute, routes } from "../routes/routes";
import { RequestType } from "../types";

const sslConfig = fullConfig[process.env.BUILD_TYPE].ssl;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Create session
app.use(
  session({
    secret: "some_session_secret",
    resave: false,
    saveUninitialized: false
  })
);

// Use react middleware before passport init so that the browser
// requests for favicon and other metadata will not be slowed by
// authentication (which isn't necessary for that metadata anyway)
app.use(express.static(path.join(__dirname, "../../react-client", "build")));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  // TODO express-enforces-ssl
}

// Register all gets and posts
executeForEachRoute(routes, routeDef => {
  // Create middleware from validators and authentication
  const middleware = [];
  if (routeDef.preValidatorCustomMiddleware) {
    middleware.push(...routeDef.preValidatorCustomMiddleware);
  }
  middleware.push(
    routeDef.requireAuthentication
      ? [...routeDef.validators, isLoggedIn]
      : routeDef.validators
  );
  if (routeDef.customMiddleware) {
    middleware.push(...routeDef.customMiddleware);
  }

  // Define the actual get/post routes
  if (routeDef.type === RequestType.GET) {
    app.get(
      routeDef.endpoint,
      middleware,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        // Send error if validation failed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).jsonp(errors.array());
        }

        const keys = Object.keys(req.query);
        const keysLen = keys.length;
        if (keysLen === 0) {
          await routeDef.fn(req, res, req.user);
        } else if (keysLen === 1) {
          await routeDef.fn(req.query[keys[0]], res, req.user);
        } else {
          await routeDef.fn(req.query, res, req.user);
        }

        if (routeDef.afterRoute) {
          next();
        }
      },
      routeDef.afterRoute || []
    );
  } else if (routeDef.type === RequestType.POST) {
    app.post(
      routeDef.endpoint,
      middleware,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        // Send error if validation failed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).jsonp(errors.array());
        }

        const keys = Object.keys(req.body);
        const keysLen = keys.length;

        // Add all files to the req body so we only
        // need to be concerned with req body
        if (req.files != null) {
          req.body = { ...req.body, ...req.files };
        }
        if (keysLen === 0) {
          await routeDef.fn(req, res, req.user);
        } else if (keysLen === 1) {
          await routeDef.fn(req.body[keys[0]], res, req.user);
        } else {
          await routeDef.fn(req.body, res, req.user);
        }
        if (routeDef.afterRoute) {
          next();
        }
      },
      routeDef.afterRoute || []
    );
  }
});

// Export app as an ssl server
export = https.createServer(
  {
    key: fs.readFileSync(sslConfig.keyPath),
    cert: fs.readFileSync(sslConfig.certPath),
    ca: sslConfig.caPath != null ? fs.readFileSync(sslConfig.caPath) : undefined
  },
  app
);
