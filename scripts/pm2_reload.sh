#!/bin/bash

APPLICATION=$1

BACKEND="backend"
CRONJOB="cronjob"

if [[ "$APPLICATION" != "$BACKEND" ]] && [[ "$APPLICATION" != "$CRONJOB" ]]; then
    echo "APPLICATION must be one of '$BACKEND' | '$CRONJOB'"
    exit 1
fi

yarn install --frozen-lockfile --production=true

if [[ "$APPLICATION" == "$BACKEND" ]]; then
    # Note: this is not a good way to do a rolling deployment, as db is updated first before
    # any instance is ready to use the new schema. Also, there is no rollback if migration fails,
    # or rolling deployment fails. We will handle any errors manually for now.
    yarn migrate

    pm2 reload "climbjios-backend-${NODE_ENV}"
elif [[ "$APPLICATION" == "$CRONJOB" ]]; then
    pm2 reload "climbjios-cronjob-${NODE_ENV}"
fi
