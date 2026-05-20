import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {

    start() {
        console.log('xin chào thế giới');
        console.log('xin chao the gioi');
    }

}

