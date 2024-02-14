var SmoothScroll = function(setting){
    this.init(setting);
};

// ‰ŠúÝ’è
SmoothScroll.prototype.init = function(setting) {
    this.setting = {
        'breakpoint': setting.breakpoint ? setting.breakpoint : 767,
        'target': setting.target ? setting.target : 'a[rel=scroll]',
        'pc_offset': setting.pc_offset ? setting.pc_offset : 0,
        'sp_offset': setting.sp_offset ? setting.sp_offset : 0,
    };
};

SmoothScroll.prototype._isPC = function () {
    return (window.innerWidth > this.setting.breakpoint);
};

SmoothScroll.prototype._getOffset = function () {
    if(this._isPC()){
        return this.setting.pc_offset;
    }else{
        return this.setting.sp_offset;
    }
};

SmoothScroll.prototype._move = function($target) {
    this.moveTo($(( $target.attr("href"))).offset().top - this._getOffset());
    return false;
};

SmoothScroll.prototype.moveTo = function(y) {

    var self = this;
    $('html, body').animate({
            scrollTop: y
        },
        {duration: 400, easing: "swing"}
    );
    return false;
};

SmoothScroll.prototype.watch = function() {
    var self = this;
    $(this.setting.target).on({
        click: function(){
            var $target = $(this);
            if($target.attr('href').match(/\#/)){
                self._move($target);
            }
            // return false;
        }
    });
};