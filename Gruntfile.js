var jsFiles = ['*.js', 'controllers/*.js', 'models/*.js', 'routes/*.js'];
module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      target: jsFiles
    },
    jsonlint: {
      target: ['package.json']
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('default', ['lint']);
  grunt.registerTask('lint', ['eslint', 'jsonlint']);
};
