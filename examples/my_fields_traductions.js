/*
 * Agregando campos para traduccion,
 * son tomados en cuenta por Validator a la hora de desplegar los errores,
 * estos campos equivalen a los nombres de los atributos del modelo
 */
Validator.Lang['en-us'].fields = {
	name 	: 'Name',
	age 	: 'Age',
	address : 'Address',
	phone	: 'Phone',
	phone_confirmation : 'Phone confirmation',
	type 	: 'Type',
	admin 	: 'Administrator',
	other 	: 'Other',
	jobs 	: 'Jobs',
	country : 'Country',
	countries : 'Countries'
};

Validator.Lang['es-mx'].fields = {
	name 	: 'Nombre',
	age 	: 'Edad',
	address : 'Domicilio',
	phone	: 'Teléfono',
	phone_confirmation : 'Confirmacion del teléfono',
	type 	: 'Tipo',
	admin 	: 'Administrador',
	other 	: 'Otro',
	jobs 	: 'Trabajos',
	country : 'Pais',
	countries : 'Paises'
};