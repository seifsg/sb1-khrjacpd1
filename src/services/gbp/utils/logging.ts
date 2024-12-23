export function logGBPError(error: any, context: string) {
  console.error(`GBP Error in ${context}:`, {
    message: error.message,
    code: error.code,
    details: error.details,
    stack: error.stack
  });
}

export function logGBPRequest(method: string, params: any) {
  console.debug(`GBP Request - ${method}:`, params);
}

export function logGBPResponse(method: string, response: any) {
  console.debug(`GBP Response - ${method}:`, response);
}