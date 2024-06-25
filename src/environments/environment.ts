import packageInfo from '../../package.json';

export const environment = {
  // urlApi: 'http://127.0.0.1:5001/painel-operative/southamerica-east1/api',
  urlApi: 'https://api-v36mvjtija-rj.a.run.app',
  sentryDsn: '',
  storage: {
    url: '$URL_STORAGE',
    bucket: '$BUCKET_STORAGE',
    endpoint: '$ENDPOINT_STORAGE'
  },
  firebase: {
    apiKey: 'AIzaSyByG41oqJmRDPhYwq0Jwf1_SSNhvOL3-Go',
    authDomain: 'painel-operative.firebaseapp.com',
    projectId: 'painel-operative',
    storageBucket: 'painel-operative.appspot.com',
    messagingSenderId: '938299821635',
    appId: '1:938299821635:web:1ee92361711ba5a8c38ef6',
    measurementId: 'G-48YNMW7S6F'
  },
  appVersion: `Versão ${packageInfo.version}`
};
