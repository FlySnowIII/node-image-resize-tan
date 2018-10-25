//require
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var gm = require('gm');

var sourcePath = getArgument(1, path.resolve(__dirname, 'images'), 'source image path is ', 'argument 1 is source image file Relative path.');

fs.readdir(
    sourcePath,
    function (err, files) {
        if (err) {
            console.log('fs error ' + err);
            throw err;
        }

        for(var index in files) {
            var fullpath = path.resolve(sourcePath, files[index]);
            try {
                var dimensions = sizeOf(fullpath);
                if(dimensions.width>1920){
                    console.log(files[index],":",dimensions.width,dimensions.height);

                    gm(fullpath)
                        .resize(1920, 1080)
                        .noProfile()
                        .write(fullpath, function (err) {
                            if(err){
                                console.log(err);
                            }
                        });

                }
                
            } catch (error) {
                console.log('size error ' + error,files[index]);
            }
        }

        console.log('**************** END  **********************************');
    }
);


function getArgument(argumentIndex, defaultData, successMessage, errorMessage) {
    var result = defaultData;
    argumentIndex;

    if (typeof process.argv[++argumentIndex] !== 'undefined') {
        //リサイズイメージのファイルメイプレフィクスの獲得　コマンドライン第一引数をファイル名にする
        result = process.argv[argumentIndex];
        console.log('Argument_' + --argumentIndex + ' ' + successMessage + result);
    } else {
        console.log('Argument_' + --argumentIndex + ' ' + errorMessage);
    }

    return result;
}