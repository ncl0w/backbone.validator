/* ____________________________________________________________________________________
 * 
 * 	SOPORTE MULTI-IDIOMA - INGLES
 * ____________________________________________________________________________________
 *
 * 	El siguiente objeto incluye las traducciones en ingles y en español de los mensajes
 *  que se manejan en Validator, en la configuracion debe establecerse el idioma que se manejara.
 *  En caso de necesitar nombres de campos hay que incluirlos en su clave dentro de fields
 */

Validator.Lang['en-us'] = 
{	
	fields: {},
	/*
	 * Mensajes que retornan los errores de validacion para el idioma ingles
	 */
	messages : {
		required 	: 'The field is required.',
		string 		: 'The field must be a text.',
		boolean 	: 'The field must be True or False.',
		integer 	: 'The field must be an integer.',
		in 			: 'The field must be in: :arg1.',
		not_in 		: 'The :field field must not be in: :arg1.',
		array 		: 'The field must be an array.',
		min 		: 'The field must be at least: :arg1.',
		minLength 	: 'The field must be at least a length of :arg1.',
		max 		: 'The field may not be greater than: :arg1.',
		maxLength 	: 'The field length may not be greater than: :arg1.',
		between 	: 'The field must be between: :arg1 y :arg2.',
		betweenLength: 'The field length must be between: :arg1 y :arg2 catacters.',
		length 		: 'The field length must be: :arg1.',
		same 		: 'The :field field must be same to :field_eq.',
		different 	: 'The :field field must be different to :field_eq.',
		confirmed 	: 'The confirmation does not match.',
		exists 		: 'The :value :field is not registred into :collection list.',
		unique 		: 'The :value :field is already registred into :collection list.',
		email 		: 'The format is not a valid email.',
		mimes 		: 'The file format is not valid.',
		regex 		: 'The format is not valid.',
		date 		: 'The format is not valid, must be a date.',
		before 		: 'The date must be before to :arg1.',
		after 		: 'The date must be after to :arg1.',
	},
	/*
	 * Mensajes para cuando el modo debug esta en True, se uestran por consola
	 */
	info : {
		start_validation 	: 'Start validation for: ',
		end_validation 		: 'End validation for: ',
		validated 			: 'Validated: ',
		result 				: 'Result: ',
		success 			: 'Success.'
	},
	validations : {
		invalid_field 	: 'The :field field is not defined in model.',
		invalid_collection 	: 'The :collection collection is not defined.',
		numeric_args 	: ':function : Arguments must be numeric.',
		required_arg 	: ':function : must pass at least one parameter to validation].',
		required_args 	: ':function : must pass :num parameters to validation.',
		invalid_rule 	: 'the :rule rule is not defined.',
		except_format 	: 'Except into unique rule must be an Integet idenfirier',
		invalid_date 	: ':function : Argument must be date.',
	}
	
}