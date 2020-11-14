// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs');

const aws = require("aws-sdk");
const axios = require('axios');

const getPictures = async (jwtToken) => {
  const s3 = new aws.S3();
  const url = `${process.env.DIRECTUS_HOST}/directus/gql`;
  const payload = {
    query: `{ at_photos { data { id, file { id, storage, filename_disk  } } } }`
  };
  const headers = {
    Authorization: `bearer ${process.env.DIRECTUS_TOKEN}`
  };

  const { data } = await axios.post(url, payload, { headers });

  return Promise.all(
    data.data.at_photos.data.map(async (picture) => {
      const filename = picture.file.filename_disk;
      const destination = `./src/assets/pictures/${filename}`;

      const params = {
        Bucket: process.env.DIRECTUS_S3_BUCKET,
        Key: `files/${filename}`,
      }

      const contents = await s3.getObject(params).promise();

      await fs.promises.writeFile(destination, contents.Body);

      return { ...picture, filename, url: require.resolve(destination) }
    })
  );
}

module.exports = async function (api) {
  api.loadSource(async (actions) => {
    const pictures = await getPictures();

    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collections = {
      pictures: actions.addCollection({ typeName: 'Pictures' }),
    };

    pictures.forEach((picture) => {
      collections.pictures.addNode(picture);
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
