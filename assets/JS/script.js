$(document).ready(function() {
  // when user clicks the search button:
  $('#search-recipe').on('click', function() {
    event.preventDefault();

    // Pseudo-Code:
    // get what was entered into the search bar:
    // Put it into the queryUrl
    // AJAX request
    // Results should be returned in a "card" for each recipe

    var item = $('#ingredient').val();
    var restriction = $('#filter').val();
    var filter = $('#exclude-ingredient').val();

    var queryUrl1 = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?offset=0&query=${item}`;

    $.ajax({
      type: 'GET',
      url: queryUrl1,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        'X-RapidAPI-Key': '36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407'
      }
    }).then(function(response) {
      console.log(response);

      var i = 0;
      while (i < response.results.length) {
        // get the title of the recipe (get rid of the extra text)
        var titleArray = response.results[i].title.split(' ');

        var title = titleArray[0] + ' ' + titleArray[1];

        // put entire card structure inside one string and then append that to the recipe div. Put the id of an individual recipe inside the search button i.e. <a> tags under id attribute, for later access
        var html = `<div class="card" style="width: 20em; height: 25em; float: left; margin-left: 1em; margin-bottom: 1em">
                        <img class="card-img-top" src=${response.baseUri +
                          response.results[i]
                            .image} style="width: 100%; height:12.5rem">
                         <div class="card-body">
                             <p class="card-text">${title}</p>
                             <a class="btn btn-primary text-light btn-block recipeInd" id=${
                               response.results[i].id
                             }>Check Out Full Recipe!</a>
                         </div>
                     </div>`;

        $('#main-recipe-body').append(html);
        i++;
      }
      // empty out the form fields

      $('#ingredient').val('');
      $('#filter').val('');
      $('#exclude-ingredient').val('');
    });
  });

  // AJAX for getting individual recipe's ingredients

  function displayRecipe() {
    console.log($(this).attr('id'));

    var idRecipe = $(this).attr('id');

    var queryUrl2 = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${idRecipe}/information`;
    $.ajax({
      type: 'GET',
      url: queryUrl2,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        'X-RapidAPI-Key': '36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407'
      }
    }).then(function(res) {
      // in response, get the list of ingredients and store it in an object?
      console.log(res);
      var ingredients = [];
      var ingredientArray = res.extendedIngredients;
      var k = 0;
      while (k < ingredientArray.length) {
        ingredients.push(ingredientArray[k].name);
        k++;
      }

      console.log(ingredients);
      //return ingredients;
    });
  }

  $(document).on('click', '.recipeInd', displayRecipe);

  // Take care of nutritionix API now
});
