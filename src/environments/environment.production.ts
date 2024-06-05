import packageInfo from '../../package.json';

export const environment = {
  // urlApi: 'https://api-v36mvjtija-rj.a.run.app',
  urlApi: 'http://127.0.0.1:5001/painel-operative/southamerica-east1/api',
  sentryDsn: '',
  storage: {
    url: '$URL_STORAGE',
    bucket: '$BUCKET_STORAGE',
    endpoint: '$ENDPOINT_STORAGE'
  },
  firebase: {
    apiKey: 'FIREBASE_APIKEY_PROD',
    authDomain: 'FIREBASE_AUTHDOMAIN_PROD',
    projectId: 'FIREBASE_PROJECTID_PROD',
    storageBucket: 'FIREBASE_STORAGEBUCKET_PROD',
    messagingSenderId: 'FIREBASE_MESSAGINGSENDERID_PROD',
    appId: 'FIREBASE_APPID_PROD',
    measurementId: 'FIREBASE_MEASUREMENTID_PROD'
  },
  appVersion: `${packageInfo.version}X`
};
