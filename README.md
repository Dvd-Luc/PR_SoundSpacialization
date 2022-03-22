# PR_Spacialization (pr_spacialization)

Web embedded app for soundfield immersion using HRTF, binaural and localisation technologies.
## Manual spacialization : https://dvd-luc.github.io/PR_Spacialization/dist/spa/#/boombox
## GPS spacialization : https://dvd-luc.github.io/PR_Spacialization/dist/spa/#/spacialization
## Explanations
This project aims to develop Audio Augmented Reality in embedded systems such as smartphones. To do so, it implements the use of HRTF using the WebAudio API. 
### Current features :
- Audio track playing
- Volume management
- Spacialization using arbitrary coordinates with no physical meaning nor units
- Basic geolocation and orientation (not yet fully functional for audio spacialization)

### Users guide
#### Manual spacialization
Since it is no longer possible on most browsers to play a soundtrack directly when loading a webpage, playing the soundtrack needs to be triggered by the <Play/Pause> button.
Other buttons and thus features are not responsive until playing the soundtrack for the first time as it allows the creation of an AudioContext object that is necessary for those features.

This project currently works proposing the simplest sounfield possible composed of a source (PannerNode) and a listener object representing the user's position. Source and listener are initially spatially merged. Only the source can currently be moved using either the provided inputs buttons.

#### GPS spacialization
This application needs you to locate a virtual source using the provided inputs. For the moment, you need to provide the source location **before** clicking the "play/pause" button. 
This part is not functional as the localization does not seem to be updated after the first localization. Moreover, the orientation is not taken into account for the moment.

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
