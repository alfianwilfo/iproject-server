## Endpoints

List of Available Endpoints:

- `POST /users/login`
- `POST /users/register`

- `GET /corona/countries`
- `GET /corona/statistics
- `GET /corona/history
- `GET /payments
- `patch /payments

### POST /users/login

#### Description

- Login for user

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    {
    "access_token": String,
    "email": String
  }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

### POST /users/register

#### Description

- Register for user

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "username": String,
    "password": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    {
    "id": Integer,
    "email": String
  }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
