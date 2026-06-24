"use strict"

$(() =>{
    $("#button")
    .text("нажми на меня")
    .css("border", "2px solid red")
    .css("background", "red")
    .css("margin", "4px")
    .css("width", "300px")
    .css("heigth", "100px")
    .on("click", function(){
        $(this)
        .empty()
        .css("background", "blue")
    })
    }
)
