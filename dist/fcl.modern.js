import*as e from"@onflow/sdk";import{config as t,send as n,getTransactionStatus as a,decode as r,resolve as s,pipe as o,interaction as i,createSignableVoucher as c,latestBlock as d}from"@onflow/sdk";export{TestUtils,account,arg,args,atBlockHeight,atBlockId,authorization,authorizations,build,config,createSignableVoucher,decode,getAccount,getBlock,getBlockByHeight,getBlockById,getBlockHeader,getCollection,getEvents,getEventsAtBlockHeightRange,getEventsAtBlockIds,getLatestBlock,getTransaction,getTransactionStatus,invariant,isBad,isOk,latestBlock,limit,param,params,payer,ping,pipe,proposer,ref,script,send,transaction,validator,why}from"@onflow/sdk";import{invariant as l}from"@onflow/util-invariant";import*as u from"@onflow/types";import{spawn as p,send as y,SUBSCRIBE as f,UNSUBSCRIBE as E,INIT as m,subscriber as h,snapshoter as g,UPDATED as w,SNAPSHOT as C}from"@onflow/util-actor";import{withPrefix as R,sansPrefix as S}from"@onflow/util-address";export{display,sansPrefix,withPrefix}from"@onflow/util-address";import*as L from"@onflow/rlp";import{uid as v}from"@onflow/util-uid";import P from"@react-native-community/async-storage";export{template as cadence,template as cdc}from"@onflow/util-template";async function I(e){return Object.fromEntries(Object.entries(await t().where(e)).map(([t,n])=>[t.replace(e,""),n]))}t().put("accessNode.api","http://localhost:8080").put("discovery.wallet","http://localhost:8701/fcl/authn").put("discovery.wallet.method","IFRAME/RPC");const A="0.0.77-alpha.3",b=e=>t=>typeof t===e,O=e=>null!=e,F=b("object"),N=b("string"),D=b("function"),k=b("number");function T(t){return D(t)?t(e.arg,u):[]}async function _(t={}){return await async function(e){l(O(e.cadence),"query({ cadence }) -- cadence is required"),l(N(e.cadence),"query({ cadence }) -- cadence must be a string")}(t),e.send([e.script(t.cadence),e.args(T(t.args||[])),t.limit&&"number"==typeof t.limit&&e.limit(t.limit)]).then(e.decode)}function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}const x={f_type:"Service",f_vsn:"1.0.0"},z={f_type:"Identity",f_vsn:"1.0.0"},W={f_type:"USER",f_vsn:"1.0.0"},M={f_type:"PollingResponse",f_vsn:"1.0.0"},U={f_type:"CompositeSignature",f_vsn:"1.0.0"};function j(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({old:e},x,{type:"frame",endpoint:e.endpoint,params:e.params||{},data:e.data||{}})}}function H(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({},x,{type:"back-channel-rpc",endpoint:e.endpoint,method:e.method,params:e.params||{},data:e.data||{}})}}function Y(e){if(null==e)return null;switch(null==e.method&&(e=V({},e,{type:"local-view",method:"VIEW/IFRAME"})),e.f_vsn){case"1.0.0":return e;default:return V({},x,{type:e.type||"local-view",method:e.method,endpoint:e.endpoint,data:e.data||{},params:e.params||{}})}}const $={"back-channel-rpc":H,"pre-authz":function(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({},x,{type:e.type,uid:e.id,endpoint:e.endpoint,method:e.method,identity:V({},z,{address:R(e.addr),keyId:e.keyId}),params:e.params,data:e.data})}},authz:function(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({},x,{type:e.type,uid:e.id,endpoint:e.endpoint,method:e.method,identity:V({},z,{address:R(e.addr),keyId:e.keyId}),params:e.params,data:e.data})}},authn:function(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({},x,{type:e.type,uid:e.id,endpoint:e.authn,id:e.pid,provider:{address:R(e.addr),name:e.name,icon:e.icon}})}},frame:j,"open-id":function(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return null}},"user-signature":function(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:throw new Error("Invalid user-signature service")}},"local-view":Y};function B(e){return L.encode([e.provider.address||e.provider.name||"UNSPECIFIED",e.id]).toString("hex")}function J(e=[],t){return e.find(e=>e.type===t)}function K(e){const t=new URL(e.endpoint);if(t.searchParams.append("l6n",window.location.origin),null!=e.params)for(let[n,a]of Object.entries(e.params||{}))t.searchParams.append(n,a);return t}function G(e,t={}){const n=t.method||"POST",a="GET"===n?void 0:JSON.stringify(t.data||e.data||{});return fetch(K(e),{method:n,headers:V({},e.headers||{},t.headers||{},{"Content-Type":"application/json"}),body:a}).then(e=>e.json())}function q(e){var t;if(null==e)return null;switch((e.addr||e.services)&&(e={status:"APPROVED",data:V({},e)}),e.f_vsn){case"1.0.0":return e;default:return V({},M,{status:e.status,reason:null!=(t=e.reason)?t:null,data:e.compositeSignature||e.data||{},updates:H(e.authorizationUpdates),local:j((e.local||[])[0])})}}const Z={"HTTP/GET":"GET","HTTP/POST":"POST"},X=e=>(l(Z[e.method],"Invalid Service Method for type back-channel-rpc",{service:e}),Z[e.method]);async function Q(e,t=(()=>!0)){if(l(e,"Missing Polling Service",{service:e}),!t())throw new Error("Externally Halted");const n=await G(e,{method:X(e)}).then(q);switch(n.status){case"APPROVED":return n.data;case"DECLINED":throw new Error(`Declined: ${n.reason||"No reason supplied."}`);default:return await new Promise(e=>setTimeout(e,500)),Q(n.updates,t)}}const ee="FCL_IFRAME";function te(e){l(!document.getElementById(ee),"Attempt at triggering multiple Frames",{src:e});const t=document.createElement("iframe");return t.src=e,t.id=ee,t.allow="usb *; hid *",t.frameBorder="0",t.style.cssText="\n  position:fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  height: 100vh;\n  width: 100vw;\n  display:block;\n  background:rgba(0,0,0,0.25);\n  z-index: 2147483647;\n  box-sizing: border-box;\n",document.body.append(t),[t.contentWindow,()=>{document.getElementById(ee)&&document.getElementById(ee).remove()}]}let ne=null,ae=null;function re(e,t,n,a,r){return n.open(e,t,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${a}, height=${r}, top=${n.top.outerHeight/2+n.top.screenY-r/2}, left=${n.top.outerWidth/2+n.top.screenX-a/2}`)}function se(e){var t;null==ne||null!=(t=ne)&&t.closed?ne=re(e,"FCL_POP",window,640,600):ae!==e?(ne=re(e,"FCL_POP",window,640,600),ne.focus()):ne.focus(),ae=e;var n=setInterval(function(){ne&&ne.closed&&(clearInterval(n),ne=null)},1e3);return[ne,()=>{ne&&!ne.closed&&(ne.close(),ne=null)}]}let oe=null,ie=null;function ce(e){var t;null==oe||null!=(t=oe)&&t.closed?oe=window.open(e,"_blank"):ie!==e?(oe=window.open(e,"_blank"),oe.focus()):oe.focus(),ie=e;var n=setInterval(function(){oe&&oe.closed&&(clearInterval(n),oe=null)},1e3);return[oe,()=>{oe&&!oe.closed&&(oe.close(),oe=null)}]}const de={"VIEW/IFRAME":te,"VIEW/POP":se,"VIEW/TAB":ce};async function le(e,t,n={}){t.data=e.data;const a=await G(e,{data:t}).then(q);if("APPROVED"===a.status)return a.data;if("DECLINED"===a.status)throw new Error(`Declined: ${a.reason||"No reason supplied."}`);if("PENDING"===a.status){var r=!0;const[e,t]=await async function(e,t={}){try{return de[e.method](K(e),t)}catch(n){throw console.error("execLocal({service, opts = {}})",n,{service:e,opts:t}),n}}(Y(a.local)),n=()=>{try{t(),r=!1}catch(e){console.error("Frame Close Error",e)}};return Q(a.updates,()=>r).then(e=>(n(),e)).catch(e=>{throw console.error(e),n(),e})}throw console.error("Auto Decline: Invalid Response",{service:e,resp:a}),new Error("Auto Decline: Invalid Response")}const ue=()=>{},pe=e=>"string"==typeof e&&e.toLowerCase(),ye=(e,t)=>console.warn("DEPRECATION NOTICE",`Received ${e}, please use ${t} for this and future versions of FCL`),fe=new Set(["monetizationstart","monetizationpending","monetizationprogress","monetizationstop"]),Ee=()=>{},me=e=>"string"==typeof e&&e.toLowerCase(),he=(e,t)=>console.warn("DEPRECATION NOTICE",`Received ${e}, please use ${t} for this and future versions of FCL`),ge=new Set(["monetizationstart","monetizationpending","monetizationprogress","monetizationstop"]),we=()=>{},Ce=e=>"string"==typeof e&&e.toLowerCase(),Re=(e,t)=>console.warn("DEPRECATION NOTICE",`Received ${e}, please use ${t} for this and future versions of FCL`),Se=new Set(["monetizationstart","monetizationpending","monetizationprogress","monetizationstop"]),Le={"HTTP/RPC":le,"HTTP/POST":le,"IFRAME/RPC":function(e,t,n){return new Promise((a,r)=>{const s=v(),o=n.includeOlderJsonRpcCall;t.data=e.data,function(e,t={}){if(null==e)return{send:ue,close:ue};const n=t.onClose||ue,a=t.onMessage||ue,r=t.onReady||ue,s=t.onResponse||ue;window.addEventListener("message",c);const[o,i]=te(K(e));return{send:l,close:d};function c(e){try{if("object"!=typeof e.data)return;if(fe.has(e.data.type))return;pe(e.data.type)===pe("FCL:VIEW:CLOSE")&&d(),pe(e.data.type)===pe("FCL:VIEW:READY")&&r(e,{send:l,close:d}),pe(e.data.type)===pe("FCL:VIEW:RESPONSE")&&s(e,{send:l,close:d}),a(e,{send:l,close:d}),pe(e.data.type)===pe("FCL:FRAME:READY")&&(ye(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),pe(e.data.type)===pe("FCL:FRAME:RESPONSE")&&(ye(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),pe(e.data.type)===pe("FCL:FRAME:CLOSE")&&(ye(e.data.type,"FCL:VIEW:CLOSE"),d()),pe(e.data.type)===pe("FCL::CHALLENGE::RESPONSE")&&(ye(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),pe(e.data.type)===pe("FCL::AUTHZ_READY")&&(ye(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),pe(e.data.type)===pe("FCL::CHALLENGE::CANCEL")&&(ye(e.data.type,"FCL:VIEW:CLOSE"),d()),pe(e.data.type)===pe("FCL::CANCEL")&&(ye(e.data.type,"FCL:VIEW:CLOSE"),d())}catch(e){console.error("Frame Callback Error",e),d()}}function d(){try{window.removeEventListener("message",c),i(),n()}catch(e){console.error("Frame Close Error",e)}}function l(e){try{o.postMessage(JSON.parse(JSON.stringify(e||{})),"*")}catch(t){console.error("Frame Send Error",e,t)}}}(e,{async onReady(n,{send:a}){try{a({type:"FCL:VIEW:READY:RESPONSE",body:t,service:{params:e.params,data:e.data},config:{services:await I(/^service\./),app:await I(/^app\.detail\./)}}),a({type:"FCL:FRAME:READY:RESPONSE",body:t,service:{params:e.params,data:e.data},config:{services:await I(/^service\./),app:await I(/^app\.detail\./)},deprecated:{message:"FCL:FRAME:READY:RESPONSE is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"}}),o&&a({jsonrpc:"2.0",id:s,method:"fcl:sign",params:[t,e.params],deprecated:{message:"jsonrpc is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"}})}catch(e){throw e}},onResponse(e,{close:t}){try{if("object"!=typeof e.data)return;const n=q(e.data);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execIframeRPC onResponse error",e),e}},onMessage(e,{close:t}){try{if("object"!=typeof e.data)return;if("2.0"!==e.data.jsonrpc)return;if(e.data.id!==s)return;const n=q(e.data.result);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execIframeRPC onMessage error",e),e}},onClose(){r("Declined: Externally Halted")}})})},"POP/RPC":function(e,t,n){return new Promise((a,r)=>{const s=v(),o=n.includeOlderJsonRpcCall;t.data=e.data,function(e,t={}){if(null==e)return{send:Ee,close:Ee};const n=t.onClose||Ee,a=t.onMessage||Ee,r=t.onReady||Ee,s=t.onResponse||Ee;window.addEventListener("message",c);const[o,i]=se(K(e));return{send:l,close:d};function c(e){try{if("object"!=typeof e.data)return;if(ge.has(e.data.type))return;me(e.data.type)===me("FCL:VIEW:CLOSE")&&d(),me(e.data.type)===me("FCL:VIEW:READY")&&r(e,{send:l,close:d}),me(e.data.type)===me("FCL:VIEW:RESPONSE")&&s(e,{send:l,close:d}),a(e,{send:l,close:d}),me(e.data.type)===me("FCL:FRAME:READY")&&(he(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),me(e.data.type)===me("FCL:FRAME:RESPONSE")&&(he(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),me(e.data.type)===me("FCL:FRAME:CLOSE")&&(he(e.data.type,"FCL:VIEW:CLOSE"),d()),me(e.data.type)===me("FCL::CHALLENGE::RESPONSE")&&(he(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),me(e.data.type)===me("FCL::AUTHZ_READY")&&(he(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),me(e.data.type)===me("FCL::CHALLENGE::CANCEL")&&(he(e.data.type,"FCL:VIEW:CLOSE"),d()),me(e.data.type)===me("FCL::CANCEL")&&(he(e.data.type,"FCL:VIEW:CLOSE"),d())}catch(e){console.error("Popup Callback Error",e),d()}}function d(){try{window.removeEventListener("message",c),i(),n()}catch(e){console.error("Popup Close Error",e)}}function l(e){try{o.postMessage(JSON.parse(JSON.stringify(e||{})),"*")}catch(t){console.error("Popup Send Error",e,t)}}}(e,{async onReady(n,{send:a}){try{a({type:"FCL:VIEW:READY:RESPONSE",body:t,service:{params:e.params,data:e.data},config:{services:await I(/^service\./),app:await I(/^app\.detail\./)}}),o&&a({jsonrpc:"2.0",id:s,method:"fcl:sign",params:[t,e.params]})}catch(e){throw e}},onResponse(e,{close:t}){try{if("object"!=typeof e.data)return;const n=q(e.data);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execPopRPC onResponse error",e),e}},onMessage(e,{close:t}){try{if("object"!=typeof e.data)return;if("2.0"!==e.data.jsonrpc)return;if(e.data.id!==s)return;const n=q(e.data.result);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execPopRPC onMessage error",e),e}},onClose(){r("Declined: Externally Halted")}})})},"TAB/RPC":function(e,t,n){return new Promise((a,r)=>{const s=v(),o=n.includeOlderJsonRpcCall;t.data=e.data,function(e,t={}){if(null==e)return{send:we,close:we};const n=t.onClose||we,a=t.onMessage||we,r=t.onReady||we,s=t.onResponse||we;window.addEventListener("message",c);const[o,i]=ce(K(e));return{send:l,close:d};function c(e){try{if("object"!=typeof e.data)return;if(Se.has(e.data.type))return;Ce(e.data.type)===Ce("FCL:VIEW:CLOSE")&&d(),Ce(e.data.type)===Ce("FCL:VIEW:READY")&&r(e,{send:l,close:d}),Ce(e.data.type)===Ce("FCL:VIEW:RESPONSE")&&s(e,{send:l,close:d}),a(e,{send:l,close:d}),Ce(e.data.type)===Ce("FCL:FRAME:READY")&&(Re(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),Ce(e.data.type)===Ce("FCL:FRAME:RESPONSE")&&(Re(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),Ce(e.data.type)===Ce("FCL:FRAME:CLOSE")&&(Re(e.data.type,"FCL:VIEW:CLOSE"),d()),Ce(e.data.type)===Ce("FCL::CHALLENGE::RESPONSE")&&(Re(e.data.type,"FCL:VIEW:RESPONSE"),s(e,{send:l,close:d})),Ce(e.data.type)===Ce("FCL::AUTHZ_READY")&&(Re(e.data.type,"FCL:VIEW:READY"),r(e,{send:l,close:d})),Ce(e.data.type)===Ce("FCL::CHALLENGE::CANCEL")&&(Re(e.data.type,"FCL:VIEW:CLOSE"),d()),Ce(e.data.type)===Ce("FCL::CANCEL")&&(Re(e.data.type,"FCL:VIEW:CLOSE"),d())}catch(e){console.error("Tab Callback Error",e),d()}}function d(){try{window.removeEventListener("message",c),i(),n()}catch(e){console.error("Tab Close Error",e)}}function l(e){try{o.postMessage(JSON.parse(JSON.stringify(e||{})),"*")}catch(t){console.error("Tab Send Error",e,t)}}}(e,{async onReady(n,{send:a}){try{a({type:"FCL:VIEW:READY:RESPONSE",body:t,service:{params:e.params,data:e.data},config:{services:await I(/^service\./),app:await I(/^app\.detail\./)}}),o&&a({jsonrpc:"2.0",id:s,method:"fcl:sign",params:[t,e.params]})}catch(e){throw e}},onResponse(e,{close:t}){try{if("object"!=typeof e.data)return;const n=q(e.data);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execPopRPC onResponse error",e),e}},onMessage(e,{close:t}){try{if("object"!=typeof e.data)return;if("2.0"!==e.data.jsonrpc)return;if(e.data.id!==s)return;const n=q(e.data.result);switch(n.status){case"APPROVED":a(n.data),t();break;case"DECLINED":r(`Declined: ${n.reason||"No reason supplied"}`),t();break;default:r("Declined: No reason supplied"),t()}}catch(e){throw console.error("execPopRPC onMessage error",e),e}},onClose(){r("Declined: Externally Halted")}})})}};async function ve({service:e,msg:t={},opts:n={}}){try{return Le[e.method](e,t,n)}catch(a){throw console.error("execService({service, msg = {}, opts = {}})",a,{service:e,msg:t,opts:n}),a}}function Pe(e){if(null==e)return null;switch(e.f_vsn){case"1.0.0":return e;default:return V({},U,{addr:S(e.addr||e.address),signature:e.signature||e.sig,keyId:e.keyId})}}const Ie="CURRENT_USER",Ae="CURRENT_USER/UPDATED",be='{\n  "f_type": "User",\n  "f_vsn": "1.0.0",\n  "addr":null,\n  "cid":null,\n  "loggedIn":null,\n  "expiresAt":null,\n  "services":[]\n}',Oe=async e=>(P.setItem(Ie,JSON.stringify(e)),e),Fe=()=>t().get("persistSession",!0),Ne={[m]:async e=>{if(e.merge(JSON.parse(be)),await Fe()){const t=await(async()=>{const e=JSON.parse(be),t=JSON.parse(P.getItem(Ie));return null!=t&&e.f_vsn!==t.f_vsn?(P.removeItem(Ie),e):t||e})();ke(t)&&e.merge(t)}},[f]:(e,t)=>{e.subscribe(t.from),e.send(t.from,Ae,V({},e.all()))},[E]:(e,t)=>{e.unsubscribe(t.from)},SNAPSHOT:async(e,t)=>{t.reply(V({},e.all()))},SET_CURRENT_USER:async(e,t,n)=>{e.merge(n),await Fe()&&Oe(e.all()),e.broadcast(Ae,V({},e.all()))},DEL_CURRENT_USER:async(e,t)=>{e.merge(JSON.parse(be)),await Fe()&&Oe(e.all()),e.broadcast(Ae,V({},e.all()))}},De=()=>p(Ne,Ie);function ke(e){return null==e.expiresAt||0===e.expiresAt||e.expiresAt>Date.now()}async function Te(){return new Promise(async(e,n)=>{De();const a=await ze();if(a.loggedIn&&ke(a))return e(a);const r=await t.first(["discovery.wallet","challenge.handshake"]),s=await t.first(["discovery.wallet.method"],"IFRAME/RPC");try{const t=await ve({service:{endpoint:r,method:s}});y(Ie,"SET_CURRENT_USER",await async function(e){var t=function(e=[],t=[]){return[...e,...t]}((e=function(e){return e.addr=e.addr?R(e.addr):null,e.paddr=e.paddr?R(e.paddr):null,e}(e)).services||[],await async function(e,t){if(null==e||null==t)return[];const n=new URL(e);n.searchParams.append("code",t);const a=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>e.json());if(Array.isArray(a))return a;const r=[];if(Array.isArray(a.authorizations))for(let e of a.authorizations)r.push(V({type:"authz",keyId:a.keyId},e));return null!=a.provider&&r.push(V({type:"authn",id:"wallet-provider#authn"},a.provider)),r}(e.hks,e.code)).map(t=>function(e,t){try{return $[e.type](e,t)}catch(t){return console.error(`Unrecognized FCL Service Type [${e.type}]`,e,t),e}}(t,e));const n=function(e,t){return t.find(e=>"authn"===e.type)}(0,t);return V({},W,{addr:R(e.addr),cid:B(n),loggedIn:!0,services:t,expiresAt:e.exp})}(t))}catch(e){console.error("Error while authenticating",e)}finally{e(await ze())}})}function _e(){De(),y(Ie,"DEL_CURRENT_USER")}async function Ve(e){De();const t=await Te(),n=J(t.services,"authz"),a=J(t.services,"pre-authz");return V({},e,a?{tempId:"CURRENT_USER",resolve:async(e,t)=>function(e){const t=(e=>({f_type:"PreAuthzResponse",f_vsn:"1.0.0",proposer:(e||{}).proposer,payer:(e||{}).payer||[],authorization:(e||{}).authorization||[]}))(e),n=[];null!=t.proposer&&n.push(["PROPOSER",t.proposer]);for(let e of t.payer||[])n.push(["PAYER",e]);for(let e of t.authorization||[])n.push(["AUTHORIZER",e]);return n.map(([e,t])=>({tempId:[t.identity.address,t.identity.keyId].join("|"),addr:t.identity.address,keyId:t.identity.keyId,signingFunction:e=>ve({service:t,msg:e}),role:{proposer:"PROPOSER"===e,payer:"PAYER"===e,authorizer:"AUTHORIZER"===e}}))}(await ve({service:a,msg:t}))}:{tempId:"CURRENT_USER",resolve:null,addr:S(n.identity.address),keyId:n.identity.keyId,sequenceNum:null,signature:null,signingFunction:async e=>Pe(await ve({service:n,msg:e,opts:{includeOlderJsonRpcCall:!0}}))})}function xe(e){De();const t="@EXIT",n=p(async n=>{for(n.send(Ie,f);;){const a=await n.receive();if(a.tag===t)return void n.send(Ie,E);e(a.data)}});return()=>y(n,t)}function ze(){return De(),y(Ie,"SNAPSHOT",null,{expectReply:!0,timeout:0})}const We=e=>(l(/^[0-9a-f]+$/i.test(e),"Message must be a hex string"),{message:e});async function Me(e){De();const t=J((await Te()).services,"user-signature");l(t,"Current user must have authorized a signing service.");try{const n=await ve({service:t,msg:We(e)});return Array.isArray(n)?n.map(e=>Pe(e)):[Pe(n)]}catch(e){return e}}async function Ue(e,t){l(/^[0-9a-f]+$/i.test(e),"Message must be a hex string"),l(Array.isArray(t),"Must include an Array of composite signatures");let n=[],a=[],r=[];const s=await Promise.all(t.map(async e=>{l("string"==typeof e.addr,"addr must be a string"),l("number"==typeof e.keyId,"keyId must be a number"),l("string"==typeof e.signature,"signature must be a string");try{const t=await t(e.addr);return n.push(t.keys[e.keyId].weight.toFixed(1)),a.push(t.keys[e.keyId].signAlgo),r.push(e.signature),t.keys[e.keyId].publicKey}catch(e){throw e}}));return await _({cadence:"\nimport Crypto\n    \npub fun main(\n  message: String,\n  rawPublicKeys: [String],\n  weights: [UFix64],\n  signAlgos: [UInt],\n  signatures: [String],\n): Bool {\n\n  let keyList = Crypto.KeyList()\n  \n  var i = 0\n  for rawPublicKey in rawPublicKeys {\n    keyList.add(\n      PublicKey(\n        publicKey: rawPublicKey.decodeHex(),\n        signatureAlgorithm: signAlgos[i] == 2 ? SignatureAlgorithm.ECDSA_P256 : SignatureAlgorithm.ECDSA_secp256k1 \n      ),\n      hashAlgorithm: HashAlgorithm.SHA3_256,\n      weight: weights[i],\n    )\n    i = i + 1\n  }\n\n  let signatureSet: [Crypto.KeyListSignature] = []\n\n  var j = 0\n  for signature in signatures {\n    signatureSet.append(\n      Crypto.KeyListSignature(\n        keyIndex: j,\n        signature: signature.decodeHex()\n      )\n    )\n    j = j + 1\n  }\n    \n  let signedData = message.decodeHex()\n  \n  return keyList.verify(\n    signatureSet: signatureSet,\n    signedData: signedData\n  )\n}\n",args:(t,o)=>[t(e,o.String),t(s,o.Array([o.String])),t(n,o.Array(o.UFix64)),t(a,o.Array([o.UInt])),t(r,o.Array([o.String]))]})}const je=()=>({authenticate:Te,unauthenticate:_e,authorization:Ve,signUserMessage:Me,verifyUserSignatures:Ue,subscribe:xe,snapshot:ze}),He=async e=>n([a(e)]).then(r),Ye=e=>e.status>=4,$e=e=>e.status>=3,Be=e=>e.status>=2,Je={[m]:async e=>{const t=await He(e.self());Ye(t)||setTimeout(()=>e.sendSelf("POLL"),2500),e.merge(t)},[f]:(e,t)=>{e.subscribe(t.from),e.send(t.from,w,e.all())},[E]:(e,t)=>{e.unsubscribe(t.from)},[C]:async(e,t)=>{t.reply(e.all())},POLL:async e=>{const t=await He(e.self());var n,a;Ye(t)||setTimeout(()=>e.sendSelf("POLL"),2500),n=e.all(),a=t,JSON.stringify(n)!==JSON.stringify(a)&&e.broadcast(w,t),e.merge(t)}},Ke=e=>{if("object"==typeof e&&(e=e.transactionId),null==e)throw new Error("transactionId required");return e},Ge=e=>p(Je,Ke(e));function qe(e){function t(t){return h(Ke(e),Ge,t)}function n(e){return function(n={}){const a=n.suppress||!1;return new Promise((n,r)=>{const s=t(t=>{t.statusCode&&!a?(r(t.errorMessage),s()):e(t)&&(n(t),s())})})}}return{snapshot:function(){return g(e,Ge)},subscribe:t,onceFinalized:n(Be),onceExecuted:n($e),onceSealed:n(Ye)}}async function Ze(t={}){try{await async function(e){l(O(e),"mutate(opts) -- opts is required"),l(F(e),"mutate(opts) -- opts must be an object"),l(O(e.cadence),"mutate({ cadence }) -- cadence is required"),l(N(e.cadence),"mutate({ cadence }) -- cadence must be a string")}(t);const n=await e.config().get("fcl.authz",je().authorization);return e.send([e.transaction(t.cadence),e.args(T(t.args||[])),t.limit&&k(t.limit)&&e.limit(t.limit),e.proposer(t.proposer||t.authz||n),e.payer(t.payer||t.authz||n),e.authorizations(t.authorizations||[t.authz||n])]).then(e.decode)}catch(e){throw e}}qe.isUnknown=e=>e.status>=0,qe.isPending=e=>e.status>=1,qe.isFinalized=Be,qe.isExecuted=$e,qe.isSealed=Ye,qe.isExpired=e=>5===e.status;const Xe=async(e=[],n={})=>{const a=await t.first(["sdk.resolve"],n.resolve||s);return Array.isArray(e)&&(e=await o(i(),e)),JSON.stringify(c(await a(e)),null,2)},Qe=async e=>setTimeout(()=>e.sendSelf("TICK"),await t().get("fcl.eventPollRate",1e4)),et={TICK:async e=>{if(!e.hasSubs())return;let t=e.get("hwm");if(null==t)e.put("hwm",await d()),e.put("tick",await Qe(e));else{let a=await d();e.put("hwm",a);const s=await n([getEvents(e.self(),t.height,a.height-1)]).then(r);for(let t of s)e.broadcast("UPDATED",t.data);e.put("tick",await Qe(e))}},[f]:async(e,t)=>{e.hasSubs()||e.put("tick",await Qe(e)),e.subscribe(t.from)},[E]:(e,t)=>{e.unsubscribe(t.from),e.hasSubs()||(clearTimeout(e.get("tick")),e.delete("tick"),e.delete("hwm"))}},tt=e=>p(et,e);function nt(e){return{subscribe:t=>h(e,tt,t)}}var at={__proto__:null,sendMsgToFCL:(e,t={})=>{window.location!==window.parent.location?window.parent.postMessage(V({},t,{type:e}),"*"):window.opener.postMessage(V({},t,{type:e}),"*")},onMessageFromFCL:(e,t=(()=>{}))=>{const n=n=>{const{data:a}=n;"object"==typeof a&&null!=typeof a&&a.type!==e&&t((e=>{var t;return e.deprecated&&console.warn("DEPRECATION NOTICE",e.deprecated.message),null==e||null==(t=e.body)||delete t.interaction,e})(a))};return window.addEventListener("message",n),()=>window.removeEventListener("message",n)}};const rt=()=>je().authenticate(),st=()=>je().unauthenticate(),ot=()=>(je().unauthenticate(),je().authenticate()),it=()=>je().authenticate(),ct=()=>je().authenticate(),dt=je().authorization,lt=u;export{A as VERSION,at as WalletUtils,rt as authenticate,dt as authz,je as currentUser,nt as events,ct as logIn,Ze as mutate,_ as query,ot as reauthenticate,Xe as serialize,it as signUp,lt as t,qe as tx,st as unauthenticate};
//# sourceMappingURL=fcl.modern.js.map