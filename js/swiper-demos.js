$cargador = '<div class="positionAbsolute aja" style="z-index:900; width:'+parseInt($(window).width())+'px; height:'+parseInt($(window).height())+'px;">\
                <div class="w100 h100 floatLeft cargador" style="background-color:#000000">\
                <div> Cargando </div>\
                <div id="circular" class="">\
                    <div id="circular_1" class="circular"></div>\
                    <div id="circular_2" class="circular"></div>\
                    <div id="circular_3" class="circular"></div>\
                    <div id="circular_4" class="circular"></div>\
                    <div id="circular_5" class="circular"></div>\
                    <div id="circular_6" class="circular"></div>\
                    <div id="circular_7" class="circular"></div>\
                    <div id="circular_8" class="circular"></div>\
                    <div class="clearfix"></div>\
                </div>\
                <div class="imagencita">\
                    <img src="template/fondo/2.png" alt="envases"/>\
                </div>\
            </div></div>';

document.createElement('header');
document.createElement('footer');

$(document).ready(function(){

	$("form[name=cargaInicio]").submit(function(a){
            a.preventDefault();
            id = $("select[name=cambiaProvincia]").val();
            if(id != "-" )
            	provContDonde(id,"0");
            else
            	alert("Elija una provincia");
    });
    $("#cargaPresentes").html($cargador);
});
function provContDonde(id,p)
    {
        switch(id)
        {
            case "0":
                //Buenos aires
                prov = "Buenos Aires";
            break;
            case 3:
                prov = "Cordoba";
            break;
            case 2:
                prov = "Entre Rios";
            break;
            case 12:
                prov = "Jujuy";
            break;
            case 16:
                prov = "Mendoza";
            break;
            case 17:
                prov = "Neuquen";
            break;
            case 10:
                prov = "Salta";
            break;
            case 15:
                prov = "San Juan";
            break;
            case 20:
                prov = "Santa Cruz";
            break;
            case 4:
                prov = "Santa Fe";
            break;
            case 9:
                prov = "Santiago del Estero";
            break;
            case 11:
                prov = "Tucuman";
            break;
            case 12:
                prov = "Jujuy";
            break;
            case 8:
                prov = "Catamarca";
            break;
            case 14:
                prov = "Chaco";
            break;
            case 13:
                prov = "Formosa";
            break;
            case 5:
                prov = "Corrientes";
            break;
            case 6:
                prov = "Misiones";
            break;
            case 7:
                prov = "La Rioja";
            break;
            case 1:
                prov = "San Luis";
            break;
            case 23:
                prov = "La Pampa";
            break;
            case 18:
                prov = "Rio Negro";
            break;
            case 21:
                prov = "Tierra del Fuego";
            break;
            case 19:
                prov = "Chubut";
            break;
            default:
                prov = "no disponible";
            break;
        }
        
        window.localStorage.setItem("prov", prov);
        keyname = window.localStorage.key("prov");
        // keyname is now equal to "key"
        prov = window.localStorage.getItem(keyname);
        
        window.location.href="interna.html";
    }
function funcionesDeCarga()
{
	$w = parseInt($(window).width());
	$h = parseInt($(window).height());
	
	$(".acomodaAlto, .swiper-n3, .red-slide, .swiper-n1, .swiper-n2").height($h);
    $('.swiper-nested1,.acomodaAlto').width($w*2);
    $("#cargaPresentes, #muestraInicial,#muestraContenido,#muestraRedSocial").width($w)
	$(".pagination-nested1").attr('style',"margin-top:"+($h-30)+'px !important;');

	keyname = window.localStorage.key("prov");
    // keyname is now equal to "key"
    prov = window.localStorage.getItem(keyname);

    keyname = window.localStorage.key("prov");
        // keyname is now equal to "key"
        prov = window.localStorage.getItem(keyname);
        if (prov != null && prov != "")
          cargaEventosHome(prov);

    $(".bot2").on('taphold',function(){
               alert("Frizzé pone todas las fiestas en tu mano.\r Desliza en la pantalla principal para ver toda la info de tu fiesta. \r En la pantalla de la info podes anotarte y seguir más de cerca todo lo que la fiesta tiene para vos.");
            }).click(function(){
               alert("Frizzé pone todas las fiestas en tu mano.\r Desliza en la pantalla principal para ver toda la info de tu fiesta. \r En la pantalla de la info podes anotarte y seguir más de cerca todo lo que la fiesta tiene para vos.");
            });
}


function cargaSlides()
{

	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	/*var swiperN1 = $('.swiper-n1').swiper({
		pagination : '.pagination-n1',
		slidesPerSlide : 1,
	});*/
	/*var swiperN2 = $('.swiper-n2').swiper({
		pagination : '.pagination-n2',
		slidesPerSlide : 2,
		mode: 'vertical'
	});*/
	var swiperN3 = $('.swiper-n3').swiper({
		pagination : '.pagination-n3',
		slidesPerSlide : 3,
		mode: 'vertical'
	});
	/*var swiperN4 = $('.swiper-n4').swiper({
		pagination : '.pagination-n4',
		slidesPerSlide : 2,
		mode: 'vertical'
	});*/
}

function muestraEvento(id)
{
	$data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfo");
}
