module.exports = function(grunt) 
{
	grunt.initConfig(
	{
		uglify : {
			options : {
				compress : false,
				report : true,
				banner : '/* \n * Backbone Validator v0.5 \n * \n * por: Mauricio Manjarrez Magallón, @wealthymaury \n * Minified on <%= grunt.template.date() %> \n */\n'
			},
			backbone_basic : {
				files : {
					"dist/en/backbone.validator.min.js" :[
						"src/config.js",
						"src/lang/en.js",
						"src/helpers.js",
						"src/validator.js"
					],
					"dist/es/backbone.validator.min.js" :[
						"src/config.js",
						"src/lang/es.js",
						"src/helpers.js",
						"src/validator.js"
					]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", 	["uglify"]);
};