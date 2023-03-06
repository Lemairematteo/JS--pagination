var page = 1 ;
var nb_page = 0;


function appel(num_page){ 
  var xhr = new XMLHttpRequest(); 
  var lRequete = "https://reqres.in/api/users?page=" + num_page;
  console.log("requete" + lRequete);

  xhr.open("GET", lRequete, true);
  xhr.responseType="json";   
  xhr.onload = function() 
  { 
    console.log("voici la page ",num_page);
    var html = "" ;
    var html2 = "" ;
    const users = xhr.response.data;
    const page = xhr.response.page;
    const total_page = xhr.response.total_pages;
    nb_page = total_page;
    if( xhr.status == 200 ) 
    { 
        
        nb_page=total_page;
        console.log("total_page = " + nb_page);
        for( const user of users){
            console.log(user.email, user.first_name, user.last_name, user.avatar);
            html += "<h3>" + user.first_name + " " + user.last_name + "</h3>";
                html += "<p>" + user.email + "</p>";
                html += "<img src='" + user.avatar + "'/>";
                html += "<br></br>";
            }
            
        } else {}
        
    document.getElementById("js_result").innerHTML = html;  
    html2 += "<p>" + page + "/" + total_page + "<p>"; 
    document.getElementById("nb_pages").innerHTML = html2; 
  }; 
  xhr.send(); //Envoi de la requête au serveur (asynchrone par défaut) };  
}

/*document.getElementById("btn_js").onclick = function() // Interception du click sur le bouton 
{
    appel(page);
}
*/
function update(bouton){
    if(bouton == btn_js){
        appel(page);
    }
    if(bouton == btn_suivant){
        console.log("entre dans la fonction")
        if(page<nb_page){
            page += 1;
            appel(page);
        }
        else if(page == nb_page){
            alert("vous êtes au maximum de pages");
        }
        else {
            alert("erreur")
            appel(1);
        }
    }
    if(bouton == btn_pre){
        if(page == nb_page){
            page -= 1;
            appel(page)
        }
        else if(page == 1){
            alert("vous êtes au minimum de pages");
            appel(1);
        }
        else {
            alert("erreur");
        }
    }
}