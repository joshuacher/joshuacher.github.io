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

    const api_endpoint_url = ''; // API endpoint

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");

        // YOUR CODE GOES HERE

    }).
    catch(error => {
        console.log(error.message);
    });

    console.log("[END] populate_category_dropdown()");
}


/* Task 8 - Category Dropdown Event Listener */



/* Task 9 - Alcoholic Dropdown Event Listener */



/* Task 10 - Name search input Event Listener */





// DO NOT MODIFY THE BELOW LINES
get_all_drinks();
populate_category_dropdown();