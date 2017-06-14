/**
 * Created by pila on 08/06/2017.
 */

$('#toggle-sidebar').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});


function fetchFavorites(){
//    debugger;
    var favorites = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    var response = [];
    console.log('faovrites'); 
    var menu = $('#menu');
    var status_color,
        li;
    
    for(var i = 0; i < favorites.length; i++){
        
        var display_name = favorites[i];
        $.ajax({
            display_name: display_name,
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/' + display_name,
            headers: {
                'Client-ID': '0s5d4himbtb3gffpi7i4iojttkhcss'
            },

            success: function(data) {
                data.display_name = this.display_name;
                console.log(data);
                
                if(data.stream === null){
                    status_color = 'text-danger';
                     li = '<li><a href="#"><i class="fa fa-list-alt"></i> <span class="collapse in hidden-xs">' + data.display_name + '</span> <span class="collapse in hidden-xs pull-right"><i class="fa fa-circle fa-xs '+status_color+'" ></i></span></a></li>';
                } else {
                    status_color = 'text-success';
                     var li = '<li><a href="#"><i><img class="img img-rounded" style="border-radius:50%; width:30px"  src="' + data.stream.channel.logo + '"></i> <span class="collapse in hidden-xs">' +data.display_name + '</span> <span class="collapse in hidden-xs pull-right"><i class="fa fa-circle fa-xs ' + status_color + '" ></i></span></a></li>';
                }
                
                menu.append(li);

            },

            error: function(xhr, status, error) {
                console.log(xhr, status, error);
            },
            cache: false
            
        });

    }

}

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


function populateFeatured(response){
    response = response.featured;
    var content = "<div class=\"col-sm-12 text-center\"><h1>Featured Channels</h1></div>";
    var featured = $('.featured');
    response.forEach(function(channel){
         content += '<div class="col-xs-12 col-sm-4 panel-container"><div class="panel navbar-inverse"><div class="panel-heading"><div class="row" id="heading-row"><img class="col-xs-12 col-sm-3 img img-rounded img-responsive" src="' + channel.stream.channel.logo + '"><h5 style="color: lightgreen" class="col-xs-12 col-sm-6 display-name">' + channel.stream.channel.display_name + '</h5><p style="color: lightgreen" class="col-xs-12 col-sm-3 followers text-center"> <i class="fa fa-star"></i><br>  ' + channel.stream.channel.followers + '</p></div></div><div class="panel-body"><iframe width="100%" src="https://player.twitch.tv/?channel=' + channel.stream.channel.display_name + '&muted=false&pause=true&autoplay=false"  frameborder="0" scrolling="no" allowfullscreen="true"></iframe></div></div></div>';

    });
    
    featured.append(content);
}

fetchFeatured();
fetchFavorites();
