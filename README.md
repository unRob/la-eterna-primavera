# La eterna primavera

TKTKTKT

## How to build

### Get an API Key

Follow the instructions to create a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key), then run:

```sh
# get the build dependencies
npm install --dev
# create a config file
npm run setup
```

Edit `src/config.js` and replace `REPLACE_ME` with your Google Maps API Key obtained with the instructions above.

### Build

Once we have a config, we're ready to:

```sh
# generate a ./dist folder with minified assets
npm run build
```

A `dist` folder is created with a bundle of files ready to be served by any web-server.


