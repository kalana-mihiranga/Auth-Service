const express = require('express');
const router = require('./routes/user_routes');
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/error');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth/api/user", router)

app.all("*", (req, res, next) => {
    next ( new AppError("url not found", 404) );
})

app.use(errorHandler);

const PORT = 5500;

app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})