# woo-app

Developed during the AEC Hackathon, [Zurich 2025](https://opensource.construction/events/aec-hackathon-zurich-2025/) ([ZHAW](https://www.zhaw.ch/de/archbau), Winterthur).

## Windows of Opportunity

Windows of Opportunity (WOO) transforms your old windows into cost-effective, high-performance, low-CO₂ windows. For more details visit our website, [windowsofopportunities.ch](https://windowsofopportunities.ch/).

The technical elements are detailed below.

## Front-end

The front-end is written in TypeScript, using a combination of React with the  [Ant Design](https://ant.design/) component library for the user interface.

The website can be found at [TODO]()

``` sh
npm run dev
// or
npm run build
```

## Back-end

The backend uses [Bun](https://bun.sh/), JavaScript runtime, package manager, test runner and bundler. [Supabase](https://supabase.com/) holds the application, database ([postgres](https://www.postgresql.org/docs/current/index.html)) and S3 bucket. hosted with bun, [Render](https://render.com/) for the backend. [Elysia](https://elysiajs.com/) is used as an alternative to Express and Node.js.

### Development

``` sh
bun i

bun dev
\\ or
bun build
```

### Deployment

TODO


### Search Algorithm 
PlainText_fromMatlabScript. txt is the text file located within Search Algorithm folder that is a plain text explanation of the matlab search algorithm code. The matlab code used for the window algorithm scoring is found under WindowAlgorithmCode.m. The matlab code was further interpreted into nodetypescript and used for the interface calculation.
