/*____________________________________________________________________________________
 * 
 * 	HELPERS GLOBALES
 *____________________________________________________________________________________*/

/*
 * Funcion que resibe un mensaje para ponerlo en consola en caso de que debug este en True
 */
var info = function(exp)
{
	if(Validator.Config.debug == true)
	{
		console.info(exp);
	}
}

var emailValid = function(email)
{
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ( !expr.test(email) )
        return false;
    return true;
}

/*
 * Funcion que retorna un mensaje del objeto Lang segun el idioma configurado, 
 * se requere la categoria del mensaje y su clave
 *
 * Ej. getMessage('statusCodes', '500') -> 'Internal server error'
 */
var getMessage = function(category, id)
{	
	id = id.toString();
	var lang = Validator.Config.lang;
	var resp = Validator.Lang[lang][category][id];

	/*
	 * Si se intenta encontrar algun campo que contenga id, y la respuesta es undefined
	 * automaticamente que le ponga Identificador como respuesta
	 */

	if(id.indexOf('id') != -1 && resp == undefined)
	{
		resp = 'Identificador';
	}

	if(resp == undefined)
	{
		resp = id.substr( 0, 1 ).toUpperCase() + id.substr( 1 );
	}

	return resp;
}
/*
 * Recibe un array que tiene todos sus nodos en formato string y los convierte a int
 */
var arrayStringsToInts = function(array)
{
	for(var i=0; i<array.length; i++) array[i] = +array[i];

	return array;
}




