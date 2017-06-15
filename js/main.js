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
    var menu = $('#menu');
    var no_favs = $('#no-favs');
    var fav_channels = $('#favorite-channels');
    var status_color,
        li,
        fav_panel;
    
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
                
                if(data.stream === null){
                    status_color = 'text-danger';
                     li = '<li class="status-ofline"><a href="https://www.twitch.tv/'+data.display_name+'" target="_blank"><i class="fa fa-television fa-2x" aria-hidden="false"></i> <span class="collapse in hidden-xs">' + data.display_name + '</span> <span class="collapse in hidden-xs pull-right"><i class="fa fa-circle fa-xs '+status_color+'" ></i></span></a></li>';
                } else {
                    status_color = 'text-success';
                     li = '<li class="status-online"><a href="#"><i><img class="img img-rounded" style="border-radius:50%; width:30px"  src="' + data.stream.channel.logo + '"></i> <span class="collapse in hidden-xs">' + data.display_name + '</span> <span class="collapse in hidden-xs pull-right"><i class="fa fa-circle fa-xs ' + status_color + '" ></i></span></a></li>';
                    
                    fav_panel = '<div class="col-xs-12 col-sm-4 panel-container"><div class="panel navbar-inverse"><div class="panel-heading"><div class="row" id="heading-row"><img class="col-xs-12 col-sm-3 img img-rounded img-responsive" src="' + data.stream.channel.logo + '"><h5 style="color: lightgreen" class="col-xs-12 col-sm-6 display-name">' + data.stream.channel.display_name + '</h5><p style="color: lightgreen" class="col-xs-12 col-sm-3 followers text-center"> <i class="fa fa-star"></i><br>  ' + data.stream.channel.followers + '</p></div></div><div class="panel-body"><iframe width="100%" id="'+ data.stream.channel.display_name + '" class="player-frame" src="'+data.stream.preview.large+'"  frameborder="0" scrolling="no" allowfullscreen="true"></iframe><footer><a class="btn btn-success play-button" onclick="streamChannel(\''+data.stream.channel.display_name+'\')"> <i class="fa fa-play fa-2x" aria-hidden="true"></i></a></footer></div></div></div>';
                    
                    if(fav_panel !== undefined){
                        no_favs.addClass('hidden');
                        fav_channels.append(fav_panel);
                    }
                }
   
                menu.append(li);

            },

            error: function(xhr, status, error) {
                //TODO: Perform error handling
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
            populateFeatured(data);
        },
        
        error: function(xhr, status, error){
            //TODO: Perform Error handling
            console.log("error");
        },
        cache: false
    });
}


function populateFeatured(response){
    response = response.featured;
    var content = ' ';
    var featured = $('.featured');
    var i = 1;
    response.forEach(function(channel){
        
          content = '<div class="col-xs-12 col-sm-4 panel-container"><div class="panel navbar-inverse"><div class="panel-heading"><div class="row" id="heading-row"><img class="col-xs-12 col-sm-3 img img-rounded img-responsive" src="' + channel.stream.channel.logo + '"><h5 style="color: lightgreen" class="col-xs-12 col-sm-6 display-name">' + channel.stream.channel.display_name + '</h5><p style="color: lightgreen" class="col-xs-12 col-sm-3 followers text-center"> <i class="fa fa-star"></i><br>  ' + channel.stream.channel.followers + '</p></div></div><div class="panel-body"><iframe width="100%" id="'+ channel.stream.channel.display_name + '" class="player-frame" src="'+channel.stream.preview.large+'"  frameborder="0" scrolling="no" allowfullscreen="true"></iframe><footer><a class="btn btn-success play-button" onclick="streamChannel(\''+channel.stream.channel.display_name+'\')"> <i class="fa fa-play fa-2x" aria-hidden="true"></i></a></footer></div></div></div>';
    
        featured.append(content);
    });
}


fetchFeatured();
fetchFavorites();

//start placying 
function streamChannel(channelName){
    var src = 'https://player.twitch.tv/?channel=' + channelName + '&muted=false&pause=true&autoplay=true';
    var iframe = document.getElementById(channelName);
    
    iframe.setAttribute('src', src);
}
    
