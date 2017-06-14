/**
 * Created by pila on 08/06/2017.
 */

var favorites = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


$('#toggle-sidebar').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});

function fetchFeatured(){
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams/featured',
        headers: {
            'Client-ID': '0s5d4himbtb3gffpi7i4iojttkhcss'
        },
        
        success: function(data) {
            console.log(data);
            populateFeatured(data);
        },
        
        error: function(){
            console.log("error");
        },
        cache: false
    });
}

fetchFeatured();

function populateFeatured(response){
//    console.log(response.type);
    response = response.featured;
    var content = "<div class=\"col-sm-12 text-center\"><h1>Featured Channels</h1></div>";
    var featured = $('.featured');
    response.forEach(function(channel){
         content += '<div class="col-xs-12 col-sm-4 panel-container"><div class="panel navbar-inverse"><div class="panel-heading"><div class="row"><img class="col-xs-12 col-sm-3 img img-rounded img-responsive" src="'+channel.stream.channel.logo+'"><h4 style="color: lightgreen" class="col-xs-12 col-sm-6 display-name">' + channel.stream.channel.display_name + '</h4><h4 style="color: lightgreen" class="col-xs-12 col-sm-3 text-center"><i class="fa fa-star"></i> '+channel.stream.channel.followers+'</h4></div></div><div class="panel-body"><iframe width="100%" src="https://player.twitch.tv/?channel=' + channel.stream.channel.display_name + '&muted=false&pause=true&autoplay=false"  frameborder="0" scrolling="no" allowfullscreen="true"></iframe></div></div></div>';

    });
//    console.log(content);
    featured.append(content);
}