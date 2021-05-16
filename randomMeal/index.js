const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

const createHTMLMarkup = ({ meal, ingredients }) => {
  meal_container.innerHTML = `
  <div class="row">
    <div class="columns five">
      <img src="${meal.strMealThumb}" alt="Meal Image">
      ${
        meal.strCategory
          ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
          : ''
      }
      ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
      ${
        meal.strTags
          ? `<p><strong>Tags:</strong> ${meal.strTags
              .split(',')
              .join(', ')}</p>`
          : ''
      }
      <h5>Ingredients:</h5>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
    <div class="columns seven">
      <h4>${meal.strMeal}</h4>
      <p>${meal.strInstructions}</p>
    </div>
  </div>
  ${
    meal.strYoutube
      ? `
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
      </div>
    </div>`
      : ''
  }
  `;
};

const parseIngredients = (meal) => {
  const result = [];
  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      result.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }

  return result;
};

const createMeal = (meal) => {
  const ingredients = parseIngredients(meal);

  createHTMLMarkup({ meal, ingredients });
};

const fetchMeal = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((apiResponse) => {
      if (apiResponse.ok) {
        return apiResponse.json();
      }
    })
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((err) => console.error(err));
};

get_meal_btn.addEventListener('click', fetchMeal);
