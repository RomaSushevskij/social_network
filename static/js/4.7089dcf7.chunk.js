(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{155:function(e,s,t){e.exports={usersWrapper:"Users_usersWrapper__2NpI5",usersBlock:"Users_usersBlock__wcdhv",paginatorBlock:"Users_paginatorBlock__24N13"}},156:function(e,s,t){e.exports={userWrapper:"User_userWrapper__HCUEE",avatar:"User_avatar__3jo1S",followed:"User_followed__suzg7",fullName:"User_fullName__dcBJC"}},157:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a="user-minus",r=[],o="f503",n="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM616 200h-144C458.8 200 448 210.8 448 224s10.75 24 24 24h144C629.3 248 640 237.3 640 224S629.3 200 616 200z";s.definition={prefix:"fas",iconName:a,icon:[640,512,r,o,n]},s.faUserMinus=s.definition,s.prefix="fas",s.iconName=a,s.width=640,s.height=512,s.ligatures=r,s.unicode=o,s.svgPathData=n,s.aliases=r},158:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a="user-plus",r=[],o="f234",n="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z";s.definition={prefix:"fas",iconName:a,icon:[640,512,r,o,n]},s.faUserPlus=s.definition,s.prefix="fas",s.iconName=a,s.width=640,s.height=512,s.ligatures=r,s.unicode=o,s.svgPathData=n,s.aliases=r},164:function(e,s,t){"use strict";t.r(s);var a=t(2),r=t(43),o=t(52),n=t(45),i=t(44),c=t(4),l=t(1),u=t.n(l),p=t(155),g=t.n(p),h=t(156),d=t.n(h),f=t(13),j=t(18),b=t(10),O=t(157),C=t(158),m=t(0),v=u.a.memo((function(e){var s=e.followingInProcessUsersId.includes(e.id);return Object(m.jsxs)("div",{className:d.a.userWrapper,children:[Object(m.jsxs)("div",{className:d.a.avatar,children:[Object(m.jsx)(f.b,{to:"/profile/".concat(e.id),children:Object(m.jsx)(j.a,{style:{width:"90px",height:"90px"},photo:e.photos.small})}),Object(m.jsx)("div",{className:d.a.followed,children:e.followed?Object(m.jsx)("button",{disabled:s,onClick:function(){return e.stopBeingFollower(e.id)},children:Object(m.jsx)(b.a,{icon:O.faUserMinus})}):Object(m.jsx)("button",{disabled:s,onClick:function(){return e.becomeFollower(e.id)},children:Object(m.jsx)(b.a,{icon:C.faUserPlus})})})]}),Object(m.jsx)("p",{className:d.a.fullName,children:e.name})]})})),P=t(94),w=t(22),_=u.a.memo((function(e){var s=e.users,t=e.becomeFollower,r=e.stopBeingFollower,o=e.usersTotalCount,n=e.currentPage,i=e.onChangePage,c=e.isFetching,l=e.followingInProcessUsersId,u=e.toggleFollowingInProcess,p=e.setPageSize,h=e.pageSize,d=s.map((function(e){return Object(m.jsx)(v,Object(a.a)(Object(a.a)({},e),{},{becomeFollower:t,stopBeingFollower:r,followingInProcessUsersId:l,toggleFollowingInProcess:u}),e.id)}));return Object(m.jsxs)("div",{className:g.a.usersWrapper,children:[c?Object(m.jsx)(w.a,{size:"30px",color:"#5B48E3"}):Object(m.jsx)("div",{className:g.a.usersBlock,children:d}),Object(m.jsx)("div",{className:g.a.paginatorBlock,children:Object(m.jsx)(P.a,{portionSize:5,currentPage:n,pageSize:h,totalItemsCount:o,onChangePage:i,onChangePageSize:p})})]})})),x=t(16),z=t(69),S=function(e){Object(n.a)(t,e);var s=Object(i.a)(t);function t(){var e;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),n=0;n<a;n++)o[n]=arguments[n];return(e=s.call.apply(s,[this].concat(o))).state={pageSize:20},e.onChangePage=function(s){var t=e.props,a=t.pageSize;(0,t.repeatGetUsers)(a,s)},e.onChangePageSize=function(s){var t=e.props.repeatGetUsers;e.setState({pageSize:Number(s)}),t(Number(s),e.props.currentPage)},e}return Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,s=e.currentPage;(0,e.getUsers)(this.state.pageSize,s)}},{key:"render",value:function(){return Object(m.jsx)(_,Object(a.a)(Object(a.a)({},this.props),{},{onChangePage:this.onChangePage,setPageSize:this.onChangePageSize,pageSize:this.state.pageSize}))}}]),t}(u.a.PureComponent),U=Object(c.b)((function(e){return{users:Object(z.e)(e),usersTotalCount:Object(z.f)(e),pageSize:Object(z.d)(e),currentPage:Object(z.a)(e),isFetching:Object(z.c)(e),followingInProcessUsersId:Object(z.b)(e)}}),{becomeFollower:x.a,stopBeingFollower:x.e,toggleFollowingInProcess:x.f,getUsers:x.b,repeatGetUsers:x.c})(S);s.default=U}}]);
//# sourceMappingURL=4.7089dcf7.chunk.js.map