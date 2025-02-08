FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

ENV NODE_ENV production

RUN bun run build

EXPOSE 3009

CMD ["bun","start"]