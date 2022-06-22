
//Lyrics empty string
var songWords = "";
//Results number
var nResults = 8;

var songTitle = "";

var videoID = "";

//Gets the lyrics array from localStorage
var lyrics = JSON.parse(localStorage.getItem("lyrics")) || [];

console.log(lyrics)

$("div").on("click","#btn", function(event){
    event.preventDefault();
    
    songWords= $("#lyrics").val().trim();
    
    if(songWords === ""){
        //Fix this
        // alert("The input is blank")        
        // return;
    }

    else{

        //Saves the lyrics on localStorage
        saveSearch(songWords);

        //Cleans the search box
        $("input").val('');

        getSong();
        console.log(songWords);
    }

})

$( function() {
    $( "input" ).autocomplete({
      source: lyrics
    });
  } );

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
        },
        error: function(response){
            console.log(response);
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
        var pSong= $('<h4 class="pSong">'+ songTitle +' by '+ artist +'</h4>');
        $("#songList").append(pSong);
        
    }
    
}


$("#songList").on("click","h4", function(event){
    event.preventDefault();
    

    songTitle = $(this).text();

    //Finds the video on Youtube
    videoFinder(); 
    

})




//Finds the video on yt and returns the videoID
var videoFinder = function(){
    //Youtube API KEY AIzaSyAm8wLpmDSB6Bv6QoTuaAHBiw9wpjBIZyc
    //AIzaSyDXrcpQjOpQeCCjFd_FSlNGYaD9yIzb9yg

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyBwNEuyZ4_Sdmu1_Dz9OgSXc-ABEvW6BuE',
            q: songTitle,
            part: 'snippet',
            maxResults: 1,
            order: 'relevance',
            type: 'video',
            videoEmbeddable: true
        },
        success: function(data){
            videoID = data.items[0].id.videoId;
            $("#player").attr("src","http://www.youtube.com/embed/"+videoID);
        },
        error: function(response){
            console.log(response);
        }
      });
    
}


function saveSearch(songWords) {

    //Checks if that the box isn't empty
    if (songWords !== "") {
        
        //Add the new city into the array
        lyrics.push(songWords);
        //Saves the array
        localStorage.setItem("lyrics", JSON.stringify(lyrics));
    }
  }
 
   