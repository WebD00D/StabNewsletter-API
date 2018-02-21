window.addEventListener("load", function(event) {

  const submitEmailBtn = document.getElementById("js_submitEmail");
  submitEmailBtn.onclick = function() {


    const email = document.getElementById("email").value;
    document.getElementById("errormessage").classList.add("d-none");

    $.ajax({
      method: "GET",
      url: "https://stabnewsletter-api.herokuapp.com/sumbit-email?email=" + email,
      contentType: "application/json; charset=utf-8",
      dataType: "json"
      // data: JSON.stringify({ email: email })
    }).done(function(msg) {
      console.log("done");
    });


  };



  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const submitEntry = document.getElementById("js_submitEntry");
  submitEntry.onclick = function() {

    const email = document
      .getElementsByClassName("page")[0]
      .getAttribute("data-email");

      if ( !document.querySelector('input[name = "shaper"]:checked') ) {
        document
          .getElementById("errormessage__shaper")
          .classList.remove("d-none");
        return;
      }


    $.ajax({
      method: "POST",
      url: "/sumbit-survey",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ email: email  })
    }).done(function(msg) {
      console.log("done");
    });

    // TODO: Show Success

    document
      .getElementsByClassName("js_section_two")[0]
      .classList.add("d-none");
    if (
      document
        .getElementsByClassName("page")[0]
        .getAttribute("data-hemisphere") === "Southern"
    ) {

      document.getElementById("js_thankscopy").innerHTML = "We can’t wait to give 12 surfboards crafted by the world’s best shapers to one person.";
    }


    document.getElementsByClassName("section__image")[0]
    .classList.remove("section__image--second");

    document.getElementsByClassName("section__image")[0]
    .classList.remove("section__image--second--southern");

    document.getElementsByClassName("section__image")[0]
    .classList.add("section__image--third");

    document
      .getElementsByClassName("js_section_three")[0]
      .classList.remove("d-none");
  };



  document.getElementsByClassName("js-mail")[0].onclick = function() {
    addToShareList("email");
    document.getElementById("lnkEmail").click();
  };

  document.getElementsByClassName("js-tweet")[0].onclick = function() {
    addToShareList("twitter");
    document.getElementById("lnkTwitter").click();
  };

  document.getElementsByClassName("js-share-fb")[0].onclick = function() {
    addToShareList("facebook");
    document.getElementById("lnkFacebook").click();
  };


  function addToShareList(type) {

    const email = document
      .getElementsByClassName("page")[0]
      .getAttribute("data-email");

    const hemisphere = document
      .getElementsByClassName("page")[0]
      .getAttribute("data-hemisphere")

    const social = document
        .getElementsByClassName("page")[0]
        .getAttribute("data-social");

    $.ajax({
      method: "POST",
      url: "/shared-list",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ email: email, social: social, hemisphere: hemisphere, type: type  })
    }).done(function(msg) {
      console.log("done");
    });

  }

});
