### 基本概念
- DOM事件的基本概念
- DOM事件模型
- DOM事件流
- 描述DOM事件捕获的具体流程
- Event对象的常见应用
- 自定义事件

##### DOM事件的级别
1. DOM0    element.onclick = function(){}
2. DOM2    element.addEventListener('click',function(){},false)
3. DOM3    element.addEventListener('keyup',function(){},false)

##### DOM事件模型
- [x]  捕获 向下
- [x]  冒泡 向上

##### 描述DOM事件捕获的具体流程

```
graph LR
window-->docment
docment-->html
html-->body
body-->其他层级
其他层级-->目标元素
```
> 冒泡流程相反

##### Event的对象的常见应用
- event.preventDefault() 阻止默认行为
- event.stopProPagation() 阻止冒泡行为
- event.stopImmediatePropagation() 多个事件监听函数将按照顺序依次执行.如果某个监听函数执行了 event.stopImmediatePropagation()方法,则除了该事件的冒泡行为被阻止之外(event.stopPropagation方法的作用),该元素绑定的后序相同类型事件的监听函数的执行也将被阻止
- event.currentTarget
- event.target

> 一个for循环给一个dom注册了N个事件，怎么去优化？事件代理，把子元素的事件都转移到父级元素，绑定一次事件就可以了，要区分当前元素。target就是当前点击的元素，currentTarget是绑定事件的元素。

##### 自定义事件
```
var eve = new Event('custome') // 声明
ev.addEventListener('custome',function(){ // 绑定
    console.log('custome')
})
ev.dispatchEvent(eve) // 触发

// CustomEvent

var myEvent = new CustomEvent("userLogin", {
	detail: {
		username: "davidwalsh"
	}
});
```
