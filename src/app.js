const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./modules/user/user.routes');
const { transporter } = require('./utils/mailer');
require('dotenv').config();


const PORT = process.env.PORT ?? 8001;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('ok');
});

app.use(userRoutes.router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})