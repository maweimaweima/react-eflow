# react-eflow
##### eflow 通过使用默认配置策略来管理数据流，实现快捷易用。

1. 使用Store管理数据，Store的方法有2个作用，既可以用于处理相关业务数据，又可通过该方法的dispatch方法发布数据，数据存在Store的缓存中，该属性与该方法同名。
2. 通过wrapComponent包装用户组件 `wrapComponent(SomeComponent, [xxxStore.doSomething])`
在SomeComponent的props.doSomething中则自动绑定xxxStore在doSomething方法中dispatch的参数合集数据

### 安装

```
npm install react-eflow -save
```
### 简单使用介绍

##### 1. 新建Store子类，并实例化

```
import {Store} from 'react-eflow'
class SomeStore extends Store{
  constructor(options){
    super(options);
  }

  add(){
    //通过this.add获取该方法的dispatch
    var dispatch = this.add.dispatch;
    //发布相关数据，发布后在该对象内部state的add属性包含发布值
    dispatch({request: true});
  }
//实例化
export default new SomeStore();
```

##### 2. 调用Store的实例

```
import {wrapComponent} from 'react-eflow'
import someStore from '../store/SomeStore'

class SomeHeader extends Component {
  constructor(props){
    super(props);
    //调用someStore.add
    someStore.add();
    //调用完成后，state值为： {add:{request: true}}
  }
  render(){
    return <div></div>;
  }
}

export default SomeHeader;
```

##### 3. 同步Store数据到组件

```
import {wrapComponent} from 'react-eflow'
import someStore from '../store/SomeStore'

class SomeHeader extends Component {
  constructor(props){
    super(props);
    //调用someStore.add
    someStore.add();
    //调用完成后，state值为： {add:{request: true}}
  }
  render(){
    {/*在this.props.add中则会有{request: true} 对象*/}
    let request = this.props.add.request;
    return (
      <div>
      {request}
      </div>
    );
  }
}
//需要先包装SomeHeader组件，再绑定someStore.add方法，
//使someStore.add.dispatch触发后自动更新数据到SomeHeader组件的props.add属性上
//在render内部通过props即可获取request值
export default wrapComponent(SomeHeader, [someStore.add]);
```





