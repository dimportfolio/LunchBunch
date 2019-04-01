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

    var queryUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?offset=0&query=${item}`;

    $.ajax({
      type: 'GET',
      url: queryUrl,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        'X-RapidAPI-Key': '36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407'
      }
    }).then(function(response) {
      console.log(response);

      for (var i = 0; i < response.results.length; i++) {
        var html = `<div class="card">
                       <img class="card-img-top" src=${response.baseUri +
                         response.results[i].image}>
                        <div class="card-body">
                            <p class="card-text">${
                              response.results[i].title
                            }</p>
                            <a class="btn btn-primary text-light" id=${
                              response.results[i].id
                            }>Check Out Full Recipe!</a>
                        </div>
                    </div>`;

        $('#main-recipe-body').append(html);
      }
    });

    $('#ingredient').val('');
    $('#filter').val('');
    $('#exclude-ingredient').val('');
  });
});
