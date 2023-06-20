# Storybook Deployment

## Installing Dependencies

```sh
$ yarn
```

## Build Storybook

```sh
$ yarn build:docs # production

# or

$ yarn build:docs-sanity # sanity

# or

$ yarn build:docs-dev # dev
```

Storybook will create a static web application in `./packages/sehatq-components/sb-dist`.

## Run Storybook

Preview it locally by running the following command:

```sh
$ npx http-server ./packages/sehatq-components/sb-dist
```

or publish it to AWS S3.

## Test Storybook

After preview it locally, run the following command:

```sh
yarn test && yarn test:get-lcov
```

It will create an html report in `./packages/sehatq-components/coverage/storybook/lcov-report`.
