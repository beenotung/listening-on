import * as os from 'os'

export function print(port: number, protocol: string = 'http') {
  let ifaces = os.networkInterfaces()
  Object.entries(ifaces).forEach(([name, ifaces]) => {
    ifaces?.forEach(iface => {
      let { address, family } = iface
      if (address.startsWith('::')) {
        return
      }
      if (family === 'IPv4') {
        console.log(`listening on ${protocol}://${address}:${port} (${name})`)
      } else if (family === 'IPv6') {
        console.log(`listening on ${protocol}://[${address}]:${port} (${name})`)
      }
    })
  })
}