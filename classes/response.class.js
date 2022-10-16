module.exports = class Response {
  constructor(status_code, message, data) {
    this.status_code = status_code;
    this.message = message;
    this.data = data;
  }
};
