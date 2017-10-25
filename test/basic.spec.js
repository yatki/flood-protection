import test from 'ava';
import FloodProtection from '../dist';

test.cb('fails if called every 0.5 seconds', (t) => {
  const options = {
    rate: 5,
    per: 8,
  };

  const floodProtection = new FloodProtection(options);
  let messageCount = 0;

  setInterval(() => {
    messageCount += 1;
    if (!floodProtection.check() && messageCount >= options.rate) {
      t.pass();
      t.end();
    }
  }, 500);
});


test.cb('passes if called every 2 seconds', (t) => {
  const options = {
    rate: 5,
    per: 8,
  };

  const floodProtection = new FloodProtection(options);
  let messageCount = 0;

  setInterval(() => {
    messageCount += 1;
    if (floodProtection.check() && messageCount === options.rate) {
      t.pass();
      t.end();
    }
  }, 2000);
});


test.cb('fails for rate: 10, per: 5 ', (t) => {
  const options = {
    rate: 10,
    per: 5,
  };

  const floodProtection = new FloodProtection(options);
  let messageCount = 0;

  setInterval(() => {
    messageCount += 1;
    if (!floodProtection.check() && messageCount >= options.rate) {
      t.pass();
      t.end();
    }
  }, 100);
});


test.cb('passes for rate: 10, per: 5 ', (t) => {
  const options = {
    rate: 10,
    per: 5,
  };

  const floodProtection = new FloodProtection(options);
  let messageCount = 0;

  setInterval(() => {
    messageCount += 1;
    if (floodProtection.check() && messageCount === options.rate) {
      t.pass();
      t.end();
    }
  }, 500);
});


test.cb('updateLastCheck method works', (t) => {
  const floodProtection = new FloodProtection();

  t.truthy(floodProtection.lastCheck);

  const unixtime = Date.now();
  setTimeout(() => {
    floodProtection.updateLastCheck(unixtime);
    t.is(floodProtection.lastCheck, Math.floor(unixtime / 1000));
    t.pass();
  }, 1000);

  setTimeout(() => {
    floodProtection.updateLastCheck();
    t.is(floodProtection.lastCheck, Math.floor(Date.now() / 1000));
    t.pass();
    t.end();
  }, 2000);
});


test('throws exception if rate < 1.0', (t) => {
  t.throws(() => {
    const floodProtection = new FloodProtection({
      rate: 0.5,
    });
    floodProtection.check();
  });
});
