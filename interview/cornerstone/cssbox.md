### CSS盒模型

---
基本概念：标准模型+IE模型
- element : 元素。
- padding : 内边距，也有资料将其翻译为填充。
- border : 边框。
- margin : 外边距，也有资料将其翻译为空白或空白边。

标准盒模型和IE盒模型的区别？

*答：标准模型的宽度表示的就是元素本身的宽度，他不包含padding和border；IE模型的宽度是包含padding和border的。*

---

CSS如何设置两种盒模型？

*答：box-sizing:content-box;(标准模型，默认值)或者box-sizing:border-box;(IE模型)*

---

JS如何设置和获取对应的宽和高？

*答：*
1.  通获取元素的css属性，dom.style.width、dom.style.height,这种方法可以取到内联样式的宽和高。
2.  dom.currentStyle.width/height 可以取到内联和外部的css样式设置的宽高，是最终渲染的宽高。
3.  window.getComputedStyle(dom).width/height 同2的效果一致，但是3的通用性更好一些。
4.  dom.getBoundingClientRect().width/height 此方法可以拿到8个属性，top、right、bottom、left、width、height、x、y，即该元素相关的CSS 边框集合 。

---

实例题（根据盒模型解释边距重叠）
```
<style>
*{
    padding:0;
    margin:0;
}
#sec{
    background: #f00;
}
.child{
    height:100px;
    margin-top:10px;
    background: yellow;
}
</style>
<div id="sec">
    <div class="child"></div>
</div>
```
计算父元素的实际高度？

*答：父元素高度默认为100px;#sec增加overflow: hidden;创建BFC（块级格式化上下文）后高度为110px。*

++兄弟元素边距合并，取两者最大值；空元素设置了上边距和下边距，取两者最大值作为它的边距++

---

BFC（边距重叠坚决方案）或者IFC

BFC的基本概念：块级格式化上下文，主要解决边距重叠问题。
BFC的原理、渲染规则：

1. 在BCF元素的垂直方向的边距会发生重叠
2. BFC的区域不会与浮动元素的box重叠
3. BFC在页面上是一个独立的容器，外面的元素不会影响它里面的元素，里面的元素也不会影响外面的元素。
4. 计算BFC高度的时候，浮动元素也会参与计算。

如何创建BFC？
- overflow不为auto等于设置了BFC;
- float值不为none，只要设置了浮动，当前元素就创建了BFC
- position值不为static或relative，就创建了一个BFC
- display为inline-block或和table相关的，创建了BFC

BFC的使用场景是什么？
...

IFC：内联格式化上下文。
