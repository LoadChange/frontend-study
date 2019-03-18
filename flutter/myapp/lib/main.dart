import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: new Card(
            color: Colors.blue,
            child: new Container(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      '增加',
                      style: new TextStyle(
                          color: Colors.white,
                          fontSize: _counter < 12 ? 12 : _counter.toDouble()),
                    ),
                    Text(
                      '$_counter',
                      style: Theme.of(context).textTheme.display1,
                    ),
                  ],
                ))),
      ),
      floatingActionButton: new MyButton(
        onTap: _incrementCounter,
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  final VoidCallback onTap;

  MyButton({this.onTap});

  @override
  Widget build(BuildContext context) {
    return new Material(
      borderRadius: new BorderRadius.circular(8.0),
      color: Colors.red,
      child: new InkWell(
        onTap: this.onTap,
        child: new Container(
          padding: const EdgeInsets.all(16.0),
          child: new Icon(
            Icons.add,
            size: 32.0,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
