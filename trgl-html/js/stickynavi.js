/**
 * �Ǐ]�i�r
 */
var Stickynavi = function(setting){
    this.setting = {
        'sticky_body_class': setting.sticky_body_class ? setting.sticky_body_class : "sticky_pc",
        'target': setting.target ? setting.target : "#header",
        'start_position': (undefined != setting.start_position) ? setting.start_position : "",
        'finish_position': (undefined != setting.finish_position) ? setting.finish_position : false,
    };
    this.state = {
        'start_position':0, // �J�n�n�_
        'finish_position':false, // �I���n�_
    };

    // �J�n�n�_
    var start_y;

    if(this.setting.start_position === ""){
        start_y = document.querySelector(this.setting.target).offsetTop;
    } else {
        start_y = this.setting.start_position;
    }
    this.setStateStartPosition(start_y);

    // �I���n�_
    if(this.setting.finish_position !== false){
        this.setStateFinishPosition(this.setting.finish_position);
    }

};

// �Ǐ]������J�n�ʒuY
Stickynavi.prototype.setStateStartPosition = function(y) {
    this.state.start_position = y;
};
// �Ǐ]�I��������ʒuY
Stickynavi.prototype.setStateFinishPosition = function(y) {
    this.state.finish_position = y;
};


Stickynavi.prototype.sticky = function(){
    // �w��ʒu����Ǐ]
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

// �C�x���g�o�^
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

// ���s
Stickynavi.prototype.run = function() {
    this.watch();
    this.sticky();
};