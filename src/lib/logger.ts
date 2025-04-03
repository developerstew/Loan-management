export const log = {
  error: (message: string, error?: unknown) => {
    console.error(
      JSON.stringify(
        {
          level: 'error',
          message,
          timestamp: new Date().toISOString(),
          error:
            error instanceof Error
              ? {
                  message: error.message,
                  stack: error.stack,
                  name: error.name,
                }
              : error,
        },
        null,
        2,
      ),
    );
  },
  info: (message: string, data?: unknown) => {
    console.log(
      JSON.stringify(
        {
          level: 'info',
          message,
          timestamp: new Date().toISOString(),
          data,
        },
        null,
        2,
      ),
    );
  },
};
