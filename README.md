# rpi-data-api
A RESTful API for storing sensor data like temperature/humidity/co2, measured from a Raspberry Pi. 

Structuring the project in the spirit of Uncle Bob's ["Screaming Architecture"](https://youtu.be/2dKZ-dWaCiU?t=1403), and dipping my toes into test driven development.

Built with Node.js, Express.js, TypeScript, MongoDB(Mongoose).

### Generate authentication token
`npm run generate-token -- <args>`
The extra `--` is required to pass the arguments to the command instead of to `npm`.
Example:
```
$ npm run generate-token -- -o Bob -i 1234
```
Outputs a jsonwebtoken to stdout that can be attached to the `authorization` header in requests.

## Credits
This was made by following [Alex Permiakov's post](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407) and then just modified and added on to.
