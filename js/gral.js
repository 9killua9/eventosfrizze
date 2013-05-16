/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$url     = 'http://www.reiatsu.com.ar/phonegap/fiestas_frizze/php/ajax.php';
$urlFbk  = 'php/facebook/ajax.php';
$nImagen = 0;
$cargador1 = '<div class="positionAbsolute aja cargador overflowHidden" style=" height:134px !important; background:url(template/fondo/pattern_40.jpg) repeat scroll 0 0 transparent; opacity:.98; z-index:900; width:'+parseInt($(window).width())+'px;">\
                <div class="container" style="margin-top:27px !important;">\
                    <div class="content">\
                    <div class="ball"></div>\
                    <div class="ball1"></div>\
                    </div>\
                </div>\
            </div>';

$cargador = '<div class="positionAbsolute aja cargador overflowHidden" style="height:'+parseInt($(window).height())+'px !important; background:url(template/fondo/pattern_40.jpg) repeat scroll 0 0 transparent; opacity:.98; z-index:900; width:'+parseInt($(window).width())+'px;">\
                <div class="container" style="margin-top:27px !important;">\
                    <div class="content" style="-webkit-transform:scale(1.4) translateY(139px); ">\
                    <div class="ball"></div>\
                    <div class="ball1"></div>\
                    </div>\
                    ..Cargando..\
                </div>\
                <img src="template/fondo/2.png" class="botella"; style="opacity:.6; margin-top: '+(parseInt($(window).height())-390)+'px" />\
            </div>';


$(document).ready(function(){
    $(".bot1Volv").on('click',function(){
            window.localStorage.setItem("prov", "");
            location.href="index.html";
    });
});

$(window).bind("orientationchange", function(event){        
        $w = parseInt($(window).width());
        $h = parseInt($(window).height());
        
        $(".acomodaAlto, .swiper-n3, .red-slide, .swiper-n1, .swiper-n2").height($h);
        $('.swiper-nested1,.acomodaAlto').width($w*2);
        $("#cargaPresentes, #muestraInicial,#muestraContenido,#muestraRedSocial").width($w)
        $(".pagination-nested1").attr('style',"margin-top:"+($h-30)+'px !important;');
        cargaSlides();
        //event.preventDefault();
    });
/* Comienzo de las funciones 
=================================================================== */
function cargaEventosHome(prov)
{
    $data = 'donde='+prov+'&h=cargaEventosHome';
    lmPost($url,$data,"cargaEventosHome");
}
function cargaFuncionesEvAc(prov,id)
{   
    $("form[name=guardaAsociado] input[name=id]").val(id);
    $data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfo");
}
function cargaFuncionesEvPas(id)
{
    $data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfoPas");
}
function buscaPorMes(mes)
{
    var tam=35;
    $(".mesesDelAno").animate({height:tam},500,function(){});   

    $data = 'donde='+$("#donde").html()+'&h=cargaEventosHomeMes&mes='+mes;
    lmPost($url,$data,"cargaEventosHome");    
}
function buscadorDeDatos(buscar)
{
    $data = 'donde='+$("#donde").html()+'&h=traeInfoParaElBuscador&buscar='+buscar;
    lmPost($url,$data,"traeInfoParaElBuscador");
}
function buscadorSeccion()
{
    $("form[name=buscadorFrizze]").submit(function(a){
        a.preventDefault();
        return false;
    });  
    $(".buscadorImagen").click(function(){

       if($("form[name=buscadorFrizze] input[name=buscar]").val() != '' && $("form[name=buscadorFrizze] input[name=buscar]").val().length >= 1)
       {

            $buscar = $("form[name=buscadorFrizze] input[name=buscar]").val();
            buscadorDeDatos($buscar);
       }
       else
       {    
            $("form[name=buscadorFrizze] input[name=buscar]").attr('placeholder','Ingrese evento');
       }

    });
}
function get_random_color()
{
  //return '#'+'0123456789abcdef'.split('').map(function(v,i,a){return i>5 ? null : a[Math.floor(Math.random()*8)] }).join(''); 
  var rint = Math.round(0xffffff * Math.random());
  return 'rgba(' + (rint >> 21) + ',' + (rint >> 4 & 255) + ',' + (rint & 255) + ', 0.3)';
}
 function validar_email(valor)
{
    // creamos nuestra regla con expresiones regulares.
    var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    // utilizamos test para comprobar si el parametro valor cumple la regla
    if(filter.test(valor))
        return true;
    else
        return false;
}
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
        
        $i = 0;
        $ht ='';

        if(v != null)
        {
            for($i=0; $i < v['cantidad']; $i++)
            {
                $ht += '<div class="floatLeft muestraImagenes overflowHidden seisSieteSeisOcho cursorPointer"> <img src="'+v['img'][$i]['source']+'" /></div>';
            }
            
            $(".muestraDireccion a").attr("href","http://www.facebook.com/"+v['album']);
            $("#cargaFotelis").html($ht);
        }
    }
    else if( xq == "cargaEventosHome" )
    {
        $i                  = 0;
        $j                  = 0;
        $b                  = 0;
        $ht                 = '<div class="header">PR&Oacute;XIMAS FIESTAS</div><div class="headerSombra"></div>';
        $htv                = '';
        fechaEventoActual   = '';

        if(v != null)
        {
            for($i=0; $i < v['vueltas']; $i++)
            {
                fechaEventoActual   = v[$i]['fecha'].split(".");
                var mes             = parseInt(fechaEventoActual[1]);
                var dia             = parseInt(fechaEventoActual[0]);
                if(mes >= v['compara_mes'])
                {
                    if (v[$i]['id_galeria'] != "-")
                    {
                        $verGaleria = v[$i]['id_galeria'];
                        $esty       = 'style="color:#ffffff;"'; 
                    }
                    else
                    {
                        $verGaleria = "#";
                        $esty       = 'style="text-decoration: line-through !important; color:#999999;"';
                    }

                    /*$col = get_random_color();*/

                    if($i%2 == 0)
                        $col = "background: url('template/fondo/pattern_40.jpg') repeat scroll 80% 22%  transparent !important;";/*$col = "rgba(5,33,248, 0.2)";*/
                    else
                        $col = "background-color:rgba(255,255,255, 0.1)";

                    if(mes == v['compara_mes'] && dia > v['compara_dia'])
                    {
                        $ht += '<div class="swiper-slide W257X112" id="'+v[$i]['id']+'" style="width:'+parseInt($(window).width())+'px; height:133px !important; '+$col+' ">\
                                    <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                        <img src="http://www.reiatsu.com.ar/clientes/frizze/facebook/fiestas_frizze/'+v[$i]['imagen']+'" class="floatLeft" style="width:60px;" />\
                                        <div class="floatLeft" style=" width:120px;text-align:center;font-size:0.8em !important">'+v[$i]['fecha']+'</div>\
                                    </div>\
                                    <div class="floatLeft acomodaTextoIzquierda">\
                                        <p class="floatLeft nombreDelBoliche futura w100" style="margin-bottom:5px !important;"><strong>'+v[$i]['titulo']+'</strong></p>\
                                        <p class="floatLeft direccionDelBoliche futura" style="margin-top:8px;">'+v[$i]['dir_boliche']+'</p>\
                                        <p class="floatLeft provinciaDelBoliche futura" style="clear:both;">'+v[$i]['barrio']+'</p>\
                                        <p class="floatLeft botonVerMas verMore icon add"><span class="oculto">'+v[$i]['id']+'</span>Deslize para ver m&aacute;s</p>\
                                    </div>\
                                </div>';
                            $j++;
                    }
                    else if( mes > v['compara_mes'] )
                    {
                        $ht += '<div class="swiper-slide W257X112" id="'+v[$i]['id']+'" style="width:'+parseInt($(window).width())+'px; height:133px !important; background-color:'+$col+' ">\
                                    <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                        <img src="http://www.reiatsu.com.ar/clientes/frizze/facebook/fiestas_frizze/'+v[$i]['imagen']+'" class="floatLeft" style="width:60px;" />\
                                        <div class="floatLeft" style=" width:120px;text-align:center;font-size:0.8em !important">'+v[$i]['fecha']+'</div>\
                                    </div>\
                                    <div class="floatLeft acomodaTextoIzquierda">\
                                        <p class="floatLeft nombreDelBoliche futura w100" style="margin-bottom:5px !important;"><strong>'+v[$i]['titulo']+'</strong></p>\
                                        <p class="floatLeft direccionDelBoliche futura" style="margin-top:8px;">'+v[$i]['dir_boliche']+'</p>\
                                        <p class="floatLeft provinciaDelBoliche futura" style="clear:both;">'+v[$i]['barrio']+'</p>\
                                        <p class="floatLeft botonVerMas verMore icon add"><span class="oculto">'+v[$i]['id']+'</span>Deslize para ver m&aacute;s</p>\
                                    </div>\
                                </div>';
                            $j++;
                    }
                    else
                    {
                        $htv += '<div class="floatLeft cajitaEventoBoliche" id="'+v[$i]['id']+'">\
                                    <div class="floatLeft overflowHidden clickReemplazlocajitaEventoBoliche contenedorImagenMini imagenBoliche">\
                                        <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                    </div><div class="clearBoth"></div>\
                                    <div class="floatLeft futura nombreBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['titulo']+'</div>\
                                    <div class="floatLeft futura fechaBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['fecha']+'</div>\
                                    <div class="clearBoth"></div><div class="floatLeft verGaleria"><a href="'+$verGaleria+'" '+$esty+' target="_blank">VER GALERIA</a></div> \
                                </div>';
                                $b++;

                    } //Si el evento que compara es de este mes pero ya paso
                }
                else
                {
                    $htv += '<div class="floatLeft cajitaEventoBoliche" id="'+v[$i]['id']+'">\
                                    <div class="floatLeft overflowHidden clickReemplazlocajitaEventoBoliche contenedorImagenMini imagenBoliche">\
                                        <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                    </div><div class="clearBoth"></div>\
                                    <div class="floatLeft futura nombreBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['titulo']+'</div>\
                                    <div class="floatLeft futura fechaBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['fecha']+'</div>\
                                    <div class="clearBoth"></div><div class="floatLeft verGaleria"><a href="'+$verGaleria+'" '+$esty+' target="_blank">VER GALERIA</a></div> \
                                </div>';
                                $b++;
                } //Si el evento que compara es del mes pasado

            } // termina bucle
            
            /*$("#cargaBoliViejos").html($htv);*/
            $("#cargaPresentes").html($ht);
            $(".cargador").remove();

            $(".W257X112").on( "swiperight", function() {
                $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                $(this).css("overflow","hidden").append($cargador1);
                id = $(this).attr("id");
                muestraEvento(id,'eventosactivos.php');
            }).on( "swipeleft", function() {
                $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                $(this).css("overflow","hidden").append($cargador1);
                id = $(this).attr("id");
                muestraEvento(id,'eventosactivos.php'); 
            });

            $(".verMore").on( "click", function() {
                $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                $(this).parent().parent().css("overflow","hidden").append($cargador1);
                id = $(this).find('span').html();
                muestraEvento(id,'eventosactivos.php');
            });

            
            $("html, body").width(parseInt($(window).width())).height(parseInt($(window).height()));
            cargaSlides();
        }   
    }
    else if( xq == "traeInfo" )
    {
        if(v != null)
       {    

            $(".info1").css("margin-top","2em").hide();
            $(".info2").css("margin-top","-2em").show();

            $w = parseInt($(window).width());
            $ht = '<div class="header">'+v[0]['titulo']+' - <small style="font-size:16px; color:#cdcdcd"> '+v[0]['fecha']+' </small></div><div class="headerSombra"></div>';
            $ht += '<div class="contenedor floatLeft">\
                        <div class="imagen">\
                            <img src="https://maps.googleapis.com/maps/api/staticmap?center='+v[0]['dir_boliche']+', '+v[0]['barrio']+', '+v[0]['provincia']+', Argentina&zoom=16&size='+parseInt($(window).width())+'x200&markers='+v[0]['dir_boliche']+', '+v[0]['barrio']+', '+v[0]['provincia']+'|&sensor=false" width="'+parseInt($(window).width())+'" height="200" alt="CARGANDO..."/>\
                        </div>\
                        <div class="dir" style="height: 17px; padding: 10px !important; padding-top: 12px !important; font-size: 13px; font-weight: bold; color: #ffc000; margin-bottom: 1.3em !important; -webkit-box-shadow: -5px -6px 30px #ffc000;">\
                            <img src="template/fondo/pin.png" style="width: 34px; margin-right:3px !important;float: right; margin-top: -9px !important;" />'+v[0]['dir_boliche']+', '+v[0]['barrio']+'\
                        </div>\
                        <div class="texto">'+v[0]['texto']+'</div>\
                   </div>\
\
                    <div class="swiper-slide red-slide overflowHidden" id="muestraRedSocial" style="width:'+parseInt($(window).width())+'px">\
                      <div class="header"><div class="floatRight" style="margin-right:9px;"><img src="template/cruz.png" /></div></div><div class="headerSombra"></div>\
                      <div class="w100">\
                        <div class="clearBoth"></div>\
                        <form name="guardaAsociado">\
                          <input type="hidden" name="id" value="'+v[0]['id']+'" />\
                          <div class="futura floatLeft avisoEmail">Ingres&aacute; tu email para tener un recordatorio del evento.</div>\
                          <input type="text" name="email" class="aviso button1" placeholder="example@example.com" value="" />\
                          <div class="clearBoth"></div>\
                          <!-- <p class="floatLeft botonVerMas icon addFbc modifications" onclick="postFace"></p>--> <input type="submit" class="floatRight botonVerMas1 submitEnviar button1" value=" ENVIAR " />\
                        </form>\
                      </div>\
                  </div>';

            $("#muestraContenido").html($ht);
            $(".acomodaAlto").css("-webkit-transform","translate3d(-"+($w)+"px, 0px, 0px)");
            $(".cargador").remove();

            sum = parseInt($(".titulo").height()) + parseInt($(".imagen").height()) + parseInt($(".dir").height());
            tot = parseInt($(window).height())-sum;
            $(".texto").height(tot-150);
            $(".texto").niceScroll({touchbehavior:true});

            $(".nicescroll-rails, .nicescroll-rails div").css({left: parseInt($(window).width())-12});
            $("#muestraContenido").on( "swipeleft", function() {
                    $("#muestraRedSocial").css("-webkit-transform","translate3d(0px, -4em, 0px)");
                    
                    $("form[name=guardaAsociado]").submit(function(a){
                        a.preventDefault();
                        // creamos nuestra regla con expresiones regulares.
                        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                        
                        if($("form[name=guardaAsociado] input[name=email]").val() != '' )
                            if( validar_email($("form[name=guardaAsociado] input[name=email]").val()) )
                            {                
                                $data = 'h=cargaEmail&'+$("form[name=guardaAsociado]").serialize();
                                lmPost($url,$data,"cargaEmail");
                            }
                            else
                            {   
                                alert("E-mail incorrecto");
                            }                    
                        else
                        {
                            alert("Ingrese su email");
                        }        
                    });
            }).on( "swiperight", function() {
                    $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                    $(".info2").css("margin-top","2em").hide();
                    $(".info1").css("margin-top","-2em").show();
                    $("#muestraContenido").html("");
            });

            $(".bot1").on('click',function(){
                $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                $(".info2").css("margin-top","2em").hide();
                $(".info1").css("margin-top","-2em").show();
                $("#muestraContenido").html("");
            });
            
            $(".bot3").on('click',function(){
                    $("#muestraRedSocial").css("-webkit-transform","translate3d(0px, -4em, 0px)");
                    
                    $("form[name=guardaAsociado]").submit(function(a){
                        a.preventDefault();
                        // creamos nuestra regla con expresiones regulares.
                        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                        
                        if($("form[name=guardaAsociado] input[name=email]").val() != '' )
                            if( validar_email($("form[name=guardaAsociado] input[name=email]").val()) )
                            {                
                                $data = 'h=cargaEmail&'+$("form[name=guardaAsociado]").serialize();
                                lmPost($url,$data,"cargaEmail");
                            }
                            else
                            {   
                                alert("E-mail incorrecto");
                            }                    
                        else
                        {
                            alert("Ingrese su email");
                        }        
                    });
            });
            $("#muestraRedSocial .header,#muestraRedSocial .headerSombra").on('click',function(){
                    $("#muestraRedSocial").css("-webkit-transform","translate3d(0px, 5em, 0px)");
            });
        }
    }
    else if( xq == "donde" )
    {
        if(v != null)
            if(v['aviso'] != "")
                cargaLoadDelSite(v['aviso']);

    }
    else if( xq == "cargaEmail" )
    {
       $("#muestraRedSocial").css("-webkit-transform","translate3d(0px, 5em, 0px)"); 
       alert(v['aviso']);
    }

}