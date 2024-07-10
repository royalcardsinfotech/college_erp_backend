
FROM node:18 as build

WORKDIR /build

COPY package*.json .
RUN npm install

COPY src/ src/
COPY views/ views/

COPY tsconfig.json tsconfig.json
COPY .env .env

RUN npm run build



FROM node:18 as runner

WORKDIR /app

COPY --from=build build/package*.json .
COPY --from=build build/dist/ dist/
COPY --from=build build/views/ views/
COPY --from=build build/.env .env
COPY --from=build build/src/ src/
COPY --from=build build/node_modules/ node_modules/

CMD ["node", "dist/index.js"]


