module.exports = function(grunt) {
    'use strict';
    // Get the name of the app from the folder name created from git
    var directory = __dirname;
    var directoryElements = directory.split('\\');
    var nodeJSName = directoryElements[directoryElements.length - 1];
    var path = require('path');

    grunt.initConfig({
        less: {
            dev: {
                files: {
                    "build/css/main.css": "src/less/main.less"
                }
            }
        },
        svgmin: {
            options: {
                plugins: [{
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                    /*, {
                                        removeAttrs: {
                                            attrs: ['xmlns']
                                        }
                                    }*/
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/less/images/',
                    src: ['**/*.svg'],
                    dest: 'build/css/images/'
                }]
            }
        },
        concat: {
            dev: {
                src: ['src/js/mainStart.js', 'src/js/editStage.js'],
                dest: 'src/js/mainTemp.js',
            },
            stage: {
                src: ['src/js/mainStart.js', 'src/js/editStage.js'],
                dest: "src/js/mainTemp.js",
            },
            prod: {
                src: ['src/js/mainStart.js', 'src/js/editProd.js'],
                dest: 'src/js/mainTemp.js',
            },
        },
        watch: {
            dev: {
                files: ['src/less/*.less', 'src/js/**.js', 'src/utils/*/**.js', 'src/templates/**.js', 'src/index.html', '!src/js/mainTemp.js'],
                tasks: ['dev-nowatch']
            },
            stage: {
                files: ['src/less/*.less', 'src/js/**.js', 'src/utils/*/**.js', 'src/templates/**.js', 'src/index.html', '!src/js/mainTemp.js'],
                tasks: ['stage-nowatch']
            },
            prod: {
                files: ['src/less/*.less', 'src/js/**.js', 'src/templates/**.js', 'src/index.html', '!src/js/mainTemp.js'],
                tasks: ['prod-nowatch']
            }
        },    
        uglify: {
            webpack: {
                files: {
                    'build/js/bundle.min.js': ['build/js/bundle.js']
                }
            }
        },
        jshint: {
            dev: ['Gruntfile.js', 'src/js/mainTemp.js', 'src/js/desktop.js']
        },
        copy: {
            js: {
                expand: true,
                cwd: 'src/js/',
                src: ['**'],
                dest: 'build/js/'
            },
            index: {
                nonull: true,
                src: 'src/index.html',
                dest: 'build/index.html'
            },
            data: {
                expand: true,
                cwd: 'src/data/',
                src: ['**'],
                dest: 'build/data/'
            },
            images: {
                expand: true,
                cwd: 'src/less/images/',
                src: ['**'],
                //                src: ['**', '!**/*.svg'],
                dest: 'build/css/images/'
            },
            webconfig: {
                nonull: true,
                src: 'src/web.config',
                dest: 'build/web.config'
            },
            js_stage: {
                expand: true,
                cwd: 'src/js/',
                src: ['**'],
                dest: "N:/Online/HTML/nyheder/htm/databaseredaktion/2017Test/" + nodeJSName + "/js/"
            },
            data_stage: {
                expand: true,
                cwd: 'src/data/',
                src: ['**'],
                dest: "N:/Online/HTML/nyheder/htm/databaseredaktion/2017Test/" + nodeJSName + "/data/"
            },
            images_stage: {
                expand: true,
                cwd: 'src/less/images/',
                src: ['**'],
                dest: "N:/Online/HTML/nyheder/htm/databaseredaktion/2017Test/" + nodeJSName + "/images"
            },
            copy_stage: {
                expand: true,
                cwd: 'build/',
                src: ['./js/bundle.js'],
                dest: "N:/Online/HTML/nyheder/htm/databaseredaktion/2017Test/" + nodeJSName + "/"
            },
            copy_prod: {
                expand: true,
                cwd: 'build/',
                src: ['./js/bundle.min.js'],
                dest: "N:/Online/HTML/nyheder/htm/databaseredaktion/2017/" + nodeJSName + "/"
            },
            webconfig_stage: {
                nonull: true,
                src: 'src/web.config',
                dest: 'N:/Online/HTML/nyheder/htm/databaseredaktion/2017Test/' + nodeJSName + '/web.config'
            }
        },
        replace: {
            index_stage: {
                src: ['src/index.html'],
                dest: 'build/',
                replacements: [{
                        from: 'src="',
                        to: 'src="//www.dr.dk/nyheder/htm/databaseredaktion/2017Test/' + nodeJSName + '/'
                    },
                    {
                        from: 'href="',
                        to: 'href="//www.dr.dk/nyheder/htm/databaseredaktion/2017Test/' + nodeJSName + '/'
                    }
                ]
            },
            js_stage: {
                src: ['src/js/mainTemp.js'],
                dest: 'build/js/',
                replacements: [{
                        from: 'js/',
                        to: '//www.dr.dk/nyheder/htm/databaseredaktion/2017Test/' + nodeJSName + '/js/'
                    },
                    {
                        from: 'data/',
                        to: '//www.dr.dk/nyheder/htm/databaseredaktion/2017Test/' + nodeJSName + '/data/'
                    }
                ]
            },
            index_prod: {
                src: ['src/index.html'],
                dest: 'build/',
                replacements: [{
                        from: 'src="',
                        to: 'src="//www.dr.dk/nyheder/htm/databaseredaktion/2017/' + nodeJSName + '/'
                    },
                    {
                        from: 'href="',
                        to: 'href="//www.dr.dk/nyheder/htm/databaseredaktion/2017/' + nodeJSName + '/'
                    }
                ]
            },
            js_prod: {
                src: ['src/js/mainTemp.js'],
                dest: 'build/js/',
                replacements: [{
                        from: 'js/',
                        to: '//www.dr.dk/nyheder/htm/databaseredaktion/2017/' + nodeJSName + '/js/'
                    },
                    {
                        from: 'data/',
                        to: '//www.dr.dk/nyheder/htm/databaseredaktion/2017/' + nodeJSName + '/data/'
                    }
                ]
            },
            bundle_min_prod: {
                src: ['build/index.html'],
                dest: 'build/',
                replacements: [{
                    from: 'bundle.js',
                    to: 'bundle.min.js'
                }]
            }
        },
        clean: {
            dist: {
                src: ['src/js/mainTemp.js']
            }
        },
        imageEmbed: {
            dist: {
                src: ["build/css/main.css"],
                dest: "build/css/main.css",
                options: {
                    deleteAfterEncoding: false,
                    preEncodeCallback: function(filename) {
                        return true;
                    },
                    maxImageSize: 0
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: 'build/css/main.css'
            },
            options: {
                server: {
                    baseDir: "./"
                }
            },
            ui: {
                port: 81
            }
        },
        http: {
            dist: {
                options: {
                    url: 'https://drdb.azurewebsites.net/dataGrunt?id=' + nodeJSName,
                },
                dest: './src/data/texts.json'
            }
        },
        webpack: {
            dev: {
                entry: "./src/js/mainTemp.js",
                output: {
                    filename: "build/js/bundle.js"
                },
                resolve: {
                    mainFields: ['jsnext:main', 'browser', 'main'],
                },
                stats: {
                    // Configure the console output
                    colors: true,
                    modules: true,
                    reasons: true
                },
                //debug: true,
                // has the files seperately when debugging, very helpful
                devtool: "#inline-source-map",
                module: {
                    loaders: [
                        // Use style-loader to generate JS-injected <style> tag
                        // Worth reading: http://webpack.github.io/docs/using-loaders.html
                        {
                            test: /\.css$/,
                            loader: 'style-loader!css-loader'
                        }, {
                            test: /\.json$/,
                            loader: 'json-loader'
                        }, {
                            test: /\.csv?$/,
                            loader: 'dsv-loader'
                        }, {
                            test: /\.tsv?$/,
                            loader: 'dsv-loader'
                        }, {
                            test: /\.js?$/,
                            include: [path.resolve(__dirname, "src/js"), path.resolve(__dirname, "src/templates"), path.resolve(__dirname, "src/js/editor")],
                            exclude: [path.resolve(__dirname, "build"), path.resolve(__dirname, "src/js/lib")],
                            loader: "babel-loader",
                            query: {
                                cacheDirectory: true,
                                presets: ["es2015-ie"],
                                compact: true
                            }
                        }
                    ]
                }
            },
            prod: {
                entry: "./build/js/bundle.js",
                output: {
                    filename: "build/js/bundle.min.js"
                },
                resolve: {
                    mainFields: ['jsnext:main', 'browser', 'main'],
                },
                stats: {
                    // Configure the console output
                    colors: true,
                    modules: true,
                    reasons: true
                },
                module: {
                    loaders: [{
                        test: /\.js$/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015-ie']
                        }
                    }]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks("grunt-image-embed");
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-newer');

    // tasks
    grunt.registerTask('dev-nowatch', ['concat:dev', 'less:dev', 'svgmin', 'copy:images', "imageEmbed", 'webpack:dev', 'newer:copy:index', 'newer:copy:data', 'newer:copy:webconfig', 'clean']);
    grunt.registerTask('dev', ['dev-nowatch', 'watch:dev']);

    grunt.registerTask('dev-all', ['less:dev', 'copy:images', "imageEmbed", 'webpack:dev', 'copy:js', 'copy:index', 'copy:data', 'copy:webconfig']);

    grunt.registerTask('stage-nowatch', ['concat:stage', 'less:dev', 'svgmin', "imageEmbed", 'webpack:dev', 'newer:copy:index', 'newer:copy:data', 'newer:copy:images', 'newer:copy:webconfig', "replace:js_stage", "replace:index_stage", 'newer:copy:copy_stage', 'clean']);
    grunt.registerTask('stage', ['stage-nowatch', 'watch:stage']);

    grunt.registerTask('prod-nowatch', ['http', 'concat:prod', 'less:dev', 'svgmin', "imageEmbed", 'webpack:dev', 'copy:js', 'webpack:prod', 'uglify:webpack', 'copy:index', 'copy:data', 'copy:images', 'copy:webconfig', "replace:js_prod", "replace:index_prod", 'replace:bundle_min_prod', 'copy:copy_prod', 'clean']);
    grunt.registerTask('prod', ['prod-nowatch', 'watch:prod']);

    grunt.registerTask('all', ['dev-nowatch', 'stage-nowatch', 'prod-nowatch']);
    //'uglify:webpack'

/*
    grunt.registerTask('dev-nowatch', ['less:dev', 'svgmin', 'copy:images', "imageEmbed", 'webpack:dev', 'newer:copy:js', 'newer:copy:index', 'newer:copy:data', 'newer:copy:webconfig']);
    grunt.registerTask('dev', ['dev-nowatch', 'watch:dev']);

    grunt.registerTask('dev-all', ['less:dev', 'copy:images', "imageEmbed", 'webpack:dev', 'copy:js', 'copy:index', 'copy:data', 'copy:webconfig']);

    grunt.registerTask('stage-nowatch', ['less:dev', 'svgmin', "imageEmbed", 'webpack:dev', 'newer:copy:js', 'newer:copy:index', 'newer:copy:data', 'newer:copy:images', 'newer:copy:webconfig', "replace:js_stage", "replace:index_stage", 'newer:copy:copy_stage']);
    grunt.registerTask('stage', ['stage-nowatch', 'watch:stage']);

    grunt.registerTask('prod-nowatch', ['less:dev', 'svgmin', "imageEmbed", 'webpack:dev', 'copy:js', 'webpack:prod', 'uglify:webpack', 'copy:index', 'copy:data', 'copy:images', 'copy:webconfig', "replace:js_prod", "replace:index_prod", 'replace:bundle_min_prod', 'copy:copy_prod']);
    grunt.registerTask('prod', ['prod-nowatch', 'watch:prod', 'copy:copy_prod']);

    grunt.registerTask('all', ['dev-nowatch', 'stage-nowatch', 'prod-nowatch']);
*/
};