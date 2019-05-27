FROM mhart/alpine-node:11 AS builder
WORKDIR /app
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["npm", "install"]
CMD ["serve", "-p", "3000", "-s", "."]
