var topics = ['gundam', 'doraemon'];

function grabGifs() {
    var topic = $(this).attr('data-name');
    var apiKey = '&api_key=QCOh10Wd6WBR72bdIY8d6r1413XkOfBf&limit=10';
    var urlQuery = 'https://api.giphy.com/v1/gifs/search?q=' + topic + apiKey + '&rating=PG';

    $.ajax({
            url: urlQuery,
            method: 'GET'
        })
        .done(function (response) {
            console.log(response);
            console.log(urlQuery);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $('<div>');

                var para = $('<p>').text('Rating: ' + results[i].rating);

                var topicImg = $('<img>');

                topicImg.attr('src', results[i].images.fixed_height_still.url);
                topicImg.attr('data-still', results[i].images.fixed_height_still.url);
                topicImg.attr('data-animate', results[i].images.fixed_height.url);
                topicImg.attr('data-state', 'still');
                topicImg.attr('class', 'gif');
                gifDiv.append(para);

                gifDiv.append(topicImg);

                $('#gifsgohere').prepend(gifDiv);
            }
            $('.gif').on('click', function (event) {
                var state = $(this).data('state');
                console.log(state);
                if (state === 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).data('state', 'animate');
                    console.log('switched state: ' + $(this).data("state"))
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).data('state', 'still');
                }
        
            });
        
        });

}



function makeButt() {
    $('#buttons').empty();

    for (var i = 0; i < topics.length; i++) {

        var butt = $('<button>');

        butt.addClass('topic');

        butt.attr('data-name', topics[i]);

        butt.text(topics[i]);

        $('#buttons').append(butt);
    }
}

$('#add-topics').on('click', function (event) {
    event.preventDefault();

    var aTopic = $('#topics-input').val().trim();

    topics.push(aTopic);

    console.log(topics);

    makeButt();
});


$(document).on('click', '.topic', grabGifs);

makeButt();

  