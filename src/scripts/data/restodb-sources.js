import API_ENDPOINT from '../globals/api-endpoint';

class RestoDbSource {
  static async allResto() {
    const response = await fetch(API_ENDPOINT.ALL_RESTO);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async favResto() {
    const response = await fetch(API_ENDPOINT.FAV_RESTO);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTO(id));
    return response.json();
  }
}

export default RestoDbSource;
