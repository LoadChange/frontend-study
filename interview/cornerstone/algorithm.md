- 排序
    1. 冒泡排序
    ```
        function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                    var temp = arr[j+1];        //元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    ```
    2. 快速排序
    ```
    pass

    ```
    3. 选择排序
    ```
    for(var i=0;i<arr.length-1;i++){
        minIndex=i
        for(var j=i+1;j<arr.length;j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    	console.log(arr)
    }
    ```
    4. 希尔排序
    ```
    pass
    ```
    5. 插入排序
    ```
    for(var i =1;i<arr.length;i++){
        var key=arr[i]
        var j = i-1
        while(arr[j]>key){
            arr[j+1]=arr[j]
            j--
        }
        arr[j+1]=key
    }
    ```
- 堆栈、队列、链表

[https://juejin.im/entry/58759e79128fe1006b48cdfd](https://juejin.im/entry/58759e79128fe1006b48cdfd)

- 递归

[https://segmentfault.com/a/1190000009857470](https://segmentfault.com/a/1190000009857470)

- 波兰式和逆波兰式
原理：[http://www.cnblogs.com/chenying99/p/3675876.html](http://www.cnblogs.com/chenying99/p/3675876.html)
代码：[github.com/Tairraos/rpn.js/blob/master/rpn.js](github.com/Tairraos/rpn.js/blob/master/rpn.js)


---
```
提示；
能写多少写多少；
解释原理
```
