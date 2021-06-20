import * as os from 'os'

export type PrintOptions = {
  port: number
  // default http
  protocol?: 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp' | string
  // default IPv4
  family?: 'IPv4' | 'IPv6' | 'all'
}

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
  const family: Required<PrintOptions>['family'] = options.family || 'IPv4'
  const showIPv4 = family === 'IPv4' || family === 'all'
  const showIPv6 = family === 'IPv6' || family === 'all'
  const ifaces = os.networkInterfaces()
  Object.entries(ifaces).forEach(([name, ifaces]) => {
    ifaces?.forEach(iface => {
      let { address, family } = iface
      if (address.startsWith('::')) {
        return
      }
      if (family === 'IPv4' && showIPv4) {
        console.log(`listening on ${protocol}://${address}:${port} (${name})`)
      } else if (family === 'IPv6' && showIPv6) {
        console.log(`listening on ${protocol}://[${address}]:${port} (${name})`)
      }
    })
  })
}
