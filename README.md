# backbone.validator
Este es un plugin que permite hacer validaciones a modelos Backbone utilizando una sintaxis inspirada en Laravel

/*
 * Backbone Validator v0.4
 *
 * por: Mauricio Manjarrez Magallón, @wealthymaury
 *____________________________________________________________________________________

	VALIDACION DE MODELOS AL ESTILO LARAVEL
  ____________________________________________________________________________________

 * Metodos:

	**  Para las validaciones, 
		el pluggin primero ejecutan las predefinidas descritas en (validatorRules), 
		y luego las demas que se definan en (moreValidations):

		1. validatorRules - metodo 
			puedes usar las siguientes validaciones:
				- required
				- string
				- integer
				- in: 			[lista de values(separados por ,)]  |	in:1,2,3
				- not_in: 		[lista de values(separados por ,)]  |	not_in:1,2,3
				- array
				- min:value     									|	min:1
				- minLength:value     								|	minLegth:1
				- max:value 										|	max:2
				- maxLength:value     								|	maxLegth:1
				- between:  	[2 valores separados por ,] 		|	between:1,5
				- betweenLength:[2 valores separados por ,] 		|	betweenLength:1,5
				- length: 											| 	length:5
				- same: 		[campo del modelo a evaluar] 		|	same:field
				- different: 	[campo del modelo a evaluar] 		|	different:field
				- confirmed 											
				- boolean
				- email
				- mimes 		[atributos] 						|  	mimes:png,jpg,jpeg

		2. moreValidations - opcional
			puedes incluir las condifiones necesarias para validar, respetando el principio de backbone
			que es retornar un objeto con los mensaje de error para cada atributo del modelo.

			moreValidations: function()
			{
				return {
					attr: [
						'error 1',
						'error 2'
					]
				}
			}

	Un campo del modelo puede tener multiples validaciones o ninguna

	EJEMPLOS:
	- validatorRules : {
			nombre 	: 'required|string|in:1,2',
			edad 	: 'required|integer|not_in:10,11'
	  },

	- moreValidations : function(model, options)
	  {
		if(algo)
		{
			return 'Mensjae de error';
		}
	  },

	CASO DE USO:
	
	3. var Person = Backbone.Model.extend(
		{
			urlRoot: '',
			validation : true,
			defaults : {
				name 	: 24,
				name_confirmation: 'a',
				avatar 	: '',
				type 	: 'a',
				email 	: null,
			},
			validatorRules : {
				name 		: 'required|string|confirmed|boolean|length:2',
				avatar 		: 'string|mimes:jpeg,png,jpg',
				type 		: 'required|string|in:adm,emp',
				email 		: 'required|string|email',
			},
			moreValidations: function()
			{
				return {
					name: [
						'Otro error',
						'Mas'
					]
				}
			}
		});

	mas informacion en cada funcion...
 */
