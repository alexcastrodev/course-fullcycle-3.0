FROM golang:1.20.5-alpine AS builder

WORKDIR /app

COPY . .

RUN go build -o /app/main hello.go

FROM scratch
COPY --from=builder /app/main /fc_golang
CMD ["/fc_golang"]