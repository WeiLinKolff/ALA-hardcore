var questionId = 1


// Listen for load
document.addEventListener('DOMContentLoaded', function () {
    let questionId = 1
    fetch('http://127.0.0.1:3000/byId/' + questionId)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].question)
            document.getElementById('v_text').innerHTML = data[0].question
        })
}, false);


// Button functions
document.getElementById('ja_button').addEventListener("click", () => {
    fetch('http://127.0.0.1:3000/ja/' + questionId)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                console.log(data[0]);
                questionId = data[0].end_node;

                if (typeof questionId === 'undefined') {
                    document.getElementById('v_text').innerHTML = 'Dit is het einde van de vragenlijst';
                    return;
                }

                fetch('http://127.0.0.1:3000/byId/' + questionId)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('v_text').innerHTML = data[0].question;
                    });
            } else {
                document.getElementById('v_text').innerHTML = 'Dit is het einde van de vragenlijst, bewaar het document';
                document.getElementById('ja_button').style.display = "none";
                document.getElementById('nee_button').style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});



document.getElementById('nee_button').addEventListener("click", () => {
    fetch('http://127.0.0.1:3000/nee/' + questionId)
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            questionId = data[0].end_node
            
            fetch('http://127.0.0.1:3000/byId/' + questionId)
                .then(response => response.json())
                .then(data => {
                    if (data === undefined) {
                        document.getElementById('v_text').innerHTML = "Dit is het einde van de vragenlijst"
                    }
                    else {
                    document.getElementById('v_text').innerHTML = data[0].question
                    }
                })

        })
});


// Util



// Cards



// Listeners

