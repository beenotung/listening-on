import { print } from '../src'
import * as listeningOn from '../src'

console.log('> print(8100)')
print(8100)

console.log()
console.log('> listeningOn.print(8080)')
listeningOn.print(8080)

console.log()
console.log('IPv6:')
print({ port: 8200, family: 'IPv6' })
