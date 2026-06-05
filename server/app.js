const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/auth');

const app = express();
app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://localhost:4200'}));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/me',verifyToken,(req,res)=>{
    res.json({user:req.user, message:'You are authenticated!'});
});
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service:'supportCopilot-api',
        time:new Date().toISOString()
    });
})

module.exports = app;