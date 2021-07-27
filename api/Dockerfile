# Adapted from:
# https://github.com/spring-guides/top-spring-boot-docker

FROM openjdk:11-slim as build
WORKDIR /app

# Copy source files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Install Maven dependencies
RUN chmod +x mvnw
RUN ./mvnw install

# Extract jar
WORKDIR /app/target/dependency
RUN jar -xf ../*.jar

FROM openjdk:11-jre-slim as runtime

# Create user and group (avoid running as root)
RUN addgroup app_group && adduser app_user --ingroup app_group
USER app_user

# Copy extracted jar as separate layers (optimization)
ARG DEPENDENCY=/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

EXPOSE 8080

ENTRYPOINT ["java","-cp","app:app/lib/*","com.ikenley.templatejavaapp.TemplatejavaappApplication"]