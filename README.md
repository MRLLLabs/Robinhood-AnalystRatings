# Robinhood-AnalystRatings

### Installing Dependencies

From within the root directory:

```sh
npm install
```

---

## API reference

Status Code | Status | Description
---|---|---
200 | OK | Everything worked as expected.
400 | Bad Request	| The request was unacceptable, often due to missing a required parameter.
401 | Unauthorized | No valid API key provided.
402 | Request Failed | The parameters were valid but the request failed.
403 | Forbidden	| The API key doesn't have permissions to perform the request.
404 | Not Found	| The requested resource doesn't exist.
409 | Conflict | The request conflicts with another request (perhaps due to using the same idempotent key).
429 | Too Many Requests	| Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
500, 502, 503, 504 | Server Errors | Something went wrong on our end
  

### Endpoints

__Ratings__
```
GET /api/ratings/
```
__Request for a specific stock according to 'symbol'__
```
GET /api/stocks/:symbol/ratings
```
_Response object_
```json
{
  "id": 1,
  "analyst_id": "44",
  "stock_symbol": "JDFEBJ",
  "rating": "sell",
  "rating_date": "2019-10-20T15:14:46.895Z" }
},
```
__Add a stock rating__
```
POST /api/stocks/:symbol/ratings
```
__Change a stock rating__
```
PUT /api/stocks/:symbol/ratings
```
__Remove a stock rating__
```
DELETE /api/stocks/:symbol/ratings
```
