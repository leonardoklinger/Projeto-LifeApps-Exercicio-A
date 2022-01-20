import Cookie from "js-cookie"
import jwt from 'jsonwebtoken'
export default {
    auth(to, from, next) {
        const token = Cookie.get('token')
        if (!token) {
            next('/login')
        } else {
            jwt.verify(token, "senha", (err) => {
                if (err == null) {
                    next()
                }
            })
        }
    },
}