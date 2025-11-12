# listening-on

Discover local and network interface addresses and print friendly URLs for your services.

[![npm Package Version](https://img.shields.io/npm/v/listening-on)](https://www.npmjs.com/package/listening-on)
[![npm Package Version](https://img.shields.io/bundlephobia/min/listening-on)](https://bundlephobia.com/package/listening-on)
[![npm Package Version](https://img.shields.io/npm/dy/listening-on)](https://www.npmtrends.com/listening-on)

Plain node.js alternative to [running-at](https://www.npmjs.com/package/running-at) with reusable network interface discovery.

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

### Print web server URLs

Named import example:

```typescript
import express from 'express'
import { print } from 'listening-on'

const PORT = +process.env.PORT! || 3000
const app = express()

app.use(express.static('public'))

app.listen(PORT, () => {
  print(PORT)
  /* will print out below lines:
listening on http://127.0.0.1:8100 (lo)
listening on http://192.168.59.46:8100 (wlp3s0)
    */
})
```

commonjs compatible import example:

```typescript
import * as listeningOn from 'listening-on'

listeningOn.print(PORT)

// or simply use require
require('listening-on').print(PORT)
```

### Reuse the discovered addresses

```typescript
import { scan_host } from 'listening-on'

scan_host({
  family: 'all',
  onAddress: ({ host }) => {
    // do something with the address
    appendToCaddyFile(host)
  },
})
```

Possible use cases:

- Print service URLs to the console for development.
- Generate upstream entries for a Caddyfile automatically.
- Feed bootstrap peers into a P2P network discovery list.
- Pre-populate environment configs or service discovery registries with your live IPs.

## API Reference (TypeScript)

```typescript
export function print(port_or_options: number | PrintOptions): void

export function scan_host(options: ScanOptions): void

export type PrintOptions = {
  port: number
  // default http
  protocol?: Protocol | string
  // default IPv4
  family?: Family | 'all'
}

export type Protocol = 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp'

export type Family = 'IPv4' | 'IPv6'

export type ScanOptions = {
  // default IPv4
  family?: Family | 'all'
  onAddress: (address: {
    /** interface name, e.g. lo, wlp3s0 */
    name: string
    /** ip address, e.g. 127.0.0.1, 192.168.59.46 */
    host: string
    /** ip family, e.g. IPv4, IPv6 */
    family: Family
  }) => void
}
```

## License

This is free and open-source software (FOSS) with
[BSD-2-Clause License](./LICENSE)
