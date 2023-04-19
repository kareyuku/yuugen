export function OKResponse(message: string, data: {} = undefined): Object {
  return {
    statusCode: 200,
    message,
    data,
  };
}
