
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

// var requestUrlSong = "http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + songWords +"&";

// var requestUrlSong = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ songWords +"&q_track=ultralight&apikey=9d4d24aaeb01794337b053fca031b0f9";
// var requestUrlSong = "http://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ songWords +"&q_track=ultralight&apikey=9d4d24aaeb01794337b053fca031b0f9";

   
    fetch(requestUrlSong).then(function(response){
        if (response.ok){
            response.json().
            then(function(data){
                    console.log(data.body);    
            })}});

}