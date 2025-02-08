import cors from '@elysiajs/cors';
import dayjs from 'dayjs';
import { Elysia } from 'elysia';
import { routesCore } from './routes';

const port = process.env.PORT || 3009;

export const app = new Elysia({
    serve: {
        hostname: process.env.HOST || 'localhost',
        maxRequestBodySize: 1024 * 1024 * 256, // 256MB
    },
})
    .use(
        cors({
            origin: '*',
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        })
    )
    .onError(({ code, error }) => {
        console.log(code, error);
        if (code === 'PARSE') {
            return new Response(JSON.stringify({ error: 'Invalid JSON', message: 'Invalid body input' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    })
    .on('request', (context) => {
        const host = context.request.headers.get('x-forwarded-for') || context.request.headers.get('host');
        console.info(`${dayjs().toString()} | ${context.request.method} ${context.request.url} | HOST: ${host}`);
    })
    .use(routesCore);

app.listen(port, () => {
    console.log(`Server is running on ${app.server?.hostname}:${app.server?.port}`);
});
