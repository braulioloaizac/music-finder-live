
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

//var requestUrlSong = "https://api.musixmatch.com/ws/1.1/track.search?apikey=9d4d24aaeb01794337b053fca031b0f9&q_lyrics="+songWords+"&page_size=3&page=1&s_track_rating=desc";

var requestUrlSong = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=kanye&q_track=ultralight&apikey=9d4d24aaeb01794337b053fca031b0f9"
    //Makes a request to the weather API
    
    
    fetch(requestUrlSong).then(function(response){
        if (response.ok){
            response.json().then(function(data){
               
                    
                    //console.log(data.message.body.track_list)
                    console.log(response);
                
            }  
         )
        
        }
        else{
            alert("Bad request");
        }
       
    })

}