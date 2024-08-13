import CONFIG from './config';

const API_ENDPOINT = {
  ALL_RESTO: `${CONFIG.BASE_URL}resto`,
  FAV_RESTO: `${CONFIG.BASE_URL}favorites`,
  DETAIL_RESTO: (id) => `${CONFIG.BASE_URL}detail/${id}`,
};

export default API_ENDPOINT;
