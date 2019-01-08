FROM arbing/puppeteer

WORKDIR /app

COPY . /app

RUN yarn install

ENV PORT 8555

EXPOSE  8555

CMD ["pm2-runtime", "pm2.json"]
