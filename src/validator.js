_.extend(Backbone.Model.prototype, {
	/*
	 * Motor de validaciones simples, primero valida lo contenido en validatorRules
	 * luego, en caso de existir el metodo 'moreValidations', lo ejecuta.
	 */
	validate : function(model, options)
	{	
		if(this.validation == true)
		{
			//info(getMessage('info', 'start_validation') + JSON.stringify(this.toJSON()));

			var errors = {};
			var moreErrors = {};
			var arrErrors = _.map(this.validatorRules, this.makeValidation, this);

			if(typeof(this.moreValidations) == 'function')
			{
				moreErrors = this.moreValidations();
			}

			if( ! _.isEmpty(arrErrors) )
			{
				//convertir array a objeto
				for (var i = 0; i <= arrErrors.length; i++) 
				{
					_.extend(errors, arrErrors[i]);
				};

			}

			/*
			 * En caso de recibir mas errores de validacion
			 */
			if(moreErrors !== undefined)
			{
				/*
				 * Recorremos el objeto para ir agregando los errores a
				 * sus respectivos lugares
				 */
				_.each(moreErrors, function(value, key, obj)
				{
					/*
					 * Si existe la key del error le pone los demas
					 */
					if(this.hasOwnProperty(key))
					{
						for(i in value)
						{
							this[key].push(value[i]);
						}
					}
					/*
					 * Si no existe la genera
					 */
					else
					{
						this[key] = value;
					}
				}, errors);
			}

			//info(getMessage('info', 'end_validation') + JSON.stringify(this.toJSON()));
			
			if( ! _.isEmpty(errors) )
			{
				info("Errores al validar: " + JSON.stringify(errors));
				return errors; 
			}
		}
	},
	/*
	 * recibe un campo del modelo con las reglas que se deben aplicar al mismo
	 * formatea cada regla y la ejecuta
	 */
	makeValidation : function(rules, field_r, list)
	{	
		if(rules == "") return;

		var errors = {};
		var arrRules = rules.split("|");
		var field = "'" + field_r + "'";					// 'field'

		/*
		 * Entramos al ciclo para cada regla que se haya definido para el campo
		 */
		for(i in arrRules)
		{	
			var rule = arrRules[i];
			/*
			 * parts[0] = rule
			 * parts[1] = args sin formato
			 */
			var parts = rule.split(":");
			/*
			 * Validando que se este ejecutanto una regla existente
			 */
			if(typeof(eval('this.' + parts[0])) == 'undefined')
			{
				throw new SyntaxError(getMessage('validations', 'invalid_rule').replace(':rule', parts[0]));
			}
			/*
			 * formando expresion base
			 */
			var expBase = parts[0] + '(*);'; 				// rule(*);
			var args = '';
			/*
			 * formateando argumentos (en caso de existir) para que sean como de expresion
			 */
			if(parts[1] !== undefined)
			{	
				/*
				 * Ojo con la expresion regular (/,/gi), estamos diciendo que cambie todos los , a lo largo de toda la cadena, no solo la primer coincidencia
				 */
				parts[1] = parts[1].replace(/,/gi, "','"); 	// arg1','arg2
				args = ",'" + parts[1] + "'"; 				// ,'arg1','arg2'
			}
			/*
			 * Quitando posibles argumentos vacios ,''
			 */
			args = args.replace(",''", "");

			/*
			 * Agregando argumentos completos a la expresion
			 */
			expBase = expBase.replace("*", field + args); 	// rule('field','arg1','arg2');
			var exp = 'this.' + expBase; 					// this.rule('field','arg1','arg2');
			/*
			 * Ejecutanto expresion
			 */
			var error = eval(exp);
			//info(getMessage('info', 'validated') + field_r + '->' + rule + '  |  ' + getMessage('info', 'result') + ((error == undefined) ? (getMessage('info', 'success')) : error));

			if(error !== undefined)
			{	
				errors[field_r] = errors[field_r] || new Array();
				errors[field_r].push(error);
			}
		}

		return errors;
	},
	/*
	 * Funciones/Reglas pedefinidas
	 *
	 *
	 * Valida que el valor del campo es necesario
	 */
	required : function(field)
	{
		if(this.get(field) === '' || this.get(field) === null || this.get(field) === undefined)
		{	
			return getMessage('messages', 'required');
		}
	},
	/*
	 * Valida que el valor del campo sea string
	 */
	string : function(field)
	{
		if(typeof(this.get(field)) !== 'string')
		{
			return getMessage('messages', 'string');
		}
	},
	/*
	 * Valida que el valor del campo sea numerico
	 */
	integer : function(field)
	{
		if(typeof(this.get(field)) !== 'number')
		{
			return getMessage('messages', 'integer');
		}
	},
	/*
	 * Valida que el valor del campo si este en la lista de valores que se pasan como argumentos
	 */
	in : function(field)
	{	
		this.validateArguments(arguments, 'in');
		
		var value = this.get(field);
		var args = this.argsWithoutFirst(arguments);
		var pos = args.indexOf(value+'');
		
		if(pos === -1)
		{	
			return getMessage('messages', 'in').replace( ":arg1", args.toString().replace(',',', ') );			
		}
		
	},
	/*
	 * Valida que el valor del campo no este en la lista de valores que se pasan como argumentos
	 */
	not_in : function(field)
	{	
		this.validateArguments(arguments, 'not_in');

		var value = this.get(field);
		var args = this.argsWithoutFirst(arguments);
		var pos = args.indexOf(value+'');

		if(pos !== -1)
		{
			return getMessage('messages', 'not_in').replace( ":arg1", args.toString().replace(',',', ') );			
		}
		
	},
	/*
	 * Valida que el campo sea un array
	 */
	array : function(field)
	{	
		if(this.get(field) instanceof Array == false)
		{
			return getMessage('messages', 'array');
		}
	},
	/*
	 * Valida que el valor del campo tenga como minimo el valor que se pasa como argumento
	 * validacion correcta solo para enteros
	 */
	min : function(field)
	{
		this.validateArguments(arguments, 'min');
		this.validateArgumentsNumeric(this.argsWithoutFirst(arguments), 'min');

		if(typeof(this.get(field)) !== 'number' || +this.get(field) < +(arguments[1]))
		{
			return getMessage('messages', 'min').replace(":arg1", arguments[1]);						
		}
	},
	/*
	 * Valida la longitud minima de cadenas y numeros
	 */
	minLength: function(field)
	{
		this.validateArguments(arguments, 'minLength');
		
		if(this.get(field).toString().length < +(arguments[1]))
		{
			return getMessage('messages', 'minLength').replace(":arg1", arguments[1]);						
		}
	},
	/*
	 * Valida que el valor del campo tenga como maximo el valor que se pasa como argumento
	 */
	max : function(field)
	{
		this.validateArguments(arguments, 'max');
		this.validateArgumentsNumeric(this.argsWithoutFirst(arguments), 'max');

		if(typeof(this.get(field)) !== 'number' || +this.get(field) > +(arguments[1]))
		{
			return getMessage('messages', 'max').replace(":arg1", arguments[1]);						
		}
	},
	/*
	 * Valida la longitud maxima de cadenas y numeros
	 */
	maxLength: function(field)
	{
		this.validateArguments(arguments, 'maxLength');
		
		if(this.get(field).toString().length > +(arguments[1]))
		{
			return getMessage('messages', 'maxLength').replace(":arg1", arguments[1]);						
		}
	},
	/*
	 * Valida que el valor del campo este entre los 2 valores que se pasan como argumentos
	 */
	between : function(field)
	{
		this.validateArguments(arguments, 'between', 2);
		this.validateArgumentsNumeric(this.argsWithoutFirst(arguments), 'between');

		if(+this.get(field) < +(arguments[1]) || +this.get(field) > +(arguments[2]))
		{
			return getMessage('messages', 'between')
							 .replace(":arg1", arguments[1])
							 .replace(":arg2", arguments[2]);						
		}
	},
	/*
	 * Valida que la longitud de cadena o numero estre entre los valores establecidos
	 */
	betweenLength : function(field)
	{
		this.validateArguments(arguments, 'betweenLength', 2);
		this.validateArgumentsNumeric(this.argsWithoutFirst(arguments), 'between');

		if(this.get(field).toString().length < +(arguments[1]) || this.get(field).toString().length > +(arguments[2]))
		{
			return getMessage('messages', 'betweenLength')
							 .replace(":arg1", arguments[1])
							 .replace(":arg2", arguments[2]);						
		}
	},
	/*
	 * Evalua que la longitu de un numero o cadena sea exacta a la que se pasa como parametro
	 */
	length: function(field, length)
	{
		this.validateArguments(arguments, 'length');
		
		if(this.get(field).toString().length !== +(arguments[1]))
		{	
			return getMessage('messages', 'length').replace(":arg1", arguments[1]);						
		}
	},
	/*
	 * Valida que el valor del campo exista en el campo (collection_field) de una coleccion
	 * normalmente para relaciones, asi tu validas que algun id foraneo exista antes
	 * normalmente en coleccion debe pasarse el puro nombre, ya que la libreria se encarga 
	 * de buscarla en window.collections
	 *
	 * Para el caso de campos con id_ incluido en su nombre, 
	 * no es necesario especificarlos en lang
	 */
	exists : function(field, collection_name, collection_field)
	{
		var collection = 'window.collections.' + collection_name;

		//this.fieldDefined(field);
		this.collectionDefined(collection);

		var value = this.get(field);
		var real_collection = eval(collection);
		var results = eval('real_collection.where({' + collection_field + ': value})');

		if(results.length == 0)
		{
			return getMessage('messages', 'exists')
							 .replace(":value", value)
							 .replace(":field", getMessage('fields', field))
							 .replace(":collection", getMessage('fields', collection_name));
		}
	},
	/*
	 * Contrario al anterior, aqui se valida que sea único.
	 */
	unique : function(field, collection_name, collection_field, except)
	{
		var collection = 'window.collections.' + collection_name;

		//this.fieldDefined(field);
		this.collectionDefined(collection);

		var value = this.get(field);
		var real_collection = eval(collection);
		var results = eval('real_collection.where({' + collection_field + ': value})');

		if(results.length > 0)
		{
			/*
			 * validar que si el resultado equivale al mismo modelo, te permita guardar (except)
			 */
			 if(except != undefined)
			 {
			 	except = parseInt(except);

			 	if(typeof(except) !== 'number')
				{
					throw new SyntaxError(getMessage('validations', 'except_format'));
				}
				else
				{
					if(results[0].id === except)
					{
						return;
					}
				}
			 }

			return getMessage('messages', 'unique')
							 .replace(":value", value)
							 .replace(":field", getMessage('fields', field))
							 .replace(":collection", getMessage('fields', collection_name));
		}
	},
	/*
	 * Valida que exista otro campo lamado igual al campo en validacion pero con _confirmation
	 * y que ademas tenga el mismo valor al campo en validacion
	 */
	confirmed : function(field)
	{	
		this.fieldDefined(field);
		this.fieldDefined(field + '_confirmation');

		var value = this.get(field);
		var field_conf = field + '_confirmation';
		var value2 = this.get(field_conf);

		if(value !== value2)
		{
			return getMessage('messages', 'confirmed');
		}

	},
	/*
	 * valida que un campo sea igual al campo pasado como argumento dentro del mismo modelo
	 */
	same : function(field, field_eq)
	{
		this.fieldDefined(field);
		this.fieldDefined(field_eq);

		if(this.get(field) != this.get(field_eq))
		{
			return getMessage('messages', 'same')
							 .replace(":field", getMessage('fields', field))
							 .replace(":field_eq", getMessage('fields', field_eq));
		}
	},
	/*
	 * valida que un campo sea diferente al campo pasado como argumento dentro del mismo modelo
	 */
	different : function(field, field_eq)
	{
		this.fieldDefined(field);
		this.fieldDefined(field_eq);

		if(this.get(field) == this.get(field_eq))
		{
			return getMessage('messages', 'different')
							 .replace(":field", getMessage('fields', field))
							 .replace(":field_eq", getMessage('fields', field_eq));
		}
	},
	/*
	 * Valida que el valor del campo sea de boleano
	 */
	boolean : function(field)
	{
		//this.fieldDefined(field);

		if(typeof(this.get(field)) !== 'boolean')
		{
			return getMessage('messages', 'boolean');
		}
	},
	/*
	 * Validacion sobre un campo para que sea un email valido
	 */
	email : function(field)
	{	
		if(! emailValid(this.get(field)))
		{
			return getMessage('messages', 'email');
		}
	},
	/*
	 * Validando que un archivo sea base 64 en base a lo que llega de argumento 
	 */
	mimes : function(field)
	{
		//this.fieldDefined(field);
		this.validateArguments(arguments, 'mimes');
		var types = this.argsWithoutFirst(arguments);

		var pos_i = this.get(field).indexOf('/') + 1;
		var pos_f = this.get(field).indexOf(';');
		var type = this.get(field).substring(pos_i, pos_f);

		if(types.indexOf(type) === -1)
		{
			return getMessage('messages', 'mimes');
		}

	},
	date: function(field)
	{
		if(isNaN(Date.parse(this.get(field))))
		{	
			return getMessage('messages', 'date');
		}
	},
	/*
	 * validamos que el campo de tipo fecha sea una fecha posterior a la proporcionada como argumento
	 */
	after : function(field, arg)
	{
		var date = Date.parse(this.get(field));
		var dateComp = parseInt(arg);
		var argDate = Date.parse(arg);
		
		if(isNaN(parseInt(argDate)))
		{	
			throw getMessage('validations', 'invalid_date').replace(":function", 'after');
		}

		if(isNaN(date) || date <= argDate)
		{
			return getMessage('messages', 'after').replace(":arg1", arg);
		}
	},
	/*
	 * validamos que el campo de tipo fecha sea una fecha anterior a la proporcionada como argumento
	 */
	before : function(field, arg)
	{
		var date = Date.parse(this.get(field));
		var dateComp = parseInt(arg);
		var argDate = Date.parse(arg);

		if(isNaN(parseInt(argDate)))
		{	
			throw getMessage('validations', 'invalid_date').replace(":function", 'after');
		}
		
		if(isNaN(date) || date >= argDate)
		{
			return getMessage('messages', 'before').replace(":arg1", arg);
		}

	},
	/* HELPERS
	 *
	 * Pasa los arguments a un array real
	 */
	argsToArray : function(args)
	{
		var list = new Array();

		for(i in args)
		{
			list.push(args[i]);
		}

		return list;
	},
	/*
	 * Retorna la lista de argumentos sin el primero
	 */
	argsWithoutFirst : function(args)
	{
		var argsAndField = this.argsToArray(args);

		return argsAndField.slice(1, argsAndField.length);
	},
	/*
	 * Si num_args no se pasa, se valida que al menos exista un argumento en la validacion
	 * Si num_args si se pasa, se valida que exista ese numero de argumentos
	 */
	validateArguments : function(args, name_func, num_args)
	{	
		if(args.length < 2 || (args.length == 2 && args[1] == ""))
		{
			throw new SyntaxError(getMessage('validations', 'required_arg')
											.replace(":function", name_func));
		}
		if(num_args !== undefined)
		{
			if(args.length-1 < num_args)
			{	
				throw new SyntaxError(getMessage('validations', 'required_args')
												.replace(":function", name_func)
												.replace(":num", num_args));
			}
		}
	},
	/*
	 * Comprobando que todos los argumentos recibidos sean numericos 
	 */
	validateArgumentsNumeric : function(args, name_func)
	{	
		for(i in args)
		{	
			if(typeof(parseInt(args[i])) !== 'number' || isNaN(parseInt(args[i])))
			{	
				throw new SyntaxError(getMessage('validations', 'numeric_args')
												.replace(":function", name_func));
			}
		}
	},
	/*
	 * El campo debe existir, ademas si no lo has puesto en lang para raduccion te lo marca
	 */
	fieldDefined : function(field)
	{	
		var field_trad = getMessage('fields', field);

		if(this.get(field) == undefined)
		{
			throw getMessage('validations', 'invalid_field')
							.replace(":field", ((field_trad == undefined) ? field + ':not_in_lang' : field_trad));
		}
	},
	/*
	 * Valida que una coleccion este definida en window.collections
	 */
	collectionDefined : function(collection)
	{
		if(eval(collection) == undefined)
		{
			throw getMessage('validations', 'invalid_collection')
							.replace(":collection", collection_name);
		}
	}
});