import { NextApiRequest, NextApiResponse } from 'next'
import { SignIn } from '../../lib/sign-in';
import cookie from 'cookie';

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const { email, password } = req.body;
    try {
        const { jwt, user } = await SignIn(email, password);
        res.status(200)
        .setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
            path: '/api',
            httpOnly: true,
        }))
        .json({
            user: {
                id: user.id,
                name: user.username,
            }
        });
    } catch (error) {
        res.status(401).end();
    }
}

export default handleLogin;
