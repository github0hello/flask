//Hook up the tweet display

$(document).ready(function() {
                           
    $(".countdown").countdown({
                date: "9 February 2024 00:00:00",
                format: "on"
            },
            
            function() {
                // callback function
            });

}); 