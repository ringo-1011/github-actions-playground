import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    start() {
    }

    InvalidMethodName() {// This method is name is invalid.
        console.log('This log should be remove before committing.');
        d
    }
}

