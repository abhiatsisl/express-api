var express = require('express');
const connectToMongo = require('./db');
connectToMongo();
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/users', require('./routes/user'));
app.use('/', (req, res) => {
    return res.send("Hello user");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});