export class HTTPError extends Error {
  statusCode: number;
  url: string;
  name: string;

  constructor(statusCode: number, message: string, url = "") {
    super(message); // Pass the message to the Error constructor
    this.name = "HTTPError"; // Set the name of the error
    this.statusCode = statusCode; // Attach the status code
    this.url = url; // Attach the URL, if provided

    // Maintain stack trace (important for debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }

  /**
     * Returns a string representation of the error.
     */
  toString() {
    return `${this.name}: ${this.message} (Status: ${this.statusCode}${
      this.url ? `, URL: ${this.url}` : ""
    })`;
  }
}

export const HttpStatusCode = {
  RequestTimeout: 408,
  GatewayTimeout: 504,
  Conflict: 409,
};
