const now = () => Math.floor(Date.now() / 1000);

export default class FloodProtection {
  constructor(options = {}) {
    const defaultOptions = {
      rate: 5, // unit: messages
      per: 8, // unit: seconds
    };

    this.options = Object.assign({}, defaultOptions, options);

    if (this.options.rate < 1.0) {
      throw new Error('Rate must be >= 1.0');
    }

    this.allowance = this.options.rate;
    this.lastCheck = now();
  }

  check() {
    const { rate, per } = this.options;

    const current = now();
    const timePassed = current - this.lastCheck;
    this.lastCheck = current;
    this.allowance += timePassed * (rate / per);

    if (this.allowance > rate) {
      this.allowance = rate; // throttle
    }

    const allowed = this.allowance >= 1.0;

    if (allowed) {
      this.allowance -= 1.0;
    }

    return allowed;
  }
}
