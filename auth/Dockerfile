FROM mhart/alpine-node:6.7.0

### DEPENDENCIES ###

RUN apk add --update \
  bash git && \
  # Use yarn instead of npm
  npm install -g yarn

RUN apk add openssl

### PREPARE ###

# Environment variables needed for building the image
ENV serviceName=auth
ENV \
  SRC_DIR=/app/$serviceName/src \
  RUN_DIR=/app/$serviceName/runtime \
  CERT_DIR=/app/$serviceName/runtime/certs \
  # Include node_modules/.bin in PATH for not having to prefix commands
  PATH=$PATH:/app/$serviceName/src/node_modules/.bin

RUN mkdir -p \
  # Source files
  $SRC_DIR \

  # Compiled version of the app
  $RUN_DIR \

  # Certificates for the app
  $CERT_DIR

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

# Environment variables needed for running the service
ENV \
  DK_PUBLIC_URL=http://localhost/ \
  ENV_NAME=production \
  ENV_TYPE=production \
  LOG_LEVEL=info \
  PG_HOST=postgres \
  PG_PASS=secret \
  PG_USER=postgres \
  PG_DB= \
  PORT=80 \
  JWT_SECRET=secret \
  TIME_ZONE=GMT+1 \
  DEMO_ARTIFACT=save-answer-runagate \
  DEMO_USER_ID=1 \
  ASSERT_ENDPOINT=https://drammen-booking-demo.skalar.io/auth/assert \
  SSO_LOGIN_URL=https://idporten-ver1.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp3 \
  SSO_LOGOUT_URL=https://idporten-ver1.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp3 \
  IDP_PERSON_INFO_URL=https://idporten-ver1.difi.no/opensso/ArtifactResolver/metaAlias/norge.no/idp3 \
  KRR_WSDL=http://begrep.difi.no/Oppslagstjenesten/xsd/oppslagstjeneste-ws-16-02.wsdl \
  PERSON_INFO_URL=https://kontaktinfo-ws-ver1.difi.no/kontaktinfo-external/ws-v5/ \
  ON_BEHALF_OF_ID=<ORG_ID> \
  SP_ENTITY_ID=booking-demo.dk.skalar.io \
  IDP_CERT=<CERTIFICATE>
EXPOSE $PORT

CMD ["devops/start"]
