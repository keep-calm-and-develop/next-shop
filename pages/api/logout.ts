import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';

async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
    res.status(200)
        .setHeader('Set-Cookie', cookie.serialize('jwt', '', {
            path: '/api',
            expires: new Date(0),
        }))
        .json({});
}

export default handleLogout;
