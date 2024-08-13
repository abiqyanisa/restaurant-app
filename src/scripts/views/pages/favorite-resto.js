import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const favResto = {
  async render() {
    return `
        <div class="restaurant-list"></div>
      `;
  },

  async afterRender() {
    function showDescription(description, maxLength) {
      if (description.length > maxLength) {
        return `${description.substring(0, maxLength)}...`;
      }
      return description;
    }

    const restaurantsDB = await FavoriteRestoIdb.getAllResto();
    const imageUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.display = 'none';

    console.log('RESTO FAV:', restaurantsDB);

    const renderAllResto = (restaurants) => {
      console.log('Rendering Resto:', restaurants);

      const restoList = document.querySelector('.restaurant-list');
      let htmlContent = '';

      restaurants.forEach((restaurant) => {
        const initialDescription = showDescription(restaurant.description, 300);
        const fullDescription = showDescription(restaurant.description, 600);

        htmlContent += `
          <a href="/#/detail/${restaurant.id}">
            <div  class="restaurant" style="background-image: url('${imageUrl}/${restaurant.pictureId}')" alt="${restaurant.name}">
              <div class="restaurant-title" >
                  <div>    
                      <h3>${restaurant.city}</h3>
                      <h2>${restaurant.name}</h2>
                  </div>
                  <h2><i class="fa fa-star" style="color: #ffd000"></i> ${restaurant.rating}</h2>
              </div>
              <p class="description" data-full="${fullDescription}" data-short="${initialDescription}">${initialDescription}</p>
              
            </div>
          </a>
        `;
        restoList.innerHTML = htmlContent;
      });
    };

    renderAllResto(restaurantsDB);
  },
};

export default favResto;
