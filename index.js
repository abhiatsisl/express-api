var express = require('express');
const connectToMongo = require('./db');
connectToMongo();
var app = express();

app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/', (req, res) => {
    return res.send("Hello user");
});

// app.listen(3000);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});