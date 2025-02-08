# woo-app

Developed during the AEC Hackathon, [Zurich 2025](https://opensource.construction/events/aec-hackathon-zurich-2025/) ([ZHAW](https://www.zhaw.ch/de/archbau), Winterthur).

## Windows of Opportunity

Windows of Opportunity (WOO) transforms your old windows into cost-effective, high-performance, low-CO₂ windows. For more details visit our website, [windowsofopportunities.ch](https://windowsofopportunities.ch/).

The technical elements are detailed below.

## Front-end

The front-end is written in TypeScript, using a combination of React with the  [Ant Design](https://ant.design/) component library for the user interface.

The website can be found at [TODO]()

```
// TODO
```

## Back-end

The backend uses [Bun](https://bun.sh/), JavaScript runtime, package manager, test runner and bundler. [Supabase](https://supabase.com/) holds the application, database ([postgres](https://www.postgresql.org/docs/current/index.html)) and S3 bucket. hosted with bun, [Render](https://render.com/) for the backend. [Elysia](https://elysiajs.com/) is used as an alternative to Express and Node.js.

### Development

```
bun i
bun dev
```

### Deployment

TODO