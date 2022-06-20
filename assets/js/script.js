
//Lyrics empty string
var songWords = "";
//Results number
var nResults = 8;

var songTitle = "";

$("form").on("click","#btn", function(event){
    event.preventDefault();
    
    songWords= $("#lyrics").val().trim();
    
    if(songWords === ""){
        //Fix this
        // alert("The input is blank")        
        // return;
    }

    else{
        //Cleans the search box
        $("input").val('');

        getSong();
        console.log(songWords);
    }

})


var getSong = function(){
  
    //Ajax request to get the list of songs that have the lyrics on it 
    $.ajax({
        type: "GET",
        data: {
            apikey:"9d4d24aaeb01794337b053fca031b0f9",
            q_lyrics: songWords,
            s_track_rating: "desc",
            page_size: nResults,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            setInfo(data);
        }
    })
}

var setInfo = function(data){
    
    //Removes the previous results
    $( ".pSong" ).remove();

    //Creates the result list
    for(var i = 0; i < nResults; i++){

        //Extract the song name of each possible result
        songTitle = data.message.body.track_list[i].track.track_name;
        artist = data.message.body.track_list[i].track.artist_name;
        
        //Creates the element on the DOM
        var pSong= $('<li class="pSong">'+ songTitle +' by '+ artist +'</li>');
        $("#songList").append(pSong); 
    }
    
}


$("#songList").on("click","li", function(event){
    event.preventDefault();

    songTitle = $(this).text();
    videoFinder();
})

var videoFinder = function(){
    //Youtube API KEY AIzaSyAm8wLpmDSB6Bv6QoTuaAHBiw9wpjBIZyc

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyAm8wLpmDSB6Bv6QoTuaAHBiw9wpjBIZyc',
            q: songTitle,
            part: 'snippet',
            maxResults: 1,
            order: 'relevance',
            type: 'video',
            videoEmbeddable: true
        },
        success: function(data){
            console.log(data)
            videoShow(data);
        },
        error: function(response){
            console.log("Request Failed");
        }
      });
    
}

var videoShow = function(data){

    $("iframe").attr("src","http://www.youtube.com/embed/"+data.items[0].id.videoId);
}