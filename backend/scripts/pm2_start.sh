yarn install --frozen-lockfile
yarn build
yarn migrate
pm2 start ./dist/src/main --name "climbjios-backend-${NODE_ENV}" -i 2 --wait-ready
