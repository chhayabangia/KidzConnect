const router = express.Router();
const userRoutes = require('./userRoutes');
const daycareRoutes = require('./daycareRoutes');
router.use('/users', userRoutes);
router.use('/daycare', daycareRoutes);
module.exports = router;