(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{410:function(e,n,a){"use strict";var r=a(139),t=a(206);function i(e){e.register(r),e.register(t),function(e){e.languages.erb=e.languages.extend("ruby",{}),e.languages.insertBefore("erb","comment",{delimiter:{pattern:/^<%=?|%>$/,alias:"punctuation"}}),e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"erb",/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s[\s\S]*?^=end)+?%>/gm)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"erb")}))}(e)}e.exports=i,i.displayName="erb",i.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_erb-659850e2e026bb06e513.js.map