module.exports = function(grunt){
    grunt.initConfig({
    watch: {
      jade: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
    },
//监听app.js
    nodemon: {
      dev: {
        script: 'app.js',
        options: {

          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 2000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: { 
      tasks: ['nodemon', 'watch'],
      // tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
      options: {
        logConcurrentOutput: true
      }
    }
 })

   grunt.loadNpmTasks('grunt-contrib-watch')
   grunt.loadNpmTasks('grunt-nodemon')
   //跑慢任务 如编译less
   grunt.loadNpmTasks('grunt-concurrent')
   grunt.option('force',true)
   grunt.registerTask('default',['concurrent' ])
}