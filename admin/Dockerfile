FROM mhart/alpine-node:6.7.0

### DEPENDENCIES ###

RUN apk add --update bash rsync && \
    npm install -g yarn

### PREPARE ###

ENV serviceName=admin
ENV \
  SRC_DIR=/app/$serviceName/src \
  RUN_DIR=/app/$serviceName/runtime \
  PATH=$PATH:/app/$serviceName/src/node_modules/.bin

RUN mkdir -p $SRC_DIR $RUN_DIR

# Make node_modules available to runtime environment
RUN ln -s $SRC_DIR/node_modules $RUN_DIR && \
    ln -s $SRC_DIR/package.json $RUN_DIR && \
    ln -s $SRC_DIR/yarn.lock $RUN_DIR && \
    ln -s $SRC_DIR/devops $RUN_DIR

### BUILD ###

WORKDIR $SRC_DIR

# Install npm packages
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean

# Copy the rest of the source files
COPY . .

# Copy server to runtime
COPY ./server/ $RUN_DIR/server/

# Compile React app using production config
RUN webpack --progress --config server/config/webpack.production.js


### RUNTIME ###

WORKDIR $RUN_DIR

ENV \
  ENV_TYPE=production \
  MOUNT_PATH=/admin/ \
  PORT=80

EXPOSE $PORT

CMD ["devops/start"]
