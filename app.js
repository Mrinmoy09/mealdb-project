const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value ='';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayResults(data.meals))
}

const displayResults =  meals => {
    const result = document.getElementById('result');
    result.textContent = '';
    // if(meals.length == 0){
    //     const noResultDiv = document.getElementById('no-result')
    //     const p = document.createElement('p');
    //     p.innerText= 'No results Found'
    //     noResultDiv.appendChild(p);
    //     console.log(p,innerText);
    // }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card">
            <img width ="200px" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0 , 150)}</p>
            </div>
          </div>
        `;
        result.appendChild(div);
    });
}

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]));

}

const displayMealDetail = meal => {
    const deatails = document.getElementById('meal-details');
    deatails.textContent='';
    const div = document.createElement('div');
    
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0 , 150)}</p>
              
            </div>
    `
    deatails.appendChild(div);
}