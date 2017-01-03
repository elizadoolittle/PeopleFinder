
var people = {};
var details = {};

$(document).ready(function () {

    // simulate async loading of your app scripts...

    $(".card").hide(); 

    function appReady() {
        var slowly = document.getElementById("slow");
        while (slowly.firstChild) {
            slowly.removeChild(slowly.firstChild);
        }

        var app = document.createElement("div");
        app.textContent = "";
        slowly.appendChild(app); 
        $(".card").show(); 
    }

    setTimeout(appReady, 2000);

    //From SitePoint : https://www.sitepoint.com/community/t/capitalizing-first-letter-of-each-word-in-string/209644
    function Capitalize(str) {
        str = str.toLowerCase().split(' ');

        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].split('');
            str[i][0] = str[i][0].toUpperCase();
            str[i] = str[i].join('');
        }
        return str.join(' ');
    }



    $.ajax({
        url: 'https://randomuser.me/api/?results=25&inc=name,picture,email,cell,location,login,dob,gender&format=pretty&noinfo',
        dataType: 'json',
        success: function (data) {

            console.log(data);

            var html = "";
            for (var i = 0; i < data.results.length; i++) {

                var nameToUse = data.results[i].name.first + " " + data.results[i].name.last;
                var pictureToUse = data.results[i].picture.thumbnail;

                people[nameToUse] = pictureToUse;
                details[nameToUse] = i;

            }

            console.log( details);

            $('input.autocomplete').autocomplete({
                data: people
            });


            $(".autocomplete-content").on("click", function (e) {

                var name = $("#autocomplete-input").val();
                var id = details[name];
                var person = data.results[details[name]];
                var formattedFirstName = Capitalize(person.name.first);
                var formattedLastName = Capitalize(person.name.last);
                var formattedCity = Capitalize(person.location.city);
                var formattedState = Capitalize(person.location.state);
                var formattedStreet = Capitalize(person.location.street);
                $("#details").html(

                    "<div class ='card'><div class='col s12'><ul class='collection'><li class='collection-item avatar'><img src=" + person.picture.medium + " class='circle'><span class='title'> <b>Name:</b> " + formattedFirstName + " " + formattedLastName + "</span><p><span><b>Username:</b> " + person.login.username + "<br> <b>Phone Number:</b> " + person.cell + "<br><b>Address:</b>  " + formattedStreet + "<br>" + formattedCity + " " + formattedState + ", " + person.location.postcode + "</p></li></ul></div></div>"


                    );




            });


        }
    });


});