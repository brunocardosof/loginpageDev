require('./database')

const app = require('./app')
const port = 5000
const msg = `Api Started on port ${port}`

app.listen(5000, () => {
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})