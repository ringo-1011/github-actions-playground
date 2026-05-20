import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {

    start() {
        console.log('Đây là một câu tiếng Việt hoàn chỉnh để kiểm tra hệ thống');
    }

}

