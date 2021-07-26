# template-java-app

A template Java project to be used to quickly scaffold Spring Boot applications.

See it live at [templatejavaapp.ikenley.com](https://templatejavaapp.ikenley.com/)

Forked from [template-application](https://github.com/ikenley/template-application)
Hosted on [template-infrastructure](https://github.com/ikenley/template-infrastructure)

---

## Architecture

This app uses:

- create-react-app on NGINX for the SPA React front-end
- Spring Boot as a Java-based API backend
- Docker containers for both the front-end and API instances, hosted on ECS Fargate
- PostgreSQL on AWS RDS for the data persist layer
- AWS for most of the hosting and management, including:
  - A CodePipeline/CodeBuild CI/CD deployment pipeline
  - SSM Parameter Store for secrets management
  - CloudWatch for logging
