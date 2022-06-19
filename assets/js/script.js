
//Lyrics empty string
var songWords = "";

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
            page_size: 15,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            //console.log(data);
            setInfo(data);
        }
    })
}

var setInfo = function(data){

    //Creates the result list
    for(var i = 0; i < 15; i++){

        //Extract the song name of each possible result
        var songTitle = data.message.body.track_list[i].track.track_name;
        var artist = data.message.body.track_list[i].track.artist_name;
        console.log(songTitle)
        console.log(artist)
        //Creates the element on the DOM
        var pSong= $('<li class="pSong">'+ songTitle +' by '+ artist +'</li>');
        $("#songList").append(pSong); 
    }
    
}