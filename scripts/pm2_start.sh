yarn install --frozen-lockfile --production=false
yarn build
yarn migrate
# yarn seed # run this with caution to prevent wiping tables with seeds
pm2 start ./dist/src/main.js --name "climbjios-backend-${NODE_ENV}" -i 2 --wait-ready
