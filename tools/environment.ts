interface EnvironmentType {
  [key: string]: string
}

export const SHARED_DOMAIN_DEFAULT = 'netlify.app'

const environment: EnvironmentType = {
  REACT_APP_API_URL: 'https://utf-io-staging.herokuapp.com',
  REACT_APP_SHARED_DOMAIN: SHARED_DOMAIN_DEFAULT,
}

export default environment
