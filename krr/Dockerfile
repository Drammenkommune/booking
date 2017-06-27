FROM java:8

# Install maven
RUN apt-get update
RUN apt-get install -y maven
RUN apt-get install openssl

WORKDIR /code

# Adding source
ADD src /code/src

# Prepare by downloading dependencies
ADD pom.xml /code/pom.xml
RUN ["mvn", "clean"]
# RUN ["mvn", "dependency:resolve"]
# RUN ["mvn", "verify"]

# Compile and package into a fat jar
RUN ["mvn", "package"]

# Environment variables needed for running the service
ENV \
  SOAP_ENDPOINT=http://localhost/auth/updateRequest \
  PORT=80 \
  ON_BEHALF_OF_ID=<ORG_NR>

EXPOSE $PORT
CMD ["/usr/lib/jvm/java-8-openjdk-amd64/bin/java", "-jar", "target/oppslagstjenesten-client-sample-5-SNAPSHOT-executable.jar"]
