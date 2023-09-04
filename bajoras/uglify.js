const path = require('path');
const fs = require('fs');
const recursive = require('recursive-readdir');
const UglifyJS = require('uglify-js');

// Source and target directories
const srcDir = 'bajoras/src';
const targetDir = 'bajoras';

recursive(srcDir, ['*.json', '*.ico'], (err, files) => {
    console.log(files, err)
    // Files is an array of file paths
    files.forEach(file => {
        if (path.extname(file) === '.js') { // check if file is a .js
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) return console.log(err);

                const result = UglifyJS.minify(data, {
                    compress: {
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    },
                    mangle: true,
                }); // Uglify the file

                if (result.error) return console.log(`Uglify error in ${file}: `, result.error);

                const targetPath = path.join(targetDir, path.basename(file)); // Construct the output path

                fs.writeFile(targetPath, result.code, (err) => {
                    if (err) return console.log(`Error writing to ${targetPath}: `, err);
                    console.log(`File minified at: ${targetPath}`);
                });
            });
        }
    });
})