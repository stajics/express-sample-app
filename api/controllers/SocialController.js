const fetch = require('node-fetch');

const fbPageAccessToken = 'EAAaP629fU4kBABPBbOr8MSoKxmV4ZBNK5GQ9uZCDGSx7f6CIwre7ZAZBAe8jbhrhg0UfccV1oS1ojqNC4PdSOevr3tFEZCZCWnmQR6klcPJW6iwk2FsP3G4ZCwDAUqWCxbnIF5rMPs9xzVvKIoaNvZAv8AwXrjfVCAVXaTPvsT0y7QQ38jsKmmOcmo2aIObAb2AZD';
const fbGraphUrl = 'https://graph.facebook.com/v2.8';
const fbPageId = '1719702751676983';

const fbPostsUrl = `${fbGraphUrl}/${fbPageId}/posts?access_token=${fbPageAccessToken}`;

const getFbPosts = () => {
  fetch(fbPostsUrl)
    .then(res => res.json())
    .then(json => console.log(json));
};

module.exports = {
  getFbPosts,
};
