const User = require('../models/user')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const userWithUsername = await User.findOne({ where: { username } }).catch(
        (err) => {
            console.log('Error:', err)
        }
    )
if (!userWithUsername)
return res.status(400).json({ Message: 'Username or password does not match!' })

if (userWithUsername.password !== password)
return res.status(400).json({ Message: 'Username or password does not match!' })

const jwtToken = jwt.sign(
    {id: userWithUsername.id, username: userWithUsername.username },
    process.env.JWT_SECRET
)

res.json({ Message: 'Welcome Back!', token: jwtToken });
})
module.exports = router;