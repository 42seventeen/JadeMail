/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - Written by <%= pkg.author %> (<%= pkg.contact %>) */\n'
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '_bin',
                    src: ['*.scss'],  // Actual pattern(s) to match.
                    dest: '_bin',
                    ext: '.css',  // Dest filepaths will have this extension.
                }]
			}
		},
        jade: {
          compile: {
            options: {
              data: {
                pretty: true,
                debug: false
              }
            },
            	files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '_dev',
                    src: ['*.jade'],  // Actual pattern(s) to match.
                    dest: '_prod',
                    ext: '.head.html'  // Dest filepaths will have this extension.
                }]
          }
        },
		inlinecss: {
        main: {
                options: {
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '_prod',
                    src: ['*.html'],  // Actual pattern(s) to match.
                    dest: '_prod',
                    ext: '.in.html'  // Dest filepaths will have this extension.
                }]    
            }
        },
        watch: {
            scss: {
                files: ['**/*.scss','**/*.jade'],
                tasks: ['sass','jade','inlinecss']
            }
        }
        
    });

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-inline-css');
    grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', [ 'sass', 'jade', 'inlinecss' ]);

};