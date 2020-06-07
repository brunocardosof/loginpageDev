const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret')

module.exports = {
    async usuarioChangeEmailValidate(req, res) {
        const token = req.params.jwt
            // const token = 'eyJhbGciOiJIUzI1NiJ9.YnJ1bm8uYml0YnVja2V0QGdtYWlsLmNvbQ.DrpuWUJrJPnespebH7AMAbAajEqQSSLBNvXXa5X7ZI1'
        jwt.verify(token, authSecret, async(error, email) => {
            if (error) {
                return res.status(401).json(false)
            } else {
                return res.status(201).json(true)
            }
        });

    }
}