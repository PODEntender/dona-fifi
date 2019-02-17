const axios = require('axios')
const moment = require('moment');

const http = axios.create({
  transformResponse: [],
  responseType: 'text',
});

http.get('https://twitter.com/podentender')
.then((res) => {
  const $ = require('cheerio').load(res.data);

  const toInt = (input) => parseInt(input.html().trim().replace('.', '').replace(',', ''));

  const tweets = toInt($('a[data-nav="tweets"] [data-count]'));
  const followers = toInt($('a[data-nav="followers"] [data-count]'))
  const following = toInt($('a[data-nav="following"] [data-count]'))
  const date = moment().format('YYYY-MM-DD');

  console.log(`"Twitter;"${date}","${followers}";"${following}";"${tweets}"`);
});

