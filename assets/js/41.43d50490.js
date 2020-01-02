(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{223:function(t,s,e){"use strict";e.r(s);var n=e(0),a=Object(n.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"envoy综合示例-frontproxy"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#envoy综合示例-frontproxy"}},[t._v("#")]),t._v(" Envoy综合示例_FrontProxy")]),t._v(" "),e("p",[t._v("本章节将先使用官方"),e("code",[t._v("Sandbox")]),t._v("的例子，给大家讲解"),e("code",[t._v("Envoy")]),t._v("作为前端代理时的工作逻辑，\n然后我会新增一个"),e("code",[t._v("TLS")]),t._v("的配置讲解，去增强"),e("code",[t._v("FrontProxy")]),t._v("的代理模式")]),t._v(" "),e("ul",[e("li",[t._v("Http_Envoy_FrontProxy")]),t._v(" "),e("li",[t._v("Https_Envoy_FrontProxy")])]),t._v(" "),e("h2",{attrs:{id:"_1-http-envoy-frontproxy"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-http-envoy-frontproxy"}},[t._v("#")]),t._v(" 1.Http_Envoy_FrontProxy")]),t._v(" "),e("p",[t._v("下面是使用"),e("code",[t._v("docker compose")]),t._v("部署的架构图：\n"),e("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/envoy_frontproxy.png",alt:"Http-Envoy-FrontProxy"}})]),t._v(" "),e("p",[t._v("所有传入的请求都通过前端"),e("code",[t._v("envoy")]),t._v("进行路由，该"),e("code",[t._v("envoy")]),t._v("充当位于"),e("code",[t._v("envoymesh")]),t._v("网络边缘的反向代理。通过"),e("code",[t._v("docker compose")]),t._v("将端口"),e("code",[t._v("80")]),t._v("映射到"),e("code",[t._v("8000")]),t._v("端口。\n此外，请注意，由前端"),e("code",[t._v("envoy")]),t._v("由到服务容器的所有流量实际上路由到服务"),e("code",[t._v("envoy")]),t._v("。反过来，服务"),e("code",[t._v("envoy")]),t._v("通过回环地址将请求路由到"),e("code",[t._v("flask")]),t._v("应用程序。\n此设置说明了运行服务"),e("code",[t._v("envoy")]),t._v("与您的服务搭配的优势：所有请求都由服务"),e("code",[t._v("envoy")]),t._v("处理，并有效地路由到您的服务。")]),t._v(" "),e("ol",[e("li",[t._v("将本章节"),e("code",[t._v("http/")]),t._v("目录下的文件"),e("code",[t._v("clone")]),t._v("到本地，并使用"),e("code",[t._v("docker-composer up")]),t._v("启动。 你也可以在"),e("a",{attrs:{href:"https://github.com/envoyproxy/envoy/tree/master/examples/front-proxy",target:"_blank",rel:"noopener noreferrer"}},[t._v("front-proxy"),e("OutboundLink")],1),t._v("找到相关配置文件")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("docker-compose up\n    \n$ docker-compose "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v("\n        Name                       Command               State      Ports\n-------------------------------------------------------------------------------------------------------------\nexample_service1_1      /bin/sh -c /usr/local/bin/ "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(". Up       "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp\nexample_service2_1      /bin/sh -c /usr/local/bin/ "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(". Up       "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp\nexample_front-envoy_1   /bin/sh -c /usr/local/bin/ "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(". Up       "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.0")]),t._v(".0.0:8000-"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp, "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.0")]),t._v(".0.0:8001-"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("8001")]),t._v("/tcp\n    \n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("您现在可以通过前端"),e("code",[t._v("envoy")]),t._v("向两项服务发送请求。")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#向service1：")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -v "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("docker-machine "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ip")]),t._v(" default"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v(":8000/service/1\n*   Trying "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n* Connected to "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" port "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("8000")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#0)")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" GET /service/1 HTTP/1.1\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" Host: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100:8000\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" User-Agent: curl/7.43.0\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" Accept: */*\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" HTTP/1.1 "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v(" OK\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" content-type: text/html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("charset")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("utf-8\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" content-length: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("89")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" x-envoy-upstream-service-time: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" server: envoy\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" date: Fri, "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("26")]),t._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2016")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("19")]),t._v(":39:19 GMT\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" x-envoy-protocol-version: HTTP/1.1\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("\nHello from behind Envoy "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("service "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" hostname: f26027f1ce28 resolvedhostname: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("172.19")]),t._v(".0.6\n* Connection "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#0 to host 192.168.99.100 left intact")]),t._v("\n    \n    \n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#向 service2：")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -v "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("docker-machine "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ip")]),t._v(" default"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v(":8000/service/2\n*   Trying "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n* Connected to "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" port "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("8000")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#0)")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" GET /service/2 HTTP/1.1\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" Host: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.168")]),t._v(".99.100:8000\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" User-Agent: curl/7.43.0\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" Accept: */*\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" HTTP/1.1 "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v(" OK\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" content-type: text/html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("charset")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("utf-8\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" content-length: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("89")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" x-envoy-upstream-service-time: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" server: envoy\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" date: Fri, "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("26")]),t._v(" Aug "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2016")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("19")]),t._v(":39:23 GMT\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" x-envoy-protocol-version: HTTP/1.1\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("\nHello from behind Envoy "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("service "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" hostname: 92f4a3737bbc resolvedhostname: "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("172.19")]),t._v(".0.2\n* Connection "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#0 to host 192.168.99.100 left intact")]),t._v("\n\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("你也可以使用"),e("code",[t._v("docker-compose scale service1=3")]),t._v("命令，扩展"),e("code",[t._v("service1")]),t._v("节点数量，以便测试"),e("code",[t._v("Envoy")]),t._v("的负载均衡能力，本章节不再演示，你可以参考"),e("a",{attrs:{href:"https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/front_proxy",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档-Step 4"),e("OutboundLink")],1),t._v("，也可以参考"),e("a",{attrs:{href:"https://www.servicemesher.com/envoy/start/sandboxes/front_proxy.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("中文文档的步骤四"),e("OutboundLink")],1),t._v("。")])]),t._v(" "),e("h2",{attrs:{id:"_2-https-envoy-frontproxy"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-https-envoy-frontproxy"}},[t._v("#")]),t._v(" 2.Https_Envoy_FrontProxy")]),t._v(" "),e("p",[e("code",[t._v("Envoy")]),t._v("的"),e("code",[t._v("listener")]),t._v("支持面向下游客户端一侧的"),e("code",[t._v("TLS")]),t._v("会话，并可选地支持验正客户端证书;"),e("code",[t._v("listener")]),t._v("中用到的数字证书可于配置中静态提供，也可借助于"),e("code",[t._v("SDS")]),t._v("动态获取 ；\n下面我将给你展示"),e("code",[t._v("https")]),t._v("的核心配置:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("listeners:\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n    filter_chains:\n    - filters:\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n        tls_context:\n        common_tls_context: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("                          "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 常规证书的相关设置；")]),t._v("\n            tls_params: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("                              "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# TLS协议版本，加密套件等；")]),t._v("\n            tls_certificates: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 用到的证书和私钥文件等；")]),t._v("\n            - certificate_chain: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("                     "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# TL证书链；")]),t._v("\n                filename:                               "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 证书文件路径；")]),t._v("\n              private_key: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("                           "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 私钥；")]),t._v("\n                filename:                               "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 私钥文件路径；")]),t._v("\n              password: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("                              "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 私钥口令；")]),t._v("\n                filename:                               "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 口令文件路径；")]),t._v("\n            tls_certifcate_sds_secret_configs: "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                 "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 要基于SDS API获取TLS会话的相关信息时的配置；")]),t._v("\n        require_client_certificate: "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v("                             "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 是否验正客户端证书；")]),t._v("\n")])])]),e("p",[t._v("然后，我们来看一下一段实际配置，下面演示将前面的"),e("code",[t._v("Ingress")]),t._v("示例中的"),e("code",[t._v("Envoy")]),t._v("配置为通过"),e("code",[t._v("TLS")]),t._v("提供服务 ，并将所有基于"),e("code",[t._v("http")]),t._v("协议的请求重定向至"),e("code",[t._v("https")]),t._v("：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/istio/envoy_frontproxy_https.png",alt:"Http-Envoy-FrontProxy"}})]),t._v(" "),e("p",[t._v("最后你也可以尝试将我们上面部署的"),e("code",[t._v("docker")]),t._v("容器进行"),e("code",[t._v("https")]),t._v("的修改，这里就不再赘述了。")])])}),[],!1,null,null,null);s.default=a.exports}}]);