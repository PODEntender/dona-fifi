const axios = require('axios');
const moment = require('moment');

const http = axios.create({
  transformResponse: [],
  responseType: 'text',
});

http.get('https://instagram.com/podentender')
.then(function (res) {
  const $ = require('cheerio').load(res.data);
  const script = $('script[type="text/javascript"]:not([src])')
    .filter(function (idx, element) {
      return element.children[0].data.indexOf('window._sharedData') > -1;
    });

  const window = {};
  eval(script.html());

  const user = window._sharedData.entry_data.ProfilePage[0].graphql.user;

  const date = moment().format('YYYY-MM-DD');
  console.log(
    '"Instagram";'
    + '"' + date + '";'
    + '"' + user.edge_followed_by.count + '";'
    + '"' + user.edge_follow.count + '";'
    + '"' + user.edge_owner_to_timeline_media.count + '"'
  );
});
