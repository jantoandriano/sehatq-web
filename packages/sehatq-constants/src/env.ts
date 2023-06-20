const BASE_ENV = {
  ACCOUNT_DOMAIN: "https://account.sehatq.com",
  API: "https://api.sehatq.com/v1",
  API_V2: "https://api.sehatq.com/v2",
  APPSTORE_URL: "https://apps.apple.com/id/app/sehatq/id1473822420",
  AWS_S3_CACHE_ACCESS_KEY: "AKIAZ5343FXYYYKXYST7",
  AWS_S3_CACHE_BUCKET: "sehatq-monorepo-cache",
  AWS_S3_CACHE_REGION: "ap-southeast-3",
  AWS_S3_CACHE_SECRET_KEY: "PYZbmH19TjI9LUJQiFOXX4sXb3OdD6PNPWDk9Gi4",
  CLOUDFLARE_BASE_URL:
    "https://api.cloudflare.com/client/v4/zones/5a75cdfea0d70e077aedc2870492be10",
  CLOUDFLARE_TOKEN: "E7AFUT5Yo0U8lui6bWbyCfzX4G2m10ODirxd8T5D",
  FB_ID: "698840740537290",
  FBDOMAIN_VERIFICATION: "vi5tczbpheh443fgn9kdeqxqf113pr",
  FIREBASE: {
    API_KEY: "AIzaSyBR47LJTQK818bgGsTa7QoHi4MQ_y6mwys",
    APP_ID: "1:662016403610:web:2a30ae7f8ddb4a4ac99723",
    AUTH_DOMAIN: "sehatq-revamp.firebaseapp.com",
    DATABASE_URL: "https://sehatq-revamp.firebaseio.com",
    MEASUREMENT_ID: "G-48Q0791L3G",
    MESSAGING_SENDER_ID: "662016403610",
    PROJECT_ID: "sehatq-revamp",
    STORAGE_BUCKET: "sehatq-revamp.appspot.com",
    VAPID_KEY:
      "BHFCsER28A_T9aGnEYj43DxWjrkDDe-kZUepNzTg9Ih3j4yc-SDRUyfkzDgmRC42WyQ-u5ieO3oycCJvpe7xbnI",
  },
  GA_AMP_ID: "UA-129301594-6",
  GA_ID: "UA-129301594-1",
  GMAPS_API_KEY: "AIzaSyBIqnEaqde4U37SVcEfZrddJSj3YKojQa4",
  GSITE_VERIFICATION: "aEPAoL-Qn2duMeIEyF6aFoIGbx7DVOVX3LvaVn3FCTs",
  GTM_AMP_ID: "GTM-WQQMFK3",
  GTM_AUTH: "U1mED3s1RZ2o_66_jwC1WQ",
  GTM_ID: "GTM-WH7XKQX",
  GTM_PREVIEW: "env-2",
  ISR_REDIS_DB: 6,
  LOCAL_OLD_SEHATQ_DOMAIN: "http://web-react-prod.web-production:8010",
  LOCAL_PHP_SEHATQ_DOMAIN: "http://10.150.2.15",
  LOCAL_REDIS_HOST: "redis-fe.sehatq.prod",
  MIDTRANS_CLIENT_KEY: "Mid-client-uKSSsqJwCafqX5Uq",
  NEWRELIC_NAME: "SehatQ Web Monorepo Production",
  OLD_SEHATQ_DOMAIN: "https://old.sehatq.com",
  PAYMENTQ_STATIC_URL:
    "https://static-sanity.sehatq.com/paymentq-cdnassets/rc/public",
  PLAYSTORE_URL: "https://play.google.com/store/apps/details?id=com.she.sehatq",
  REDIS_DB: 0,
  REDIS_HOST: "redis-fe-prod-001.apwqif.0001.apse3.cache.amazonaws.com",
  REDIS_PORT: 6379,
  SEHATQ_DOMAIN: "https://www.sehatq.com",
  SEHATQ_LOCAL_ASSET_PATH: "/monorepo-cdnassets/prod/public",
  SEHATQ_SENDBIRD_APP_ID: "62D0AF64-50FD-4E93-9FC4-29B189DD8A80",
  STATIC_ASSET_DOMAIN: "https://static.sehatq.com",
  TOKOQ_DOMAIN: "https://toko.sehatq.com",
  USER_SERVICE_TOKEN:
    "dXNlcnNlcnZpY2Vwcm9kdWN0aW9uOnVzZXJzZXJ2aWNlcHJvZHVjdGlvbg==",
};

const PRODUCTION = { ...BASE_ENV, ENVIRONMENT: "PRODUCTION" };

const RC = {
  ...BASE_ENV,
  ACCOUNT_DOMAIN: "https://account-rc.sehatq.com",
  API: "https://api-sanity.sehatq.com/v1",
  API_V2: "https://api-sanity.sehatq.com/v2",
  ENVIRONMENT: "RC",
  GMAPS_API_KEY: "AIzaSyBIqnEaqde4U37SVcEfZrddJSj3YKojQa4",
  GTM_AUTH: "aw5Y5ohc5nHerC9W2674oA",
  GTM_PREVIEW: "env-460",
  LOCAL_OLD_SEHATQ_DOMAIN: "http://web-react-rc.sanity:8011",
  LOCAL_PHP_SEHATQ_DOMAIN: "http://10.250.1.114",
  NEWRELIC_NAME: "SehatQ Web Monorepo RC",
  OLD_SEHATQ_DOMAIN: "https://old-rc.sehatq.com",
  PAYMENTQ_STATIC_URL:
    "https://static-sanity.sehatq.com/paymentq-cdnassets-sanity/sanity/public",
  SEHATQ_DOMAIN: "https://sanity.sehatq.com",
  SEHATQ_LOCAL_ASSET_PATH: "/monorepo-cdnassets/rc/public",
  STATIC_ASSET_DOMAIN: "https://static-sanity.sehatq.com",
  TOKOQ_DOMAIN: "https://toko-rc.sehatq.com",
  USER_SERVICE_TOKEN: "dXNlcnNlcnZpY2VzYW5pdHk6dXNlcnNlcnZpY2VzYW5pdHk=",
};

const SANITY = {
  ...RC,
  ACCOUNT_DOMAIN: "https://account-sanity.sehatq.com",
  ENVIRONMENT: "SANITY",
  LOCAL_OLD_SEHATQ_DOMAIN: "http://old-sanity.sehatq.dev",
  NEWRELIC_NAME: "SehatQ Web Monorepo Sanity",
  OLD_SEHATQ_DOMAIN: "https://old-sanity.sehatq.com",
  SEHATQ_LOCAL_ASSET_PATH: "/monorepo-cdnassets-sanity/sanity/public",
  TOKOQ_DOMAIN: "https://toko-sanity.sehatq.com",
};

const DEV = {
  ...BASE_ENV,
  ACCOUNT_DOMAIN: "https://account-dev.sehatq.com",
  API: "https://api-dev.sehatq.com/v1",
  API_V2: "https://api-dev.sehatq.com/v2",
  ENVIRONMENT: "DEV",
  GMAPS_API_KEY: "AIzaSyCDoibO2sprWEEvkVrxYdz9s4AzIMvE8pw",
  GTM_AUTH: "aw5Y5ohc5nHerC9W2674oA",
  GTM_PREVIEW: "env-460",
  ISR_REDIS_DB: 2,
  LOCAL_OLD_SEHATQ_DOMAIN: "http://old-dev.sehatq.dev",
  LOCAL_PHP_SEHATQ_DOMAIN: "http://10.250.4.61:8222",
  LOCAL_REDIS_HOST: "redis.sehatq.dev",
  MIDTRANS_CLIENT_KEY: "SB-Mid-client-f9UdUoJAZjKLBcsV",
  NEWRELIC_NAME: "SehatQ Web Monorepo Dev",
  OLD_SEHATQ_DOMAIN: "https://old-dev.sehatq.com",
  PAYMENTQ_STATIC_URL:
    "https://static-dev.sehatq.com/paymentq-cdnassets-dev/dev/public",
  REDIS_DB: 8,
  REDIS_HOST: "redis-dev.apwqif.0001.apse3.cache.amazonaws.com",
  SEHATQ_DOMAIN: "https://dev.sehatq.com",
  SEHATQ_LOCAL_ASSET_PATH: "/monorepo-cdnassets-dev/dev/public",
  SEHATQ_SENDBIRD_APP_ID: "568BA7B1-36BB-465D-873C-F343699B80DB",
  STATIC_ASSET_DOMAIN: "https://static-dev.sehatq.com",
  TOKOQ_DOMAIN: "https://toko-dev.sehatq.com",
  USER_SERVICE_TOKEN: "dXNlcnNlcnZpY2U6dXNlcnNlcnZpY2U=",
};

const ENVS = {
  DEV,
  PRODUCTION,
  RC,
  SANITY,
};

export const ENV =
  process.env.HOST === "PRODUCTION" ||
  process.env.HOST === "RC" ||
  process.env.HOST === "SANITY" ||
  process.env.HOST === "DEV"
    ? ENVS[process.env.HOST]
    : ENVS.DEV;
