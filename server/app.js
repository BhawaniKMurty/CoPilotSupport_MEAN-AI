const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://localhost:4200'}));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service:'supportCopilot-api',
        time:new Date().toISOString()
    });
})

module.exports = app;