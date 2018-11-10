/*!
 * Close Pixelate v2.0.00 beta
 * http://desandro.com/resources/close-pixelate/
 *
 * Developed by
 * - David DeSandro  http://desandro.com
 * - John Schulz  http://twitter.com/jfsiii
 *
 * Licensed under MIT license
 */

/*jshint asi: true, browser: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true */


(function (window, undefined) {


//
  'use strict';

// util vars
  var TWO_PI = Math.PI * 2
  var QUARTER_PI = Math.PI * 0.25

// utility functions
  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]"
  }

  var console = window.console

// check for canvas support
  var canvas = document.createElement('canvas')
  var isCanvasSupported = canvas.getContext && canvas.getContext('2d')

// don't proceed if canvas is no supported
  if (!isCanvasSupported) {
    return
  }


  function ClosePixelation(img, options) {
    this.img = img
    // creat canvas
    var canvas = this.canvas = document.createElement('canvas')
    this.ctx = canvas.getContext('2d')
    // copy attributes from img to canvas
    canvas.className = img.className
    canvas.id = img.id

    this.render(options)
    console.log("测试==============11111111")
    // replace image with canvas


    // var ctx = canvas.getContext("2d")
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.scale(5,5);//x和y方向的缩放比例
    // ctx.drawImage(img, 0, 0);

    // img.parentNode.replaceChild(canvas, img)

    var div = this.div = document.createElement('div')
    div.width = this.width2
    div.height = this.height2
    div.className = img.className
    div.id = img.id

    // div.appendChild(Canvas2Image.convertToImage(canvas, this.width2, this.height2, 'png'))
    // img.parentNode.replaceChild(div, img)

    // div.appendChild()

    var img2 = Canvas2Image.convertToImage(canvas, this.width2, this.height2, 'png')
    // img2.className = img.className
    img2.id = img.id
    img2.setAttribute('style', 'position: fixed;bottom: 0;top:0;margin: auto 0;z-index: 2;line-height: 100%;')

    img.parentNode.replaceChild(img2, img)

  }

  ClosePixelation.prototype.render = function (options) {
    this.options = options
    // set size
    // w = document.getElementsByTagName("img")[0].naturalWidth
    // h = document.getElementsByTagName("img")[0].naturalHeight

    var w = this.width = this.canvas.width = this.img.naturalWidth
    var h = this.height = this.canvas.height = this.img.naturalHeight

    this.width2 = this.img.width
    this.height2 = this.img.height

    // this.canvas.width = 300
    // this.canvas.height =
    console.log("测试==============222222222")

    // draw image on canvas
    this.ctx.drawImage(this.img, 0, 0)
    // get imageData

    try {
      this.imgData = this.ctx.getImageData(0, 0, w, h).data
    } catch (error) {
      if (console) {
        console.error(error)
      }
      return
    }

    this.ctx.clearRect(0, 0, w, h)

    // this.ctx.scale(5,5);//x和y方向的缩放比例
    // this.ctx.drawImage(this.img, 0, 0);

    for (var i = 0, len = options.length; i < len; i++) {
      this.renderClosePixels(options[i])
    }

  }

  ClosePixelation.prototype.renderClosePixels = function (opts) {
    var w = this.width
    var h = this.height
    var ctx = this.ctx
    var imgData = this.imgData
    console.log("测试==============333333333")
    // option defaults
    var res = opts.resolution || 16
    var size = opts.size || res
    var alpha = opts.alpha || 1
    var offset = opts.offset || 0
    var offsetX = 0
    var offsetY = 0
    var cols = w / res + 1
    var rows = h / res + 1
    var halfSize = size / 2
    var diamondSize = size / Math.SQRT2
    var halfDiamondSize = diamondSize / 2

    if (isObject(offset)) {
      offsetX = offset.x || 0
      offsetY = offset.y || 0
    } else if (isArray(offset)) {
      offsetX = offset[0] || 0
      offsetY = offset[1] || 0
    } else {
      offsetX = offsetY = offset
    }

    var row, col, x, y, pixelY, pixelX, pixelIndex, red, green, blue, pixelAlpha

    for (row = 0; row < rows; row++) {
      y = ( row - 0.5 ) * res + offsetY
      // normalize y so shapes around edges get color
      pixelY = Math.max(Math.min(y, h - 1), 0)

      for (col = 0; col < cols; col++) {
        x = ( col - 0.5 ) * res + offsetX
        // normalize y so shapes around edges get color
        pixelX = Math.max(Math.min(x, w - 1), 0)
        pixelIndex = ( pixelX + pixelY * w ) * 4
        red = imgData[pixelIndex + 0]
        green = imgData[pixelIndex + 1]
        blue = imgData[pixelIndex + 2]
        pixelAlpha = alpha * ( imgData[pixelIndex + 3] / 255)

        ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + pixelAlpha + ')'

        switch (opts.shape) {
          case 'circle' :
            ctx.beginPath()
            ctx.arc(x, y, halfSize, 0, TWO_PI, true)
            ctx.fill()
            ctx.closePath()
            break
          case 'diamond' :
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(QUARTER_PI)
            ctx.fillRect(-halfDiamondSize, -halfDiamondSize, diamondSize, diamondSize)
            ctx.restore()
            break
          default :
            // square
            ctx.fillRect(x - halfSize, y - halfSize, size, size)
        } // switch
      } // col
    } // row

  }

// enable img.closePixelate
  HTMLImageElement.prototype.closePixelate = function (options) {
    return new ClosePixelation(this, options)
  }

// put in global namespace
  window.ClosePixelation = ClosePixelation

})(window);

export default ClosePixelation;

var Canvas2Image = function () {

  // check if support sth.
  var $support = function () {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    return {
      canvas: !!ctx,
      imageData: !!ctx.getImageData,
      dataURL: !!canvas.toDataURL,
      btoa: !!window.btoa
    };
  }();

  var downloadMime = 'image/octet-stream';

  function scaleCanvas (canvas, width, height) {
    var w = canvas.width,
      h = canvas.height;
    if (width == undefined) {
      width = w;
    }
    if (height == undefined) {
      height = h;
    }

    var retCanvas = document.createElement('canvas');
    var retCtx = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
  }

  function getDataURL (canvas, type, width, height) {
    canvas = scaleCanvas(canvas, width, height);
    return canvas.toDataURL(type);
  }

  function saveFile (strData) {
    document.location.href = strData;
  }

  function genImage(strData) {
    var img = document.createElement('img');
    img.src = strData;
    return img;
  }
  function fixType (type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
  }
  function encodeData (data) {
    if (!window.btoa) { throw 'btoa undefined' }
    var str = '';
    if (typeof data == 'string') {
      str = data;
    } else {
      for (var i = 0; i < data.length; i ++) {
        str += String.fromCharCode(data[i]);
      }
    }

    return btoa(str);
  }
  function getImageData (canvas) {
    var w = canvas.width,
      h = canvas.height;
    return canvas.getContext('2d').getImageData(0, 0, w, h);
  }
  function makeURI (strData, type) {
    return 'data:' + type + ';base64,' + strData;
  }


  /**
   * create bitmap image
   * 按照规则生成图片响应头和响应体
   */
  var genBitmapImage = function (oData) {

    //
    // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
    // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
    //

    var biWidth  = oData.width;
    var biHeight	= oData.height;
    var biSizeImage = biWidth * biHeight * 3;
    var bfSize  = biSizeImage + 54; // total header size = 54 bytes

    //
    //  typedef struct tagBITMAPFILEHEADER {
    //  	WORD bfType;
    //  	DWORD bfSize;
    //  	WORD bfReserved1;
    //  	WORD bfReserved2;
    //  	DWORD bfOffBits;
    //  } BITMAPFILEHEADER;
    //
    var BITMAPFILEHEADER = [
      // WORD bfType -- The file type signature; must be "BM"
      0x42, 0x4D,
      // DWORD bfSize -- The size, in bytes, of the bitmap file
      bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
      // WORD bfReserved1 -- Reserved; must be zero
      0, 0,
      // WORD bfReserved2 -- Reserved; must be zero
      0, 0,
      // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      54, 0, 0, 0
    ];

    //
    //  typedef struct tagBITMAPINFOHEADER {
    //  	DWORD biSize;
    //  	LONG  biWidth;
    //  	LONG  biHeight;
    //  	WORD  biPlanes;
    //  	WORD  biBitCount;
    //  	DWORD biCompression;
    //  	DWORD biSizeImage;
    //  	LONG  biXPelsPerMeter;
    //  	LONG  biYPelsPerMeter;
    //  	DWORD biClrUsed;
    //  	DWORD biClrImportant;
    //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
    //
    var BITMAPINFOHEADER = [
      // DWORD biSize -- The number of bytes required by the structure
      40, 0, 0, 0,
      // LONG biWidth -- The width of the bitmap, in pixels
      biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
      // LONG biHeight -- The height of the bitmap, in pixels
      biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
      // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
      1, 0,
      // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
      // has a maximum of 2^24 colors (16777216, Truecolor)
      24, 0,
      // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
      0, 0, 0, 0,
      // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
      biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
      // LONG biXPelsPerMeter, unused
      0,0,0,0,
      // LONG biYPelsPerMeter, unused
      0,0,0,0,
      // DWORD biClrUsed, the number of color indexes of palette, unused
      0,0,0,0,
      // DWORD biClrImportant, unused
      0,0,0,0
    ];

    var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

    var aImgData = oData.data;

    var strPixelData = '';
    var biWidth4 = biWidth<<2;
    var y = biHeight;
    var fromCharCode = String.fromCharCode;

    do {
      var iOffsetY = biWidth4*(y-1);
      var strPixelRow = '';
      for (var x = 0; x < biWidth; x++) {
        var iOffsetX = x<<2;
        strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
          fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
          fromCharCode(aImgData[iOffsetY+iOffsetX]);
      }

      for (var c = 0; c < iPadding; c++) {
        strPixelRow += String.fromCharCode(0);
      }

      strPixelData += strPixelRow;
    } while (--y);

    var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

    return strEncoded;
  };

  /**
   * saveAsImage
   * @param canvasElement
   * @param {String} image type
   * @param {Number} [optional] png width
   * @param {Number} [optional] png height
   */
  var saveAsImage = function (canvas, width, height, type) {
    if ($support.canvas && $support.dataURL) {
      if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
      if (type == undefined) { type = 'png'; }
      type = fixType(type);
      if (/bmp/.test(type)) {
        var data = getImageData(scaleCanvas(canvas, width, height));
        var strData = genBitmapImage(data);
        saveFile(makeURI(strData, downloadMime));
      } else {
        var strData = getDataURL(canvas, type, width, height);
        saveFile(strData.replace(type, downloadMime));
      }
    }
  };

  var convertToImage = function (canvas, width, height, type) {
    if ($support.canvas && $support.dataURL) {
      if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
      if (type == undefined) { type = 'png'; }
      type = fixType(type);

      if (/bmp/.test(type)) {
        var data = getImageData(scaleCanvas(canvas, width, height));
        var strData = genBitmapImage(data);
        return genImage(makeURI(strData, 'image/bmp'));
      } else {
        var strData = getDataURL(canvas, type, width, height);
        return genImage(strData);
      }
    }
  };



  return {
    saveAsImage: saveAsImage,
    saveAsPNG: function (canvas, width, height) {
      return saveAsImage(canvas, width, height, 'png');
    },
    saveAsJPEG: function (canvas, width, height) {
      return saveAsImage(canvas, width, height, 'jpeg');
    },
    saveAsGIF: function (canvas, width, height) {
      return saveAsImage(canvas, width, height, 'gif');
    },
    saveAsBMP: function (canvas, width, height) {
      return saveAsImage(canvas, width, height, 'bmp');
    },

    convertToImage: convertToImage,
    convertToPNG: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'png');
    },
    convertToJPEG: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'jpeg');
    },
    convertToGIF: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'gif');
    },
    convertToBMP: function (canvas, width, height) {
      return convertToImage(canvas, width, height, 'bmp');
    }
  };

}();
