function generate_board() {
    // Task 1 - get selected friends
    let friends = [];
    let selected = document.getElementById('friends');
    for (let option of selected.selectedOptions) {
        friends.push(option.value);
    }
    console.log(friends);

    // Task 2 - prepare card filenames and pairs
    const fruits = ['apple', 'banana', 'kiwi', 'orange'];
    let randomFruits = shuffleArray(fruits);
    let randomFriends = shuffleArray(friends);
    let finalArray = [];
    for (const friend of randomFriends) {
        for (const fruit of randomFruits) {
            finalArray.push(`${fruit}_${friend}.png`);
        }
    }

    let pairedArr = shuffleArray(finalArray.concat(finalArray));
    console.log('pairedArr:', pairedArr);

    // Task 3 - compute grid size
    const num_cols = fruits.length;
    const num_rows = friends.length * 2;
    console.log("# of columns: " + num_cols);
    console.log("# of rows: " + num_rows);

    const gridStyle = `
        display: grid;
        grid-template-columns: repeat(${num_cols}, 1fr);
        gap: 8px;
        padding: 8px;
    `;

    const cardsHtml = pairedArr.map((filename, idx) => {
        return `
            <div class="card" data-card="${filename}">
                <img src="cards/hidden.png" alt="hidden" style="width:100%; height:auto; display:block; object-fit:contain;">
            </div>
        `;
    }).join('\n');

    const result_str = `
        <div id="board" style="${gridStyle}">
            ${cardsHtml}
        </div>
    `;

    const boardContainer = document.getElementById('game-board');
    boardContainer.innerHTML = result_str;

    let flippedCards = [];
    let matchedCount = 0;
    let totalScore = 0;
    const score = document.getElementById('score');
    if (score) score.textContent = `Total Score: ${totalScore}`;

    const cardElements = document.querySelectorAll('#board .card');

    cardElements.forEach(card => {
        card.addEventListener('click', function () {
            if (card.classList.contains('matched') || flippedCards.includes(card)) return;

            if (flippedCards.length >= 2) return;

            const img = card.querySelector('img');
            img.src = `cards/${card.dataset.card}`;

            flippedCards.push(card);

            if (flippedCards.length === 2) {
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];

                if (card1.dataset.card === card2.dataset.card) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');

                    card1.querySelector('img').style.opacity = 0.5;
                    card2.querySelector('img').style.opacity = 0.5;

                    totalScore += 1;
                    matchedCount += 2;
                    if (score) score.textContent = `Total Score: ${totalScore}`;

                    flippedCards = [];

                    if (matchedCount === pairedArr.length) {
                        if (score) score.textContent = "All Matched, Congratulations!";
                    }
                } else {
                    setTimeout(() => {
                        card1.querySelector('img').src = 'cards/hidden.png';
                        card2.querySelector('img').src = 'cards/hidden.png';
                        flippedCards = [];
                    }, 2000);
                }
            }
        });
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
