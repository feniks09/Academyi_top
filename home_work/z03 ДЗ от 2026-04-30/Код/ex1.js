"use strict";


function main()
{
    let p = document.getElementById("output");

    if (0) p.innerText += "0\n";

    if (1) p.innerText += "1\n";

    if (-1) p.innerText += "-1\n";

    if (0.0) p.innerText += "0.0\n";

    if (1.0) p.innerText += "1.0\n";

    if (-1.0) p.innerText += "-1.0\n";

    if (0.2) p.innerText += "0.2\n";

    if (1.2) p.innerText += "1.2\n";

    if (-1.2) p.innerText += "-1.2\n";

    if ("text") p.innerText += "text\n";

    if (" ") p.innerText += "<один пробел>\n";

    if ("") p.innerText += "<пустая строка>\n";
    
    if (null) p.innerText += "null\n";

    let x = 0 / 0;

    if (x) p.innerText += "NaN\n";

    x = -1 / 0;

    if (x) p.innerText += "-Infinity\n";

    x = 1 / 0;

    if (x) p.innerText += "Infinity\n";

    if ({}) p.innerText += "{}\n";

    if ({1: "a", 2: "b"}) p.innerText += "{1: \"a\", 2: \"b\"}\n";

    if ([]) p.innerText += "[]\n";

    if ([4, "text", null]) p.innerText += "[4, \"text\", null]\n";

    let y = x.nothing;
    
    if (y) p.innerText += "undefined\n";

    //...
}