/**
  * [Riseze And Strip V.1.00]
  * Copyright (c) [2017] [(fD)Pinchos.Ponchos]
  * http://qiita.com/fd2016ta
  * This software is released under the MIT License.
  */

/**
 * [getArgument]
 * @param  {[type]} argumentIndex
 * @param  {[type]} defaultData
 * @param  {[type]} successMessage
 * @param  {[type]} errorMessage
 * @return {[type]}
 */
function getArgument(argumentIndex, defaultData, successMessage, errorMessage)
{
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

/**
 * [risizeAndStrip]
 * @param  {[type]} files
 * @return {[type]}
 */
function risizeAndStrip(files)
{
  for(var index in files) {
    console.log(path.resolve(sourcePath, files[index]));
    im.convert(
      [
        path.resolve(sourcePath, files[index]),
        '-resize', imageSize,
        '-strip',
        path.resolve(imagesConvertPath, prefix + index + '.' + imageType)
      ],
    function(err, stdout){
      if (err) {
        console.log('');
        console.log('convert error:', err);
      }
    });
  }
}

/**
 * [convertImages]
 * @return {[type]}
 */
function convertImages()
{
  //ファイル一覧を取得
  fs.readdir(
   sourcePath,
   function (err, files) {
     if (err) {
       console.log('fs error ' + err);
       throw err;
     }

     risizeAndStrip(files);

     console.log('**************** END  **********************************');
   }
 );
}

console.log('**************** STRT **********************************');

//require
var fs = require('fs');
var path = require('path');
var im = require('imagemagick');

//１　ファイルプレフィクス
var prefix = getArgument(1, 'noArg', 'resize image file prefix is ', 'argument 1 is convert image filename prefix.');
//２　リサイズイメージサイズ
var imageSize = getArgument(2, '1024x1024', 'image size is ', 'argument 2 is image size.');
//３　ファイルフォーマット
var imageType = getArgument(3, 'png', 'image type is ', 'argument 3 is image type.');
//４　ソースパス
var sourcePath = getArgument(4, path.resolve(__dirname, 'images'), 'source image path is ', 'argument 4 is source image file Relative path.');
//５　コンバート先パス
var imagesConvertPath = getArgument(5, path.resolve(__dirname, 'imagesConvert'), 'risize image path is ', 'argument 5 is risize image file Relative path.');

//コンバート開始
convertImages();