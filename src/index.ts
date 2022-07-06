import { networkInterfaces } from 'os'

export type PrintOptions = {
  port: number
  // default http
  protocol?: Protocol | string
  // default IPv4
  family?: Family | 'all'
}

export type Protocol = 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp'

export type Family = 'IPv4' | 'IPv6'

type Node16Family = 'IPv4' | 'IPv6'
type Node18Family = 4 | 6
type NodeFamily = Node16Family | Node18Family

export function print(port_or_options: number | PrintOptions) {
  if (!port_or_options) {
    throw new TypeError('missing port or options')
  }
  const options: PrintOptions =
    typeof port_or_options === 'number'
      ? { port: port_or_options }
      : port_or_options
  const port = options.port
  const protocol = options.protocol || 'http'

  console.log(`listening on ${protocol}://localhost:${port}`)

  const family: Required<PrintOptions>['family'] = options.family || 'IPv4'
  const showIPv4 = family === 'IPv4' || family === 'all'
  const showIPv6 = family === 'IPv6' || family === 'all'
  Object.entries(networkInterfaces()).forEach(([name, addresses]) => {
    addresses?.forEach((address: { address: string; family: NodeFamily }) => {
      const { address: host, family } = address
      if (showIPv4 && (family === 'IPv4' || family === 4)) {
        console.log(`listening on ${protocol}://${host}:${port} (${name})`)
      } else if (showIPv6 && (family === 'IPv6' || family === 6)) {
        console.log(`listening on ${protocol}://[${host}]:${port} (${name})`)
      }
    })
  })
}
