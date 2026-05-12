"use strict"

function main()
{
   let input = document.querySelector("#input")
   let output = document.querySelector("#output")

   let namber = parseInt(input.value)

   let n0 = namber * 0;
   let n1 = namber * 1;
   let n2 = namber * 2;
   let n3 = namber * 3;
   let n4 = namber * 4;
   let n5 = namber * 5;
   let n6 = namber * 6;
   let n7 = namber * 7;
   let n8 = namber * 8;
   let n9 = namber * 9;


   output.innerText = `${namber} * 0 = ${n0}\n`
                      +`${namber} * 1 = ${n1}\n`
                      +`${namber} * 2 = ${n2}\n`
                      +`${namber} * 3 = ${n3}\n`
                      +`${namber} * 4 = ${n4}\n`
                      +`${namber} * 5 = ${n5}\n`
                      +`${namber} * 6 = ${n6}\n`
                      +`${namber} * 7 = ${n7}\n`
                      +`${namber} * 8 = ${n8}\n`
                      +`${namber} * 9 = ${n9}`
}