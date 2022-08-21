const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            // { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            // `${api}/users/login`,
            // `${api}/users/register`
            { url: /(.*)/ }
        ]
    })
}

async function isRevoked(req, token) {
    // token now contains payload data
    // console.log(token);

    if (!token.payload.isAdmin) {
        // if the isAdmin flag in payload is false, then we reject the token
        return true;
    }
    return false;
}

module.exports = authJwt;