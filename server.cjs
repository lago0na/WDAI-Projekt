const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Bindowanie bazy danych do routera (wymagane przez json-server-auth)
server.db = router.db

server.use(middlewares)

// Najpierw auth, potem router!
server.use(auth)
server.use(router)

server.listen(3000, () => {
    console.log('JSON Server + Auth is running on port 3000')
})