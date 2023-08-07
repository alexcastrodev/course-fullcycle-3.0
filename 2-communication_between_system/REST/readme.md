# Rest

- Many developers "already know how to work with REST."
- Representational State Transfer
- It emerged in 2000 from Roy Fielding's doctoral dissertation.
- Simplicity
- Statelessness
- Cacheability

# Richardson Maturity Model

- Level 0: The Swamp of POX
- Level 1: Resources
- Level 2: HTTP Verbs
- Level 3: Hypermedia Controls

REST: Hal, Siren, JSON API, Collection+JSON 

Rest: HAL

Media type = application/hal+json

```json
{
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/v1/employees"
        },
        "next": {
            "href": "http://localhost:8080/api/v1/employees?page=2"
        }
    },
    "_embedded": {
        "employees": [
            {
                "id": 1,
                "firstName": "Bilbo",
                "lastName": "Baggins",
                "email": "",
                "phone": "111-222-333"
            },
            {
                "id": 2,
                "firstName": "Frodo",
                "lastName": "Baggins",
                "email": "
                "phone": "111-222-444"
            }
        ]
    },
    "page": {
        "size": 2,
        "totalElements": 4,
        "totalPages": 2,
        "number": 1
    }
}  
```

# REST: HTTP Method negotiation

The HTTP has the method OPTIONS that can be used to negotiate the method to be used.

# REST: HTTP Content negotiation

The HTTP has the header Accept that can be used to negotiate the content type to be used.

GET /api/v1/employees HTTP/1.1
ACCEPT: application/json

response can be:
HTTP/1.1 406 Not Acceptable

or if the server can handle the request:
HTTP/1.1 200 OK
Content-Type: application/json

# REST: Content Negotiation

POST /products HTTP/1.1
Content-Type: application/json
Accept: application/json

{
    "name": "Product 1",
    "price": 10.00
}

If server cannot accept content type, it should return 415 Unsupported Media Type

HTTP/1.1 415 Unsupported Media Type
