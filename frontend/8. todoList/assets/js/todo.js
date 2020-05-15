$("#newTodo").on("click", function(){
    console.log("new todo")
})

$("ul").on("click", "li", function(){
    console.log("li clicked")
    $(this).toggleClass("done")
})
$("ul").on("click", "span", function(e){
    e.stopPropagation();
    $(this).parent().fadeOut(500, function(){
        $(this).remove()
    });
})

$("#todoInput").keypress(function( event ){
    if(event.which === 13 ){
        console.log("keypress enter");
        $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + $(this).val() + "</li>");
        $(this).val("");
    }
})

$("h1 span").click(function(){
    $("input").fadeToggle();
})