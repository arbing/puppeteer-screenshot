FROM arbing/puppeteer

WORKDIR /app

COPY . /app

RUN yarn install

RUN chown -R pptruser:pptruser ./node_modules

ENV PORT 8555

EXPOSE  8555

CMD ["pm2-runtime", "pm2.json"]
