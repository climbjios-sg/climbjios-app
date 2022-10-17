yarn install --frozen-lockfile --production=false
yarn build

# Note: this is not a good way to do a rolling deployment, as db is updated first before
# any instance is ready to use the new schema. Also, there is no rollback if migration fails,
# or rolling deployment fails. We will handle any errors manually for now.
yarn migrate
pm2 reload "climbjios-backend-${NODE_ENV}"
