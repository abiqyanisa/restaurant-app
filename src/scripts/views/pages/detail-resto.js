import LikeButtonInitiator from '../../utils/like-button-initiator';

const detailResto = {
  async render() {
    return `
        <div class="res"></div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const baseUrl = 'https://restaurant-api.dicoding.dev/';
    const imageUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.display = 'none';

    const showResponseMessage = (
      message = 'Check your internet connection',
    ) => {
      alert(message);
    };

    function getRestoIdFromUrl() {
      const { hash } = window.location;
      const id = hash.split('/')[2];
      console.log('ID dari fungsi:', id);
      return id;
    }

    const displayRestaurantDetails = (restaurant) => {
      const detailContainer = document.querySelector('.res');
      let htmlContent = '';

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
          menus: restaurant.menus,
          categories: restaurant.categories,
          customerReviews: restaurant.customerReviews,
        },
      });

      htmlContent += `
      <div class="res-info" style="background-image: url('${imageUrl}/${restaurant.pictureId}')" alt="${restaurant.name}">
        <div class="res-title" >
          <h1>${restaurant.name}</h1>
          <h1><i class="fa fa-star" style="color: #ffd000"></i> ${restaurant.rating}</h1>
        </div>
        <div class="res-title" >
          <h3>${restaurant.city}, ${restaurant.address}</h3>
          <h3>${restaurant.categories.map((category) => `<span>${category.name}</span>`).join(' ')}</h3>
        </div>
      </div>

      <div class="res-detail">
        <div class="res-desc">
          <h2>Description</h2>
          <p>${restaurant.description}</p>
        </div>
        <div class="res-menu">
          <div class="menu">
            <h4>Foods</h4>
            <p>${restaurant.menus.foods.map((food) => `<span>${food.name}</span>`).join(' ')}</p>
          </div>
          <div class="menu">
            <h4>Drinks</h4>
            <p>${restaurant.menus.drinks.map((drink) => `<span>${drink.name}</span>`).join(' ')}</p>
          </div>
        </div>
        <div class="res-review">
          <h3>Customer Reviews</h3>
              ${restaurant.customerReviews.map((review) => `
                  <div class="review">
                    <div class="reviewer">
                        <h5>${review.name}</h5>
                        <p>${review.date}</p>
                    </div>
                    <p>${review.review}</p>
                  </div>
              `).join('')}
          </div>
        </div>
      </div>
      `;

      detailContainer.innerHTML = htmlContent;
    };

    const getRestoById = (id) => {
      console.log(`${baseUrl}detail/${id}`);
      fetch(`${baseUrl}detail/${id}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            displayRestaurantDetails(responseJson.restaurant);
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        });
    };

    const restoId = getRestoIdFromUrl();
    getRestoById(restoId);
  },
};

export default detailResto;
