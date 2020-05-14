var level=2,				//level^2 = tamaño del escenario
	values=[],				//array de opacidades
	lastOpacity=0,			//opacidad del último elemento
	actualOpacity=0,		//opacidad del elemento seleccionado
	count=0;
//----IMPRIMIR MENSAJE----//

function imprimir(texto,color){
	$(".alert").css('color',color).html(texto).fadeIn(150).delay(100).fadeOut(150);
}

function sort(array){									//RANDOM-SORT
    for(var i = array.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    return array;
}
function generarArray(dim){								//PREPARAR ARRAY
	items=Math.pow(dim,2);								//cantidad de opacidades
	factor=Number((1/items).toFixed(2)); 				//factor opacity
	for(var i=0; i<items; i++){							//inicializar array
		values[i]=factor*i;
	};
	sort(values);										//DESORDENAR ARRAY
}
function generarMapa(dim){								//GENERAR MAPA
	generarArray(level);
	$("table").empty();
	for (var i=1; i<=dim; i++){
		$("table").append('<tr class='+i+'></tr>')
		for(var j=1; j<=dim; j++){
			$("."+i).append('<td class='+i+j+'></td>')
			$("."+i+j).css("opacity",values.pop())
		}
	}
}
function reiniciar(){
	values=[]
	lastOpacity=0;
 	factor=0;
 	count=0;
}
$(document).ready(function(){							//PROGRAMA PRINCIPAL
	reiniciar();
	generarMapa(level);
 	
 	$("table").on("click","td",function(){							//----MOUSE-SELECTION------------------------
 		var actualOpacity=(Number($(this).css("opacity"))).toFixed(2);
 		console.log("actual = "+actualOpacity);
 		console.log("ultimo = "+lastOpacity);
 		if (actualOpacity==lastOpacity){
 			imprimir(":)","#2ecc71");
 			$(this).hide(100).remove();
 			count++;
 			lastOpacity+=factor;
 			lastOpacity=Number((Number(lastOpacity)).toFixed(3));
 			console.log(typeof lastOpacity);
 			console.log("ultimo = "+lastOpacity);
 			if(count>=items){
 				reiniciar();
 				generarMapa(++level);
 			}
 		}else{
 			imprimir(":(","#e74c3c");
 		}
 	});
});