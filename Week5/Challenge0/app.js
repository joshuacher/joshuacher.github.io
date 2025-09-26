/* Task 6 - API call */
function get_all_drinks() {
    console.log("[START] get_all_drinks()");

    // const api_endpoint_url = 'drinks.json'; // local file
    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/read.php';

    axios.get(api_endpoint_url).
    then(response => {
        console.log("Axios call completed successfully!");

        console.log(response.data.records);

        let section_results = document.getElementById('results');

        // Build a string of Bootstrap cards
        let result_str = ``;
        let drinks_array = response.data.records; // Array of drink objects
        console.log(drinks_array); // Array of drink objects

        // Task 4 - Display Drinks
        //   Each drink is a Bootstrap card
        // Replace all the hard-coded strings with actual values as read from the JSON file
        const api_endpoint_root = 'http://localhost/DrinksAPI/';

        for(let drink of drinks_array) {

            console.log(drink)

            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${api_endpoint_root + drink.photo_url}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }

        console.log(result_str);

        // Inject the cards into the #results section
        section_results.innerHTML = result_str;
    }).
    catch(error => {
        console.log(error.message);

        // Task 5 - Data can't be loaded, display alert
        //   "Failed to load drinks data."
        // YOUR CODE GOES HERE
        document.getElementById('alerts').innerHTML = `<section id="alerts" class="alert alert-danger">Failed to load drinks data.</section>`
    });

    console.log("[END] get_all_drinks()");
}


/* Task 7 - Category Dropdown Menu */
function populate_category_dropdown() {
    console.log("[START] populate_category_dropdown()");

    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/category.php'; 

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");

        const category_array = response.data.records; 
        console.log(category_array);

        let category_select = document.getElementById('category');

        for(category of category_array) {
            let option = document.createElement('option'); 
            
            option.value = category; 

            option.textContent = category; 

            category_select.appendChild(option);
        }

    }).
    catch(error => {
        console.log(error.message);
    });

    console.log("[END] populate_category_dropdown()");
}

let user_category = '';
let user_alcoholic = '';
let user_name_search = '';


/* Task 8 - Category Dropdown Event Listener */
let category_select = document.getElementById('category');
category_select.addEventListener('change', function () {
    user_category = category_select.value;
    filter_by_category_alcoholic_name();
});


/* Task 9 - Alcoholic Dropdown Event Listener */
let alcoholic_select = document.getElementById('alcoholic');
alcoholic_select.addEventListener('change', function () {
    user_alcoholic = alcoholic_select.value;
    filter_by_category_alcoholic_name();
});

/* Task 10 - Name search input Event Listener */
let name_search = document.getElementById('name_search');

name_search.addEventListener('input', function () {
    user_name_search = name_search.value;
    filter_by_category_alcoholic_name();
});

function filter_by_category_alcoholic_name() {
    console.log("[START] filter_by_category_alcoholic_name()");
    console.log("Filtering drinks by category:", user_category);
    console.log("Filtering drinks by alcoholic:", user_alcoholic);
    console.log("Filtering drinks by name:", user_name_search);

    const api_url = 'http://localhost/DrinksAPI/';
    const api_endpoint_url = `http://localhost/DrinksAPI/api/drink/search.php?c=${user_category}&a=${user_alcoholic}&n=${user_name_search}`;

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");

        let section_results = document.getElementById('results');
        
        let result_str = ``;
        let drinks_array = response.data.records; 
        console.log(drinks_array); 
        
        // Task 4 - Display Drinks
        for(let drink of drinks_array) {
            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${api_url}${drink.photo_url}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }

        section_results.innerHTML = result_str;
    }).
    catch(error => {
        console.log(error.message);
        document.getElementById('alerts').innerHTML =
            `<div class="alert alert-danger" role="alert">
                Failed to load drinks data.
            </div>`;
    });

    console.log("[END] filter_by_category_alcoholic_name()");
}

// DO NOT MODIFY THE BELOW LINES
get_all_drinks();
populate_category_dropdown();