import * as os from 'os'

export function print(
  port: number,
  protocol: string = 'http',
  family: 'IPv4' | 'IPv6' | 'all' = 'IPv4',
) {
  const showIPv4 = family === 'IPv4' || family === 'all'
  const showIPv6 = family === 'IPv6' || family === 'all'
  let ifaces = os.networkInterfaces()
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