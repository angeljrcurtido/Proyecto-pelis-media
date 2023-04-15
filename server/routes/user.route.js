
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/me', authMiddleware, userController.me);
app.post('/logout', userController.logout);

}

