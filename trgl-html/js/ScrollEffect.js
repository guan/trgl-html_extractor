/*!--------------------------------------------------------------------------*
 *
 *  ScrollEffect.js
 *
 *  MIT-style license.
 *
 *  2017 MuuYan
 *  http://muumv.com
 *
 *--------------------------------------------------------------------------*/

 ;(function($){
$(window).on("load",function () {

    var moveNameS = [ 'fi','single'];
    var moveNameM = [ 'fi-mult','mult'];
    var eleS = [], listS = []
      , eleM = [], listM = [], parent = []
      , scrollPosi;

    function List(ele, n, posi, speed) {
      this.ele = ele;
      this.no = n;
      this.posi = posi != undefined ? posi : 150;
      this.speed = speed != undefined ? speed : 300;
      this.cName = 'pActive';
    };
    List.prototype = {
      simple: function () {
        $(this.ele).addClass(this.cName);
      },
      multiple: function (target, n){
        this.no = n;
        var that = this;
        setTimeout(function(){
          $(target).addClass(that.cName);
        }, that.no * that.speed);
      },
      getHeightSimple: function() {
        var posi = $(this.ele).offset().top - $(window).height() + this.posi;
        if(scrollPosi >= posi){
          this.simple();
        }
      },
      getHeightMultiple: function() {
        var posi = $(this.ele).eq(0).offset().top - $(window).height() + this.posi;
        if(scrollPosi >= posi){
          for (var i = 0; i < this.ele.length; i++) {
            this.multiple(this.ele[i], i);
          }
        }
      }
    };

    for (var i = 0; i < moveNameS.length; i++) {
      eleS[i] = $('.' + moveNameS[i]);
      listS[i] = [];
      for (var j = 0; j < eleS[i].length; j++) {
        listS[i][j] = new List(eleS[i][j], i);
      }
    };

    for (var i = 0; i < moveNameM.length; i++) {
      parent = $('.' + moveNameM[i]);
      eleM[i] = [];
      listM[i] = [];
      for (var j = 0; j < parent.length; j++) {
        eleM[i][j] = $(parent[j]).children();
        listM[i][j] = new List(eleM[i][j], j
          , $(eleM[i][j]).parent().data('pPosi')
          , $(eleM[i][j]).parent().data('pSpeed'));
      }
    };

    function main() {
      for (var i = 0; i < listS.length; i++) {
        for (var j = 0; j < listS[i].length; j++) {
          listS[i][j].getHeightSimple();
        }
      }
      for (var i = 0; i < listM.length; i++) {
        for (var j = 0; j < listM[i].length; j++) {
          listM[i][j].getHeightMultiple();
        }
      }
    };

    $(window).scroll(function(){ start(); });

    function start() {
      scrollPosi = $(window).scrollTop();
      main();
    }; start();
  });
})(jQuery);
