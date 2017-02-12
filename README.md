# Sample express api

##### Features:
* docker (https://www.docker.com/)
* eslint-config-airbnb linting. (https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
* passport.js authorization (JWT)  (http://passportjs.org/)
* swagger documentation (http://swagger.io/)
* jest tests
* winston logger

### Installation

Must have docker installed.

Clone the repository and run the following commands under your project root:

Initialize containers:

```shell
docker build -t express-sample-api .
docker run -p 27017:27017 --name mongo TZ=Europe/Belgrade -d mongo:latest
docker run -p 3000:3000 -p 80:80 -v $(pwd):/usr/src --name express-sample-api -e TZ=Europe/Belgrade -e EXPRESS_SAMPLE_JWT_SECRET=jwtsecret -e NODE_ENV=development -e EXPRESS_SAMPLE_DB_URL=mongodb://172.17.0.1:27017 -e EXPRESS_SAMPLE_DB_NAME=express-sample-api -e EXPRESS_SAMPLE_TEST_DB_NAME=test -it express-sample-api bash
```

###### Server

If containers allready initialized:
```
docker start mongo express-sample-api
```

Connect to container:
```
docker exec -it express-sample-api bash
```
