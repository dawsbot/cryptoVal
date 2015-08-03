var jsFiles = ['*.js', 'controllers/*.js', 'models/*.js', 'routes/*.js'];
module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      target: jsFiles
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['lint']);
  grunt.registerTask('lint', ['eslint']);
};
