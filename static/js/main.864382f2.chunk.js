(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{118:function(e,t,a){"use strict";a.r(t);var n,c=a(3),s=a.n(c),o=a(27),i=a.n(o),l=(a(66),a(67),a(10)),r=a(128),u=a(126),b=a(17);function j(e){return 7*e.weeks+e.days}!function(e){e[e.GestAgeAtDate=0]="GestAgeAtDate",e[e.DateAtGestAge=1]="DateAtGestAge"}(n||(n={}));var g=new r.a,d=g.pipe(Object(u.a)(28)),O=Object(b.a)(d,0),h=Object(l.a)(O,2),v=h[0],f=h[1],p=new r.a,x=p.pipe(Object(u.a)(0)),D=Object(b.a)(x,0),A=Object(l.a)(D,2),k=A[0],y=A[1],m=new r.a,w=m.pipe(Object(u.a)(28)),N=function(e){m.next(e)},C=Object(b.a)(w,0),G=Object(l.a)(C,2),F=G[0],M=G[1],H=new r.a,Y=H.pipe(Object(u.a)(0)),S=function(e){H.next(e)},W=Object(b.a)(Y,0),B=Object(l.a)(W,2),I=B[0],J=B[1],L=new r.a,P=L.pipe(Object(u.a)(new Date)),T=Object(b.a)(P,new Date),E=Object(l.a)(T,2),V=E[0],Z=E[1],q=new r.a,z=q.pipe(Object(u.a)(new Date)),K=function(e){q.next(e)},Q=Object(b.a)(z,new Date),R=Object(l.a)(Q,2),U=R[0],X=R[1],$=new r.a,_=$.pipe(Object(u.a)(n.GestAgeAtDate)),ee=function(e){$.next(e)},te=Object(b.a)(_,n.GestAgeAtDate),ae=Object(l.a)(te,2),ne=(ae[0],ae[1]),ce=a(41),se=a(42),oe=a(34),ie=a(127),le=function(){function e(){Object(ce.a)(this,e)}return Object(se.a)(e,[{key:"run",value:function(){Object(ie.a)([ne,Z,f,y,X,M,J]).subscribe((function(e){if(e[0]===n.GestAgeAtDate){var t=e[1],a={weeks:e[2],days:e[3]},c=e[4],s=oe.b.of(c.getFullYear(),c.getMonth()+1,c.getDate()),o=oe.b.of(t.getFullYear(),t.getMonth()+1,t.getDate()),i=oe.a.DAYS.between(o,s),l=7*a.weeks+a.days+i,r=l%7,u=(l-r)/7;console.log("calculated gest age: ".concat(u,"/").concat(r)),u!==e[5]&&N(u),r!==e[6]&&S(r)}else if(e[0]===n.DateAtGestAge){var b=e[1],g={weeks:e[2],days:e[3]},d=oe.b.of(b.getFullYear(),b.getMonth()+1,b.getDate()),O=j({weeks:e[5],days:e[6]})-j(g),h=d.plusDays(O),v=new Date(h.year(),h.monthValue()-1,h.dayOfMonth());v.getFullYear===e[4].getFullYear&&v.getMonth()===e[4].getMonth()&&v.getDate()===e[4].getDate()||(console.log("calculated date at gest age: ".concat(v)),K(v))}}))}}]),e}(),re=a(57),ue=a.n(re),be=(a(68),a(6)),je=function(e){var t=e.valueHook();return Object(be.jsxs)("div",{children:[Object(be.jsx)("p",{className:"label",children:e.label}),Object(be.jsx)(ue.a,{className:"datepick",dateFormat:"dd/MM/yyyy",selected:t,onChange:e.onChange})]})},ge=function(e){return e.target.select()},de=function(e){var t=e.weeksHook(),a=e.daysHook();return Object(be.jsxs)("div",{children:[Object(be.jsx)("p",{className:"label",children:e.label}),Object(be.jsxs)("div",{children:[Object(be.jsx)("input",{className:"gest-input",onFocus:ge,onChange:function(a){return function(e,a){var n=Number(e.target.value);isNaN(n)||n<0||n>99?e.target.value=t.toString():a(e)}(a,e.onWeeksChange)},value:t}),"Weeks",Object(be.jsx)("input",{className:"gest-input",onFocus:ge,onChange:function(t){return function(e,t){var n=Number(e.target.value);isNaN(n)||n<0||n>6?e.target.value=a.toString():t(e)}(t,e.onDaysChange)},value:a}),"Days"]})]})};(new le).run();var Oe=function(e){var t;t=Number(e.target.value),g.next(t)},he=function(e){var t;t=Number(e.target.value),p.next(t)},ve=function(e){ee(n.DateAtGestAge),N(Number(e.target.value))},fe=function(e){ee(n.DateAtGestAge),S(Number(e.target.value))},pe=function(e){ee(n.GestAgeAtDate),K(e)};var xe=function(){var e=v(),t=k(),a=7*F()+I()-(7*e+t);return Object(be.jsxs)("div",{className:"App",children:[Object(be.jsxs)("div",{className:"title",children:[Object(be.jsx)("p",{children:"Nicola's AMAZING"}),Object(be.jsx)("p",{children:" Gestational Age Calculator"})]}),Object(be.jsx)("div",{className:"section",children:Object(be.jsx)(je,{label:"Birthday",valueHook:V,onChange:function(e){return t=e,void L.next(t);var t}})}),Object(be.jsx)("div",{className:"section",children:Object(be.jsx)(de,{label:"Gestational age at birth",onWeeksChange:Oe,onDaysChange:he,weeksHook:v,daysHook:k})}),Object(be.jsxs)("div",{className:"section",children:[Object(be.jsx)(je,{label:"Calculation date",valueHook:U,onChange:pe}),Object(be.jsxs)("p",{children:["age: ",a," days"]})]}),Object(be.jsx)("div",{className:"section",children:Object(be.jsx)(de,{label:"Corrected gestational age",onWeeksChange:ve,onDaysChange:fe,weeksHook:F,daysHook:I})}),Object(be.jsx)("p",{className:"footer",children:"v0.0.3"})]})},De=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,129)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),s(e),o(e)}))};i.a.render(Object(be.jsx)(s.a.StrictMode,{children:Object(be.jsx)(xe,{})}),document.getElementById("root")),De()},66:function(e,t,a){},67:function(e,t,a){}},[[118,1,2]]]);
//# sourceMappingURL=main.864382f2.chunk.js.map