module.exports = function(grunt) {
grunt.initConfig({
  concat: {
    dist: {
      src: ['client/dumplingModel.js', 'client/dumplingView.js', 
      'client/feedView.js', 'client/playView.js', 'client/statsView.js',
      'client/chooseView.js'],
      dest: 'client/build.js'
    }
  },
  uglify: {
    my_target: {
      files: {
        'client/build.min.js': ['client/build.js']
      }
    }
  }
});
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.registerTask('default', ['concat', 'uglify']);
};