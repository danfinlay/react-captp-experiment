(this["webpackJsonpreact-captp-experiment"]=this["webpackJsonpreact-captp-experiment"]||[]).push([[0],{107:function(t,e,n){"use strict";n.r(e);n(105);var r=n(12),c=n.n(r),a=n(59),o=n.n(a),u=(n(69),n(2)),i=n(3),s=n.n(i),f=n(5);n(106),n(108);lockdown();var l=n(42),p=n(41);function h(t,e){var n,r,c,a=new p.Duplex;a._read=b;var o=Object(l.b)(t,(function(t){a.push(JSON.stringify(t))}),e);return n=o.dispatch,r=o.getBootstrap,c=o.abort,a._write=function(t,e,r){try{n(JSON.parse(t))}catch(c){return r(c)}r()},a._writev=function(t,e){try{t.forEach((function(t){n(JSON.parse(t))}))}catch(r){return e(r)}e()},a._final=function(t){c(),t()},{getBootstrap:r,abort:c,E:l.a,captpStream:a}}function b(){}n(83);var d=n(9);function j(t){var e=Object(r.useState)("Loading name..."),n=Object(u.a)(e,2),c=n[0],a=n[1],o=Object(r.useState)(c),i=Object(u.a)(o,2),s=i[0],f=i[1],l=t.E,p=t.bootstrap;function h(t){t.then((function(t){var e=Object(u.a)(t,2),n=e[0],r=e[1];a(n),h(r)}))}return l(p).getLatestName().then((function(t){var e=Object(u.a)(t,2),n=e[0],r=e[1];console.log("name returned"),a(n),h(r)})),Object(d.jsxs)("div",{children:[Object(d.jsx)("p",{children:c}),Object(d.jsx)("input",{type:"text",placeholder:c,onChange:function(t){f(t.target.value)}}),Object(d.jsx)("button",{onClick:function(){l(p).setName(s).then((function(t){console.log("name updated successfully!")})).catch((function(t){console.error("name update failed: ".concat(t))}))},children:"Change"})]})}var v,O,m=n(85),w=n(91),x=m(),S=x.clientSide,g=x.serverSide,y="Anon",k=h("server",harden({getName:function(){var t=Object(f.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("name requested"),t.abrupt("return",new Promise((function(t){setTimeout((function(){return t(y)}),500)})));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),getLatestName:function(){var t=Object(f.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v||(O=new Promise((function(t){v=t}))),t.abrupt("return",[y,O]);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),setName:function(){var t=Object(f.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:y=e,v&&(n=v,O=new Promise((function(t){v=t})),n([e,O]));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()})).captpStream;w(k,g,k);var N=h("client",harden({})),E=N.getBootstrap,_=N.E,C=N.captpStream;w(C,S,C);var J=function(){var t=Object(r.useState)(void 0),e=Object(u.a)(t,2),n=e[0],c=e[1],a=Object(r.useState)(void 0),o=Object(u.a)(a,2),i=o[0],s=o[1];E().then((function(t){c(t)})).catch((function(t){s(t)}));var f=i||n?Object(d.jsx)(j,{bootstrap:n,E:_}):"Loading";return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("h1",{children:"CapTP React Test"}),f]})};o.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(J,{})}),document.getElementById("root"))},69:function(t,e,n){},72:function(t,e){},74:function(t,e){},83:function(t,e,n){},85:function(t,e,n){"use strict";n.r(e),function(t){var e=n(60),r=n(61),c=n(63),a=n(62),o=n(41).Duplex,u=n(87),i=Symbol("Callback"),s=Symbol("Other"),f=function(t){Object(c.a)(o,t);var n=Object(a.a)(o);function o(t){var r;return Object(e.a)(this,o),(r=n.call(this,t))[i]=null,r[s]=null,r}return Object(r.a)(o,[{key:"_read",value:function(){var t=this[i];t&&(this[i]=null,t())}},{key:"_write",value:function(t,e,n){u.notStrictEqual(this[s],null),u.strictEqual(this[s][i],null),this[s][i]=n,this[s].push(t)}},{key:"_final",value:function(t){this[s].on("end",t),this[s].push(null)}}]),o}(o);t.exports=function(){var t=new f({objectMode:!0}),e=new f({objectMode:!0});return t[s]=e,e[s]=t,{clientSide:t,serverSide:e}}}.call(this,n(86)(t))},94:function(t,e){},97:function(t,e){},99:function(t,e){}},[[107,1,2]]]);
//# sourceMappingURL=main.e3a9b51c.chunk.js.map