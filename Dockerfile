FROM orochinetwork/node:latest AS builder
ARG USER=node
ENV HOME=/home/${USER}
WORKDIR ${HOME}/app/
COPY . .
RUN --mount=type=secret,id=npm_token \
    echo "//registry.npmjs.org/:_authToken=$(cat /run/secrets/npm_token || '')" > ~/.npmrc && \
		yarn install && yarn build && yarn install --production --frozen-lockfile

FROM orochinetwork/node:latest AS runner
ARG USER=node
ENV HOME=/home/${USER}
WORKDIR ${HOME}/app/
COPY --from=builder --chown=node:node ${HOME}/app/.next ./.next
COPY --from=builder --chown=node:node ${HOME}/app/package.json ./package.json
COPY --from=builder --chown=node:node ${HOME}/app/node_modules ./node_modules 
COPY --from=builder --chown=node:node ${HOME}/app/next.config.mjs ./next.config.mjs 
COPY --from=builder --chown=node:node ${HOME}/app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder --chown=node:node ${HOME}/app/public ./public
COPY --from=builder --chown=node:node ${HOME}/app/.env ./.env
ENTRYPOINT [ "yarn", "start" ]