# Giai đoạn build
FROM node:16-alpine as build

ARG NEXT_PUBLIC_BACKEND_API_URL
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL

ARG NEXT_PUBLIC_BACKEND_WS
ENV NEXT_PUBLIC_BACKEND_WS=$NEXT_PUBLIC_BACKEND_WS

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

COPY . .
RUN yarn build

# Giai đoạn production
FROM node:16-alpine as production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

ENV NODE_ENV=production

ARG NEXT_PUBLIC_BACKEND_API_URL
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL

ARG NEXT_PUBLIC_BACKEND_WS
ENV NEXT_PUBLIC_BACKEND_WS=$NEXT_PUBLIC_BACKEND_WS

EXPOSE 3000

CMD ["yarn", "start"]