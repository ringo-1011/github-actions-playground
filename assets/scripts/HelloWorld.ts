import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    start() {

    }

    WrongNameConvention() {
        var a = "hello there";
        console.log("This method name does not follow the camelCase convention.");
    }
}

