$(window).ready(function(){
  $.get("http://localhost:2017/",null,function(data){
    if(typeof data=="string") data=JSON.parse(data);
    window.data=data;
    loadBounties(data);
  },"json");
});

function changeById(id,lambda){
  for(var a in window.data) if(window.data[a].id==id){
    window.data[a]=lambda(window.data[a]);
    break;
  }
}
function removeById(id,lambda){
  for(var a in window.data) if(window.data[a].id==id){
    window.data.splice(a,1);
    break;
  }
}
function loadBounties(data){
  const format=(d) => (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
  const thresh=60*60*24*7;// seconds in a week
  const today=new Date();
  $(".bounty").empty();
  for(var a in data){
    const entry=data[a];
    const date=new Date(entry.date);
    const old=entry.complete || (today-date)/1000>=thresh;
    $(old?".old":".current").append($("<div>")
      .append($("<div>")
        .append($("<div>").addClass("name").text(entry.name))
        .append($("<div>").addClass("desc").text(entry.desc))
        .append($("<div>").addClass("reward")
          .append($("<span>").addClass("colored").text("Reward: "))
          .append($("<span>").text(entry.reward))))
      .append($("<div>")
        .append($("<div>").addClass("date")
          .append($("<span>").text("posted on "))
          .append($("<span>").addClass("colored").text(format(date))))
        .append($("<img>").addClass("button")
          .attr("src",old?"res/minus.svg":"res/check.svg")
          .addClass(old?"old-button":"new-button")
          .attr("title",old?"Remove":"Complete")
          .attr("data",entry.id)
          .click(function(){
            if($(this).hasClass("new-button")){
              alert("Bounty completed");
              changeById($(this).attr("data"),(e) => {e.complete=true;return e})
              loadBounties(window.data);
            }else{
              alert("Bounty removed");
              removeById($(this).attr("data"),(e) => {e.complete=true;return e})
              loadBounties(window.data);
            }
          }))));
  }
  $.get("http://localhost:2017/write",JSON.stringify(data),(d) => console.log(d),"json");
}
