$(document).ready(() => {

    const spinnerTopic = $('#spinnerTopic');
    const spinner = new Spinner().create(spinnerTopic, 'mt-5');


    fetch('http://localhost:3000/api/topic')
        .then((response) => response.json())
        .then((data) => {

            spinner.remove();

            const accordionTopics = $('#accordionTopics');
            data.forEach((value) => {
                new Item().create(accordionTopics, value);
            });
        })
        .catch((error) => {

        });
});