/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$(document).ready(function(){
    $(".bot1Volv").on('click',function(){
            window.localStorage.setItem("prov", "");
            location.href="index.html";
    });
});

/* Funciones de el framework para leer los resultados del ajax
=================================================================== */
function termina(xq,v)
{
    /**
     * xq -> corresponde al caso del switch
     * v -> resultado en array que envia el ajax
     */
    if( xq == "traeFotos" )
    {
        
    }
    

}