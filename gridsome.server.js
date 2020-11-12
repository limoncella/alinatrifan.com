// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios');

const login = async () => {
  const { data } = await axios.post(`${process.env.STRAPI_HOST}/auth/local`, {
    identifier: process.env.STRAPI_USERNAME,
    password: process.env.STRAPI_PASSWORD,
  });

  return data.jwt;
};

const getPictures = async (jwtToken) => {
  const { data } = await axios.get(`${process.env.STRAPI_HOST}/pictures`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return data;
}

module.exports = async function (api) {
  api.loadSource(async (actions) => {
    const jwtToken = await login();
    const pictures = await getPictures(jwtToken);

    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collections = {
      pictures: actions.addCollection({ typeName: 'Pictures' }),
    };

    pictures.forEach((picture) => {
      picture.Picture.url = process.env.STRAPI_HOST + picture.Picture.url;
      collections.pictures.addNode(picture);
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
