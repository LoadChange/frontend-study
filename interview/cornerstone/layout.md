# 基础
#### 准备要充分
#### 知识系统化
#### 沟通要简洁
#### 内心一定要诚实
#### 态度要谦虚
#### 回答要灵活

## 页面布局

1. 高度已知，三栏布局，左右两栏300px，中间自适应。
-     浮动
        <style>
        .solution-1 { height: 300px; overflow: hidden; }
        .solution-1 .left, .solution-1 .main, .solution-1 .right { height: 100%; }
        .solution-1 .left { float: left; width: 300px; background: red; }
        .solution-1 .main { margin: 0 300px; background: yellow; }
        .solution-1 .right { float: right; width: 300px; background: blue; }
        </style>
        <div class="solution-1">
            <div class="left"></div>
            <div class="right"></div>
            <div class="main"></div>
        </div>
        优点：兼容性好，写法简洁
        缺点：需要清除浮动，否则会高度塌陷；结构顺序不能改变，main不能使用clear:both，否则main会掉下来。
-     绝对定位
        <style>
        .solution-2 { position: relative; height: 300px; overflow: hidden; }
        .solution-2 .left, .solution-2 .right { position: absolute; top: 0; height: 100%; }
        .solution-2 .left { left: 0; width: 300px; background: red; }
        .solution-2 .main { height: 100%; margin: 0 310px; background: yellow; }
        .solution-2 .right { right:0; width: 300px; background: blue; }
        </style>
        <div class="solution-2">
            <div class="left"></div>
            <div class="main"></div>
            <div class="right"></div>
        </div>
        优点：div顺序可随意移动
        缺点：当用户电脑分辨率小到一定程度的时候会出现重叠
-     display: flex;
        <style>
        .solution-3 { display: flex; height: 300px; }
        .solution-3 .left, .solution-3 .right { flex: 0 0 300px; background: red; height: 100%;}
        .solution-3 .right { background: blue; }
        .solution-3 .main { flex: 1; height: 100%; margin: 0 10px; background: yellow; }
        </style>
        <div class="solution-3">
            <div class="left"></div>
            <div class="main"></div>
            <div class="right"></div>
        </div>
        优点：代码简洁易于理解
        缺点：不能兼容IE8及以下浏览器
-     table 布局
        <style>
        .solution-4 { display: table; width: 100%; }
        .solution-4 .cell{ display: table-cell; height: 300px; }
        .solution-4 .left{ background: red; width: 300px; }
        .solution-4 .right { background: blue; width: 300px; }
        .solution-4 .main { background: yellow; }
        </style>
        <div class="solution-4">
            <div class="cell left"></div>
            <div class="cell main"></div>
            <div class="cell right"></div>
        </div>
        优点：兼容性好，某些场景下可以作为flexbox的降级方案
        缺点：当某一栏被撑高时，其他栏也会一同增长高度

-     网格布局
        <style>
        .solution-5 { display: grid; width: 100%; grid-template-rows: 300px; grid-template-columns: 300px auto 300px;}
        .solution-5 .left{ background: red; }
        .solution-5 .right { background: blue; }
        .solution-5 .main { margin: 0 10px; background: yellow; }
        </style>
        <div class="solution-5">
            <div class="left"></div>
            <div class="main"></div>
            <div class="right"></div>
        </div>
        优点：下一代布局标准
        缺点：兼容性差

-       margin负值法
        <style>
        .solution-6 { height: 300px; }
        .solution-6 .main {width: 100%; height: 100%; float: left; }
        .solution-6 .main .content { margin: 0 310px; height: 100%; background: yellow; }
        .solution-6 .left { float: left; width: 300px; height: 100%; background: red; margin-left: -100%; }
        .solution-6 .right { float: left; width: 300px; height: 100%; background: blue; margin-left: -300px; }
        </style>
        <div class="solution-6">
            <div class="main">
                <div class="content"></div>
            </div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
        优点：三栏相互关联，可谓真正意义上的自适应，有一定的抗性——布局不易受内部影响。
        缺点：相对比较难理解些，上手不容易，代码相对复杂。出现百分比宽度，过多的负值定位，如果出现布局的bug，排查不易。

##### 页面布局小结

- 语义化掌握到位
- 页面布局理解深刻
- CSS基础知识扎实
- 思维灵活且积极上进
- 代码书写规范
