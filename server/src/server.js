const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const { makeServer } = require('./config/apollo');

const port = 4000;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }),
  algorithms: ['RS256'],
});

makeServer().then((server) => {
  const app = express();
  app.use(cors());

  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.send('Hello from public route.');
  });

  server.applyMiddleware({ app });

  app.use(checkJwt);
  app.get('/protected', (req, res) => {
    res.send('Hello from protected route.');
  });

  app.use(function (err, req, res, next) {
    res.status(401).send('Invalid credentials.');
  });

  app.listen(port, () => {
    console.log(
      `Server ready at https://${process.env.HOST_NAME}${server.graphqlPath}`
    );
  });
});
