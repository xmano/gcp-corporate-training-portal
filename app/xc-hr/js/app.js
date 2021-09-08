$(document).ready(function() {
  (function() {
    emailjs.init("user_XZDBujZDwakShYdbBs5W6");
    })();
  
  function send_email(to_name) {
    var templateParams = {
      to_name: to_name,
      from_name: 'Xkanda Cloud',
      message: 'Welcome to iLearn by Xkanda Technologies',
      reply_to: 'mano.bangera@gmail.com'
    };
  
    emailjs.send('xc_sendgrid_test', 'template_c4r02it', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
  }

  $("#register").click(function() {
    var domainname = 'http://34.145.181.216';
    var token = 'a93110b62218ede12fe1430a03d30187';
    var functionname = 'core_user_create_users';

    //send_email();

    var name = $("#name").val();
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();

    if (name == '' || email == '' || password == '') {
      alert("Please fill all fields...!!!!!!");
    } else if ((password.length) < 8) {
      alert("Password should atleast 8 character in length...!!!!!!");
    } else {
      console.log("Creating user :", name);
      var serverurl = domainname + '/webservice/rest/server.php' ;
      //add params into data
      var userstocreate = [{  username: username,
                              password : password,
                              firstname : name,
                              lastname : name,
                              email : email,
                              timezone : 'Pacific/Port_Moresby'
                           }
                          ];

 
      var data = {
                  wstoken: token,
                  wsfunction: functionname,
                  moodlewsrestformat: 'json',
                  users: userstocreate
                  }

      var response = $.ajax(
                              {   type: 'POST',
                                  data: data,
                                  url: serverurl
                              }
                           );
      /* */
      console.info(userstocreate);

      console.log(response)
      
      send_email(email);
    }

    //alert(userstocreate);

  });

});