
var EmptyState = function(){
        this.name = "EmptyState"; 
        this.render = function(){};
        this.update = function(){};
        this.onEnter = function(){};
        this.onExit = function(){};
}

// State List
var StateList = function (){
    var states = [];
    this.pop = function () {
            return states.pop();
    };
    this.push = function (state) {
            states.push(state);
    };
    this.top = function (){
            return states[states.length-1];
    }
};

// StateStack
var StateStack = function () {
    var states = new StateList();
    states.push(new EmptyState());
    this.update = function (){
            var state = states.top();
            if (state){
                    state.update();
            }
    };
    this.render = function (){
            var state = states.top();
            if (state){
                    state.render();
            }
    };
    this.push = function (state) {
            states.push(state);
            state.onEnter();
    };
    this.pop = function () {
            var state = states.top();
            state.onExit();
            return states.pop();
    };

    this.pause = function (){
            var state = states.top();
            if (state.onPause){
                    state.onPause();
            }
    };

    this.resume = function (){
            var state = states.top();
            if (state.onResume){
                    state.onResume();
            }
    };
};

export {StateList, StateStack};