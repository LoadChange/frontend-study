### 类与实例

```
    /**
     * 类的声明
     */
    var Animal = function() {
      this.name = 'Animal';
    };

    /**
     * es6中class的声明
     */
    class Animal2 {
      constructor() {
        this.name = 'Animal2';
      }
    }

    /**
     * 实例化
     */
    console.log(new Animal(), new Animal2());

```



### 类与继承
```
    /**
     * 借助构造函数实现继承
     */
    function Parent1() {
      this.name = 'parent1';
    }
    Parent1.prototype.say = function() {

    };

    function Child1() {
      Parent1.call(this);
      this.type = 'child1';
    }
    console.log(new Child1());
    // console.log(new Child1().say())

    // 将父类的构造函数的this指向子类的构造函数，实现集成;这种继承不能继承父类原型链的属性和方法

```
---
```
    /**
     * 借助原型链实现继承
     */
    function Parent2() {
      this.name = 'parent2';
      this.play = [1, 2, 3];
    }

    function Child2() {
      this.type = 'child2';
    }
    Child2.prototype = new Parent2();

    var s1 = new Child2();
    var s2 = new Child2();
    console.log(s1.play, s2.play);
    s1.play.push(4);

    // 原型链中的对象是共用的，改变一个引用对象的值时，不同实例的子类对象会同时改变
```

---
```
    /**
     * 组合方式
     */
    function Parent3() {
      this.name = 'parent3';
      this.play = [1, 2, 3];
    }

    function Child3() {
      Parent3.call(this);
      this.type = 'child3';
    }
    Child3.prototype = new Parent3();
    var s3 = new Child3();
    var s4 = new Child3();
    s3.play.push(4);
    console.log(s3.play, s4.play);

    /**
     * 组合继承的优化1
     * @type {String}
     */
    function Parent4() {
      this.name = 'parent4';
      this.play = [1, 2, 3];
    }

    function Child4() {
      Parent4.call(this);
      this.type = 'child4';
    }
    Child4.prototype = Parent4.prototype;
    var s5 = new Child4();
    var s6 = new Child4();
    console.log(s5, s6);

    console.log(s5 instanceof Child4, s5 instanceof Parent4);
    console.log(s5.constructor);

    // 子类直接引用父类的prototype，造成无法区分实例对象的原型对象

    /**
     * 组合继承的优化2
     */
    function Parent5() {
      this.name = 'parent5';
      this.play = [1, 2, 3];
    }

    function Child5() {
      Parent5.call(this);
      this.type = 'child5';
    }
    Child5.prototype = Object.create(Parent5.prototype);
    Child5.prototype.constructor = Child5
```
