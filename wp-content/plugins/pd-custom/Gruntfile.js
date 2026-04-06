module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "custom.css": "less/style.less", // destination file and source file
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    // 'js/script.min.js': ['js/script.js']
                }
            }
        },
        watch: {
            styles: {
                files: ['less/**/*.less', 'fonts/**/*.less', 'js/**/*.js'], // which files to watch
                tasks: ['less', 'uglify'],
                options: {
                    nospawn: true
                }
            }
        }
    });
    grunt.registerTask('default', ['less', 'uglify', 'watch']);
};