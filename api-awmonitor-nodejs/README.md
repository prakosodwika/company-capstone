# Endpoint

## Register

- URL
  - /registrasi
- Method
  - POST
- Request Body
  - name = string
  - email = string (must be unique)
  - password = string
- Response

  ```json
  {
    "message": "Registrasi Success"
  }
  ```

## Login

- URL
  - /login
- Method
  - POST
- Request Body
  - email = string (must be unique)
  - password = string
- Response

  ```json
  {
    "message": "Login Success",
    "data": {
      "id": 27,
      "name": "arale",
      "email": "arale@gmail.com"
    }
  }
  ```

## Input Data History

- URL
  - /input
- Method
  - POST
- Request Body
  - location = string
  - date = datetime
  - aqi = double
  - o3 = double
  - so2 = double
  - no2 = double
  - co = double
  - pm10 = double
  - pm25 = double
  - temperature = double
  - humidity = double
  - wind_speed = double
- Response

  ```json
  {
    "message": "Input Success",
    "data": {
      "id": 248,
      "location": "kuta",
      "date": "2022-05-22T00:00:00.000Z",
      "aqi": "20",
      "o3": "12.517",
      "so2": "0.745058",
      "no2": "2.52761",
      "co": "0.745058",
      "pm10": "8.64493",
      "pm25": "4.82701",
      "temperature": "24.6",
      "humidity": "85.5625",
      "wind_speed": "3.63511",
      "updatedAt": "2022-06-10T08:08:38.387Z",
      "createdAt": "2022-06-10T08:08:38.387Z"
    }
  }
  ```
