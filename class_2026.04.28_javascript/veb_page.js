"use strict";

function sum()
{
    const DEFAULT_VALUE = 7777;
    const input_x = document.querySelector("#fist_namber");
    const input_y = document.querySelector("#second_namber");
    
    const output = document.querySelector("#output");

    let x = parseFloat(input_x.value) || DEFAULT_VALUE;
    let y = parseFloat(input_y.value) || DEFAULT_VALUE;
    let sum_xy = x + y;


    output.innerText
        = `${x}+${y}=${sum_xy}`
        

}

function minus()
{
    const DEFAULT_VALUE = 7777;
    const input_x = document.querySelector("#fist_namber");
    const input_y = document.querySelector("#second_namber");
    const output = document.querySelector("#output");

    let x = parseFloat(input_x.value) || DEFAULT_VALUE;
    let y = parseFloat(input_y.value) || DEFAULT_VALUE;
    let sum_xy = x - y;


    output.innerText
        = `${x}-${y}=${sum_xy}`
        

}

function mnog()
{
    const DEFAULT_VALUE = 7777;
    const input_x = document.querySelector("#fist_namber");
    const input_y = document.querySelector("#second_namber");
    const output = document.querySelector("#output");

    let x = parseFloat(input_x.value) || DEFAULT_VALUE;
    let y = parseFloat(input_y.value) || DEFAULT_VALUE;
    let sum_xy = x * y;


    output.innerText
        = `${x}*${y}=${sum_xy}`
        

}

function delenie()
{
    const DEFAULT_VALUE = 7777;
    const input_x = document.querySelector("#fist_namber");
    const input_y = document.querySelector("#second_namber");
    const output = document.querySelector("#output");

    let x = parseFloat(input_x.value) || DEFAULT_VALUE;
    let y = parseFloat(input_y.value) || DEFAULT_VALUE;
    let sum_xy = x / y;


    output.innerText
        = `${x}/${y}=${sum_xy}`
        
}
