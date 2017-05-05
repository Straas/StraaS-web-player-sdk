StraaS SDK
===

## DEMO

[https://straas.github.io/StraaS-web-sdk-sample/](https://straas.github.io/StraaS-web-sdk-sample/)

## Getting Started

Prepare HTML, for instance `index.html`

```html
<div id="player"></div>

<script src="//app.straas.net/straas_sdk"></script>
<script src="./index.js"></script>
```

Prepare your initialization script, for instance `index.js`

```js
var playerInstance
window['StraaSOnInit'] = function() {
  var StraaS = window.StraaS

  var Player = StraaS.Player

  playerInstance = new Player('#player', Argument2)
}
```

for more Argument2 detail please visit [WIKI](https://github.com/StraaS/StraaS-web-document/wiki/SDK-Player)
