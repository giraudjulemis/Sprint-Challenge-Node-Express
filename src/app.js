const express = require('express');

const app = express();

const port = 3000;

const router = express.Router();

router.route('/compare')
  .get((req, res) => {
    res.json({ hello: 'This is compare route' });
  });

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
