(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{217:function(e,t,s){"use strict";s.r(t);var n=s(0),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"envoy使用入门-1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#envoy使用入门-1"}},[e._v("#")]),e._v(" Envoy使用入门_1")]),e._v(" "),s("p",[e._v("本章节将通过"),s("code",[e._v("docker")]),e._v("容器的方式，启动构建"),s("code",[e._v("envoy")]),e._v("环境；")]),e._v(" "),s("p",[e._v("并通过静态化配置和内置过滤器"),s("code",[e._v("envoy.echo")]),e._v("的方式，让你了解"),s("code",[e._v("Envoy")]),e._v("的初步使用")]),e._v(" "),s("ul",[s("li",[e._v("构建说明")]),e._v(" "),s("li",[e._v("环境构建")]),e._v(" "),s("li",[e._v("参考文档")])]),e._v(" "),s("h2",{attrs:{id:"_1-构建说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-构建说明"}},[e._v("#")]),e._v(" 1.构建说明")]),e._v(" "),s("p",[s("code",[e._v("Envoy")]),e._v("使用"),s("code",[e._v("C++")]),e._v("开发，并以"),s("code",[e._v("Bazel")]),e._v("为构建系统，如果你想尝试直接编译，则需要依赖如下两个环境：")]),e._v(" "),s("ul",[s("li",[e._v("GCC 7+ or Clang/LLVM 7+ (for C++14 support)")]),e._v(" "),s("li",[e._v("These Bazel native dependencies")])]),e._v(" "),s("p",[e._v("另外，"),s("code",[e._v("Enovy")]),e._v("也提供了基于"),s("code",[e._v("docker")]),e._v("镜像的预编译完成的程序，用户也可基于这些基础镜像打包定制镜像， 并以容器的方式运行"),s("code",[e._v("envoy")]),e._v("。（推荐）")]),e._v(" "),s("h2",{attrs:{id:"_2-环境构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-环境构建"}},[e._v("#")]),e._v(" 2.环境构建")]),e._v(" "),s("ol",[s("li",[e._v("于"),s("a",{attrs:{href:"https://hub.docker.com/r/envoyproxy/envoy-alpine",target:"_blank",rel:"noopener noreferrer"}},[e._v("dockerhub"),s("OutboundLink")],1),e._v("搜索最新的"),s("code",[e._v("envoy")]),e._v("镜像，并"),s("code",[e._v("pull")]),e._v("下来")])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker pull envoyproxy/envoy-alpine:v1.11.1\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[s("p",[e._v("创建工作目录"),s("code",[e._v("envoy")]),e._v("，并在目录中创建"),s("code",[e._v("envoy.yaml")]),e._v("配置文件和"),s("code",[e._v("Dockerfile")]),e._v("。")]),e._v(" "),s("p",[e._v("配置文件的语法规范请参考："),s("a",{attrs:{href:"https://www.envoyproxy.io/docs/envoy/latest/api-v2/bootstrap/bootstrap",target:"_blank",rel:"noopener noreferrer"}},[e._v("bootstrap"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("所有内置过滤器请参考："),s("a",{attrs:{href:"https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/network_filters/network_filters#config-network-filters",target:"_blank",rel:"noopener noreferrer"}},[e._v("network_filters"),s("OutboundLink")],1)])])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("mkdir")]),e._v(" envoy \n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" envoy\n    \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#envoy.yaml    ")]),e._v("\nstatic_resources:\n  listeners:\n  - name: listener_0\n    address:\n      socket_address:\n        address: "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("0.0")]),e._v(".0.0\n        port_value: "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("15001")]),e._v("\n    filter_chains:\n      filters:\n      - name: envoy.echo      "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#内置filter,将返回所有接收到的报文信息   ")]),e._v("\n      \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#Dockerfile")]),e._v("\nFROM envoyproxy/envoy-alpine:v1.11.1\nADD envoy.yaml /etc/envoy/      \n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("打镜像并运行")])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("docker build "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(".")]),e._v(" -t envoy-echo:v0.1\ndocker container run --name "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" --rm envoy-echo:v0.1\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[e._v("另开一个中端，并通过命令获取容器运行的"),s("code",[e._v("ip")])])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("root@k8s-etcd-mater01 envoy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# docker exec -it echo /bin/sh")]),e._v("\n/ "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ifconfig ")]),e._v("\neth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02  \n          inet addr:172.17.0.2  Bcast:172.17.255.255  Mask:255.255.0.0\n          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n          RX packets:8 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:3 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:0 \n          RX bytes:648 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("648.0")]),e._v(" B"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("  TX bytes:258 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("258.0")]),e._v(" B"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n\nlo        Link encap:Local Loopback  \n          inet addr:127.0.0.1  Mask:255.0.0.0\n          UP LOOPBACK RUNNING  MTU:65536  Metric:1\n          RX packets:0 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:0 \n          RX bytes:0 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("0.0")]),e._v(" B"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("  TX bytes:0 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("0.0")]),e._v(" B"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[e._v("退出容器，使用"),s("code",[e._v("nc")]),e._v("命令测试"),s("code",[e._v("172.17.0.2 10051")]),e._v("并输入字符串，发现有相同字符返回，测试成功")])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("root@k8s-etcd-mater01 envoy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# nc 172.17.0.2 15001")]),e._v("\nHi Envoy         "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#手动输入")]),e._v("\nHi Envoy         "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#自动返回")]),e._v("\n\n")])])]),s("h2",{attrs:{id:"_3-参考文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-参考文档"}},[e._v("#")]),e._v(" 3.参考文档")]),e._v(" "),s("p",[e._v("api-v2 Reference：")]),e._v(" "),s("p",[e._v("https://www.envoyproxy.io/docs/envoy/latest/api-v2/bootstrap/bootstrap")]),e._v(" "),s("p",[e._v("内置网络过滤器：")]),e._v(" "),s("p",[e._v("https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/network_filters/network_filters")])])}),[],!1,null,null,null);t.default=a.exports}}]);