/* ____________________________________________________________________________________
 * 
 * 	SOPORTE MULTI-IDIOMA - ESPAÑOL
 * ____________________________________________________________________________________
 *
 * 	El siguiente objeto incluye las traducciones en ingles y en español de los mensajes
 *  que se manejan en Validator, en la configuracion debe establecerse el idioma que se manejara.
 *  En caso de necesitar nombres de campos hay que incluirlos en su clave dentro de fields
 */

Validator.Lang['es-mx'] = 
{
	fields: {},
	/*
	 * Mensajes que retornan los errores de validacion para el idioma español
	 */
	messages : {
		required 	: 'El campo es requerido.',
		string 		: 'El campo debe ser un texto.',
		boolean 	: 'El campo debe ser verdadero o falso.',
		integer 	: 'El campo debe ser un número.',
		in 			: 'El campo debe estar en: :arg1.',
		not_in 		: 'El campo :field no debe estar en: :arg1.',
		array 		: 'El campo debe ser un arreglo.',
		min 		: 'El campo debe ser mayor o igual a: :arg1.',
		minLength 	: 'El campo debe tener una longitud mayor o igual a: :arg1.',
		max 		: 'El campo debe ser menor o igual a: :arg1.',
		maxLength 	: 'El campo debe tener una longitud menor o igual a: :arg1.',
		between 	: 'El campo debe estar entre: :arg1 y :arg2.',
		betweenLength: 'El campo debe tener una longitud entre: :arg1 y :arg2 caracteres.',
		length 		: 'El campo debe tener una longitud igual a: :arg1.',
		same 		: 'El campo :field debe ser igual al campo :field_eq.',
		different 	: 'El campo :field debe ser diferente al campo :field_eq.',
		confirmed 	: 'El campo debe ser confirmado correctamente.',
		exists 		: 'El :field :value no existe en el registro de :collection.',
		unique 		: 'El :field :value ya existe en el registro de :collection.',
		email 		: 'El campo debe ser un email válido.',
		mimes 		: 'El formato del archivo es inválido.',
		regex 		: 'El formato del campo no es válido.',
		date 		: 'El formato del campo no es válido, debe ser una fecha.',
		before 		: 'La fecha debe ser anterior a :arg1.',
		after 		: 'La fecha debe ser posterior a :arg1.',
	},
	/*
	 * Mensajes para cuando el modo debug esta en True, se uestran por consola
	 */
	info : {
		start_validation 	: 'Inicio de la validación para: ',
		end_validation 		: 'Fin de la validacion para: ',
		validated 			: 'Se validó: ',
		result 				: 'Resultado: ',
		success 			: 'Correcto.'
	},
	validations : {
		invalid_field 	: 'El campo :field no esta definido en el modelo.',
		invalid_collection 	: 'La coleccion :collection no esta definida.',
		numeric_args 	: ':function : Los argumentos deben ser numericos.',
		required_arg 	: ':function : debes pasar al menos un parametro a la validación].',
		required_args 	: ':function : debes pasar :num parametros a la validación.',
		invalid_rule 	: 'La regla :rule no está definida.',
		except_format 	: 'El atributo except en la regla Unique debe ser un Identificador.',
		invalid_date 	: ':function : El argumento deben ser una fecha.',
	}

}