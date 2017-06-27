FROM mhart/alpine-node:6.7.0

### DEPENDENCIES ###

RUN apk add --update \
  # For practical reasons
  bash \
  rsync \
  # For generating graphical visualization of graphql schema
  graphviz ttf-ubuntu-font-family && \
  # Use yarn instead of npm
  npm install -g yarn

### PREPARE ###

# Environment variables needed for building the image
ENV serviceName=graphql
ENV \
  SRC_DIR=/app/$serviceName/src \
  RUN_DIR=/app/$serviceName/runtime \
  # Include node_modules/.bin in PATH for not having to prefix commands
  PATH=$PATH:/app/$serviceName/src/node_modules/.bin

RUN mkdir -p \
  # Source files
  $SRC_DIR \

  # Compiled version of the app
  $RUN_DIR

# Make node_modules available to runtime environment
RUN ln -s $SRC_DIR/node_modules $RUN_DIR/ && \
    ln -s $SRC_DIR/package.json $RUN_DIR/ && \
    ln -s $SRC_DIR/yarn.lock $RUN_DIR/


### BUILD ###

WORKDIR $SRC_DIR

# Install packages
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean

# Copy rest of source files
COPY . .

# Compile app with babel
RUN babel -D -q --ignore node_modules -d $RUN_DIR .

### RUNTIME ###

WORKDIR $RUN_DIR

# Generate GraphQL schema.json
RUN devops/generate-schema.js

# Environment variables needed for running the service
ENV \
  # AWS credentials for devops user
  AWS_REGION=eu-west-1 \
  AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY> \
  AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
  DK_ADMIN_URL=http://localhost/admin \
  DK_AUTH_URL=http://localhost/auth \
  DK_KRR_URL=http://localhost/krr \
  EMAIL_REDIRECT= \
  ENV_NAME=production \
  ENV_TYPE=production \
  JWT_SECRET=secret \
  LOG_LEVEL=info \
  PG_HOST=postgres \
  PG_PASS=secret \
  PG_USER=postgres \
  PG_DB= \
  PORT=80 \
  SENDGRID_API_KEY=<SENDGRID_API_KEY> \
  TIME_ZONE=GMT+1 \
  TIME_ZONE_ID=Europe/Oslo

EXPOSE $PORT

CMD ["devops/start"]
