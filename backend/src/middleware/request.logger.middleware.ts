import * as express from "express";

const requestLoggerMiddleware = (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  console.info(`Got request... ${req.method} ${req.originalUrl}`);
  const startTime = new Date().getTime();
  resp.on("finish", () => {
    const elaspedTime = new Date().getTime() - startTime;
    console.info(
      `Request Result: ${req.method} ${req.originalUrl} ${resp.statusCode} ${elaspedTime}ms`
    );
  });
  next();
};

export { requestLoggerMiddleware };
