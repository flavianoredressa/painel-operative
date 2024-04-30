import packageInfo from '../../package.json';

export const environment = {
  urlApi: '$URL_API',
  urlWorkflowApi: '$URL_API',
  sentryDsn: '',
  storage: {
    url: '$URL_STORAGE',
    bucket: '$BUCKET_STORAGE',
    endpoint: '$ENDPOINT_STORAGE'
  },
  firebase: {
    apiKey: 'FIREBASE_APIKEY',
    authDomain: 'FIREBASE_AUTHDOMAIN',
    projectId: 'FIREBASE_PROJECTID',
    storageBucket: 'FIREBASE_STORAGEBUCKET',
    messagingSenderId: 'FIREBASE_MESSAGINGSENDERID',
    appId: 'FIREBASE_APPID',
    measurementId: 'FIREBASE_MEASUREMENTID'
  },
  appVersion: `${packageInfo.version}-dev`
};
