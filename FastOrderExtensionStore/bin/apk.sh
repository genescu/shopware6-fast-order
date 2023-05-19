apk add --update nodejs npm
export NODE_OPTIONS=--openssl-legacy-provider
npm install --ignore-scripts puppeteer
export PUPPETEER_SKIP_DOWNLOAD='true'

#npm init @eslint/config
#npm install -g @vue/cli
