# flood-protection
> Flood protection for realtime applications

[![NPM version](https://badge.fury.io/js/flood-protection.svg)](https://www.npmjs.com/package/flood-protection)
[![Build Status](https://travis-ci.org/yatki/flood-protection.svg?branch=master)](https://travis-ci.org/yatki/flood-protection)
[![Coverage Status](https://coveralls.io/repos/github/yatki/flood-protection/badge.svg?branch=master&)](https://coveralls.io/github/yatki/flood-protection?branch=master)

## Why?

Purpose if this library is to have control on receiving data packages. 
It allows you to **drop** data packages (e.g. messages) if they arrive **too quickly**.
As an example you may want to use it *to prevent spam messages in chat rooms* or *to limit number of requests to your http/express server*.

### Notes:

- I basically rewrote the python solution which was stated here for my own needs in javascript: [https://stackoverflow.com/a/668327/1417536](https://stackoverflow.com/a/668327/1417536).
- This library uses [Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket). 

## Install

```
npm install --save flood-protection
```

## Usage

```javascript
import FloodProtection from 'flood-protection';

const floodProtection = new FloodProtection({
    rate: 5, 
    // default: 5, unit: messages
    // IMPORTANT: rate must be >= 1 (greater than or equal to 1)
    
    per: 8, 
    // default: 8, unit: seconds
  });
```

## Basic Example

```javascript
import FloodProtection from 'flood-protection';

// ...
// io is a Socket.io instance...

io.on('connection', (client) => {
  client.emit('connected');

  const floodProtection = new FloodProtection();
 
  client.on('message', (text) => {
    if (floodProtection.check()) {
      // forward message
      io.emit('message', text);     
    } else {
      // forbid message
      client.emit('flood', {
        text: 'Take it easy!',
      });
    }
  });
});
```

## Contribution

As always, I'm open to any contribution and would like to hear your feedback. 

### Just an important reminder:

If you are planning to contribute to **any** open source project, 
before starting development, please **always open an issue** and **make a proposal first**. 
This will save you from working on features that are eventually going to be rejected for some reason.

## LICENCE

MIT (c) 2017 Mehmet Yatkı
