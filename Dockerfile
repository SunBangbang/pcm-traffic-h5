# ===
# build stage
# ===
FROM tarampampam/node:13-alpine as build-stage


# build:test needs python
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add g++ make python

WORKDIR /app

COPY package*.json ./
RUN npm install --registry https://registry.npm.taobao.org/

COPY . .

RUN npm run build

# ===
# production stage
# ===
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist/dev/h5 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/jvjr-env.json /
COPY --from=build-stage /app/jvjr-entrypoint.sh /
RUN chmod +x /jvjr-entrypoint.sh

ENTRYPOINT [ "/jvjr-entrypoint.sh", "/usr/share/nginx/html/static/js", "index" ]

CMD ["nginx", "-g", "daemon off;"]
