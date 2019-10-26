const passport = require("passport")
const passportJwt = require("passport-jwt")
const { Strategy, ExtractJwt } = passportJwt

const { User } = require("../models")
const { authSecret } = require("../../../.env")

module.exports = async (req, res, next) => {
  let jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  jwtOptions.secretOrKey = authSecret

  const strategy = new Strategy(jwtOptions, (payload, done) => {
    let user = User.findOne({ where: payload.id })

    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })

  passport.use(strategy)

  return {
    authenticate: () => passport.authenticate("jwt", { session: false })
  }
}
