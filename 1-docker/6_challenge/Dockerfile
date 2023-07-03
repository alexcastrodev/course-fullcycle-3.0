FROM golang:1.20.5-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod init fc_golang

RUN go build -o main

FROM scratch
WORKDIR /app
COPY --from=builder /app .
CMD ["./main"]