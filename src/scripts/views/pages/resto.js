const allResto = {
  async render() {
    return `
        <div class="restaurant-list"></div>
      `;
  },

  async afterRender() {
    const baseUrl = 'https://restaurant-api.dicoding.dev/';
    const imageUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.removeProperty('display');

    const showResponseMessage = (
      message = 'Check your internet connection',
    ) => {
      alert(message);
    };

    console.log('SHOW RESPONSE MESSAGE:');

    function showDescription(description, maxLength) {
      if (description.length > maxLength) {
        return `${description.substring(0, maxLength)}...`;
      }
      return description;
    }

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

    const getResto = () => {
      fetch(`${baseUrl}/list`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            renderAllResto(responseJson.restaurants);
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        });
    };

    getResto();
  },
};

export default allResto;
