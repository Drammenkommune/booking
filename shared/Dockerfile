FROM mhart/alpine-node:6.7.0

RUN apk add --update bash && \
    npm install -g yarn

ENV \
  SRC_DIR=/app/shared/src \
  PATH=$PATH:/app/shared/src/node_modules/.bin

RUN mkdir -p \
  # Source files
  $SRC_DIR \

WORKDIR $SRC_DIR

# Install npm packages
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean

# Copy the rest of the source files
COPY . .

# Wait
CMD ["npm", "run", "wait"]
