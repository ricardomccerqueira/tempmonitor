module.exports = function(grunt) {
  grunt.file.setBase('./');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'src/js/tempmonitor.js': ['src/coffee/*.coffee']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'app/tempmonitor.js': 'src/js/tempmonitor.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        event: 'all'
      },
      coffee: {
        files: 'src/coffee/**/*.coffee',
        tasks: 'coffee'
      },
      js: {
        files: ['src/js/*.js'],
        tasks: 'uglify'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
}; 