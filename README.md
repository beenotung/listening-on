# listening-on

Get local and network ip address

[![npm Package Version](https://img.shields.io/npm/v/listening-on.svg?maxAge=3600)](https://www.npmjs.com/package/listening-on)

Plain node.js alternative to [running-at](https://www.npmjs.com/package/running-at).

This package doesn't rely on `execa` and `ip`, hence more portable.

## Installation
```bash
## with npm
npm i listening-on

## or with pnpm
pnpm i listening-on

## or with yarn
yarn add listening-on
```

## Usage Example
```typescript
import express from 'express'
import * as listeningOn from 'listening-on'

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.static('public'))

app.listen(PORT, () => {
    listeningOn(PORT)
    /* will print out below lines:
listening on http://127.0.0.1:8100 (lo)
listening on http://192.168.59.46:8100 (wlp3s0)
    */
})
```

## Typescript Signature
```typescript
export function print(port_or_options: number | PrintOptions): void;

export type PrintOptions = {
  port: number
  // default http
  protocol?: Protocol | string
  // default IPv4
  family?: Family | 'all'
}

export type Protocol = 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp'

export type Family = 'IPv4' | 'IPv6'
```

## License
This is free and open-source software (FOSS) with
[BSD-2-Clause License](./LICENSE)
