const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const fs = require('fs');
const path = require('path');

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

const textParser = bodyParser.text({ type: 'text/plain' });

makeServer().then((server) => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello from public route.');
  });

  app.use(checkJwt);

  server.applyMiddleware({ app });

  app.post('/schema', textParser, function (req, res) {
    const newSchema = req.body;
    const loc = path.join(__dirname, 'config/schema.graphql');

    fs.writeFileSync(loc, newSchema);

    res.send(newSchema);
  });

  app.use(function (err, req, res, next) {
    res.status(401).json({
      data: {
        Message: 'Invalid credentials',
      },
    });
  });

  app.listen(port, () => {
    console.log(
      `Server ready at https://${process.env.HOST_NAME}${server.graphqlPath}`
    );
  });
});
