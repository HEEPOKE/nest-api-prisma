function createResponseBody(
  statusCode: number,
  message: string,
  description?: string,
  error?: any,
  payload?: any,
) {
  const responseBody = {
    statusCode: statusCode,
    message: message,
    description: description ?? '',
    error: error ?? '',
    payload: payload ?? [],
  };

  return responseBody;
}

const responseUtils = {
  createResponseBody,
};

export default responseUtils;
