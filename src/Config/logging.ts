import colors from "colors";

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

colors.enable();

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(
      `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`.white,
      object
    );
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`.white);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`.grey,
      object
    );
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`.grey);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [WARN] [${namespace}] ${message}`.yellow,
      object
    );
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`.yellow);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`.red,
      object
    );
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`.red);
  }
};

export default {
  info,
  debug,
  warn,
  error,
};
