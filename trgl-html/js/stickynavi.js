/**
 * 追従ナビ
 */
var Stickynavi = function(setting){
    this.setting = {
        'sticky_body_class': setting.sticky_body_class ? setting.sticky_body_class : "sticky_pc",
        'target': setting.target ? setting.target : "#header",
        'start_position': (undefined != setting.start_position) ? setting.start_position : "",
        'finish_position': (undefined != setting.finish_position) ? setting.finish_position : false,
    };
    this.state = {
        'start_position':0, // 開始地点
        'finish_position':false, // 終了地点
    };

    // 開始地点
    var start_y;

    if(this.setting.start_position === ""){
        start_y = document.querySelector(this.setting.target).offsetTop;
    } else {
        start_y = this.setting.start_position;
    }
    this.setStateStartPosition(start_y);

    // 終了地点
    if(this.setting.finish_position !== false){
        this.setStateFinishPosition(this.setting.finish_position);
    }

};

// 追従させる開始位置Y
Stickynavi.prototype.setStateStartPosition = function(y) {
    this.state.start_position = y;
};
// 追従終了させる位置Y
Stickynavi.prototype.setStateFinishPosition = function(y) {
    this.state.finish_position = y;
};


Stickynavi.prototype.sticky = function(){
    // 指定位置から追従
    if( this.state.start_position >= this.getScrollTop() ){
        document.getElementsByTagName("body")[0].classList.remove(this.setting.sticky_body_class);
    }else if( this.state.finish_position === false){
        document.getElementsByTagName("body")[0].classList.add(this.setting.sticky_body_class);
    }else if( this.state.finish_position <= this.getScrollTop() + window.innerHeight ){
        document.getElementsByTagName("body")[0].classList.remove(this.setting.sticky_body_class);
    }else{
        document.getElementsByTagName("body")[0].classList.add(this.setting.sticky_body_class);
    }
};
Stickynavi.prototype.getScrollTop = function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};
Stickynavi.prototype.updateState = function() {
    // this.state.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
};

Stickynavi.prototype.update = function() {
    this.updateState();
    this.sticky();
};

// イベント登録
Stickynavi.prototype.watch = function(){
    var self = this;

    window.addEventListener( 'scroll',function(){
        self.update();
    }, false);

    window.addEventListener("resize", function(){
        self.update();
    }, false);

    self.update();
};

// 実行
Stickynavi.prototype.run = function() {
    this.watch();
    this.sticky();
};