$(window).ready(function(){
  console.log("Initiating controls...");

  $(".add-button").click(function(){
    var reward=$(".add .reward").val();
    var desc=$(".add textarea").val();
    var name=$(".add .name").val();
    var date=new Date();
    window.data.push({
      "reward":reward.length?reward:"The joy of doing a good deed",
      "desc":desc.length?desc:"Just click \"complete\" please",
      "name":name.length?name:"Someone forgot to add a name",
      "date":date.toString(),
      "id":date.toString(),
      "complete":false
    });
    loadBounties(window.data);
    alert("Bounty created");
  });

  function activate(tab){
    $(".content > div").removeClass("active");
    $("."+$(tab).attr("data")).addClass("active");
    $(".tabs > div").removeClass("active");
    $(tab).addClass("active");
  }
  $(".tabs > div").each(function(){
    $(this).click(function(){
      activate(this);
    });
  });
  activate($(".tabs > div:first-of-type"));
  console.log("Controls initiated!");
});
