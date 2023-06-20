FROM node:16.12.0-alpine as builder
ARG SCOPE=sehatq
ENV TZ=Asia/Jakarta
RUN apk update
# set working directory
WORKDIR /app

RUN yarn global add turbo@1.1.0
COPY . .
RUN turbo prune --docker --scope=${SCOPE}

# install node modules
FROM node:16.12.0-alpine as installer
RUN apk update
# set working directory
WORKDIR /app

COPY --from=builder /app/out/json .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --no-progress

# Compile assets
FROM node:16.12.0-alpine
ARG SCOPE=sehatq
ARG BUILD_CMD

RUN apk update
# set wirking directory
WORKDIR /app
ENV TZ=Asia/Jakarta
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .

COPY turbo.json turbo.json
COPY .gitignore .gitignore
ADD .env /app/apps/${SCOPE}/.env

RUN yarn gen:theme-typings
RUN yarn ${BUILD_CMD}

WORKDIR /app/apps/${SCOPE}

ENV PORT=3000
EXPOSE 3000

CMD [ "yarn", "start" ]
