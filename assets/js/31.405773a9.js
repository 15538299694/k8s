(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{210:function(s,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"使用kubeadm部署k8s集群"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用kubeadm部署k8s集群"}},[s._v("#")]),s._v(" 使用Kubeadm部署k8s集群")]),s._v(" "),a("p",[a("code",[s._v("kubeadm")]),s._v("是一个提供了"),a("code",[s._v("kubeadm init")]),s._v("和"),a("code",[s._v("kubeadm join")]),s._v("最佳实践命令，且用于快速构建一个"),a("code",[s._v("kubernetes")]),s._v("集群的工具，你可以使用此工具快速构建一个"),a("code",[s._v("kubernetes")]),s._v("学习环境。\n通过本章节的学习，你将能够使用"),a("code",[s._v("kubeadm")]),s._v("工具，成功构建出一个基础的"),a("code",[s._v("kubernetes")]),s._v("集群环境")]),s._v(" "),a("ul",[a("li",[s._v("环境准备")]),s._v(" "),a("li",[s._v("Hosts文件准备")]),s._v(" "),a("li",[s._v("Docker环境配置")]),s._v(" "),a("li",[s._v("其他准备工作")]),s._v(" "),a("li",[s._v("使用Kubeadm部署k8s集群")]),s._v(" "),a("li",[s._v("参考文档")])]),s._v(" "),a("h2",{attrs:{id:"_1-环境准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-环境准备"}},[s._v("#")]),s._v(" 1.环境准备")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("ip")]),s._v(" "),a("th",[s._v("主机名")]),s._v(" "),a("th",[s._v("角色")]),s._v(" "),a("th",[s._v("操作系统")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("192.168.0.104")]),s._v(" "),a("td",[s._v("centos-1.shared master")]),s._v(" "),a("td",[s._v("Master")]),s._v(" "),a("td",[s._v("Centos6.4")])]),s._v(" "),a("tr",[a("td",[s._v("192.168.0.108")]),s._v(" "),a("td",[s._v("centos-2.shared node01")]),s._v(" "),a("td",[s._v("Node")]),s._v(" "),a("td",[s._v("Centos6.4")])]),s._v(" "),a("tr",[a("td",[s._v("192.168.0.109")]),s._v(" "),a("td",[s._v("centos-3.shared node01")]),s._v(" "),a("td",[s._v("Node")]),s._v(" "),a("td",[s._v("Centos6.4")])])])]),s._v(" "),a("h2",{attrs:{id:"_2-hosts文件准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-hosts文件准备"}},[s._v("#")]),s._v(" 2.Hosts文件准备")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.104 centos-1.shared master\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.108 centos-2.shared node01\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.109 centos-3.shared node02\n")])])]),a("h2",{attrs:{id:"_3-docker环境配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-docker环境配置"}},[s._v("#")]),s._v(" 3.Docker环境配置")]),s._v(" "),a("ol",[a("li",[s._v("关闭系统默认防火墙和"),a("code",[s._v("SELINUX")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("setenforce "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i -r "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/^SELINUX=/c SELINUX=disabled"')]),s._v(" /etc/selinux/config\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" systemctl stop firewalld\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" systemctl disable firewalld\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" systemctl stop iptables "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" iptables stop\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" systemctl disable iptables "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v(" iptables off\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("卸载旧版本"),a("code",[s._v("Docker")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("yum remove docker "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-client "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-client-latest "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-common "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-latest "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-latest-logrotate "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-logrotate "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-selinux "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-engine-selinux "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-engine "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-ce "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n            docker-ee\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("安装"),a("code",[s._v("DockerCE")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1.安装所需的包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# yum-utils 提供了 yum-config-manager 实用程")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 并且 devicemapper 存储驱动需要 device-mapper-persistent-data 和 lvm2")]),s._v("\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y yum-utils device-mapper-persistent-data lvm2\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2.更新xfsprogs")]),s._v("\nyum update xfsprogs\n    \n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 3.使用以下命令设置源")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#官方源")]),s._v("\nyum-config-manager "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n--add-repo "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\nhttps://download.docker.com/linux/centos/docker-ce.repo\n     \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#阿里源（建议使用）")]),s._v("\nyum-config-manager "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n--add-repo "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\nhttps://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n \n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 4.安装Docker CE")]),s._v("\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y docker-ce    \n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 4.或者安装指定版本")]),s._v("\nyum list docker-ce --showduplicates "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sort")]),s._v(" -r\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y docker-ce-17.12.1.ce-1.el7.centos\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("启动"),a("code",[s._v("Docker")]),s._v("并设置开机运行")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("systemctl start docker\nsystemctl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" docker\nsystemctl status docker\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("常见问题")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("WARINING提示：\nWARNING: bridge-nf-call-iptables is disabled\nWARNING: bridge-nf-call-ip6tables is disabled\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#解决方案   ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v("EOF "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  /etc/sysctl.d/k8s.conf\nnet.bridge.bridge-nf-call-ip6tables "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nnet.bridge.bridge-nf-call-iptables "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nEOF\n \nsysctl --system\n")])])]),a("h2",{attrs:{id:"_4-其他准备工作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-其他准备工作"}},[s._v("#")]),s._v(" 4.其他准备工作")]),s._v(" "),a("ol",[a("li",[s._v("关闭防火墙")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("systemctl stop firewalld.service\nsystemctl stop iptables.service\nsystemctl disable firewalld.service\nsystemctl disable iptables.service\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("禁用"),a("code",[s._v("SELINUX")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#临时关闭：")]),s._v("\nsetenforce "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("            \n   \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久关闭：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/selinux/config\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SELINUX")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("disabled\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("禁用"),a("code",[s._v("swap")]),s._v("设备（影响性能，"),a("code",[s._v("k8s")]),s._v("集群初始化会报错）")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#临时禁用")]),s._v("\nswapoff  -a\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久禁用")]),s._v("\nVim  /etc/fstab \n注释 /dev/mapper/VolGroup-lv_swap swap 所在的行\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("启用"),a("code",[s._v("ipvs")]),s._v("内核模块 创建内核模块载入相关的脚本文件"),a("code",[s._v("/etc/sysconfig/modules/ipvs.modules")]),s._v("，设定自动载入的内核模块。文件内容如下(用到再配置也可以)")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ipvs_mods_dir")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/usr/lib/modules/'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("uname")]),s._v(" -r"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('/kernel/net/netfilter/ipvs"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("i")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" $ipvs_mods_dir "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" -o "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^[^.]*"')]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n    /sbin/modinfo -F filename "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&>")]),s._v(" /dev/null\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$?")]),s._v(" -eq "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n        /sbin/modprobe "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 赋权、运行并检查    ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x /etc/sysconfig/modules/ipvs.modules\n/etc/sysconfig/modules/ipvs.modules\nlsmod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" ip_vs\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[a("code",[s._v("docker")]),s._v("文件配置（docker unit file： "),a("code",[s._v("/usr/lib/systemd/system/docker.service")]),s._v("）")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecStart")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/bin/dockerd -H fd:// --containerd"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/run/containerd/containerd.sock\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecStartPost")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/sbin/iptables -P FPRWARD ACCEPT\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecReload")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/bin/kill -s HUP "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$MAINPID")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("TimeoutSe")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("RestartSec")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Restart")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always\n    \nsystemctl daemon-reload\nsystemctl restart docker\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#变量查看")]),s._v("\ndocker info\n")])])]),a("h2",{attrs:{id:"_5-使用kubeadm部署k8s集群"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-使用kubeadm部署k8s集群"}},[s._v("#")]),s._v(" 5.使用Kubeadm部署k8s集群")]),s._v(" "),a("ol",[a("li",[s._v("首先安装"),a("code",[s._v("k8s")]),s._v("相关软件包。\n"),a("a",{attrs:{href:"https://mirrors.aliyun.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("阿里云镜像仓库"),a("OutboundLink")],1),s._v("配置如下所示：")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /etc/yum.repos.d/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" k8s.repo\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("kubernetes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Kubernetes Repository\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("baseurl")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("gpgcheck")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("gpgkey")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg\n      https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("仓库载入情况检查")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("yum repolist\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 yum.repos.d"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# yum list all |grep "^kube"')]),s._v("\nkubeadm.x86_64                              "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.16")]),s._v(".3-0                   kubernetes\nkubectl.x86_64                              "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.16")]),s._v(".3-0                   kubernetes\nkubelet.x86_64                              "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.16")]),s._v(".3-0                   kubernetes\nkubernetes.x86_64                           "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.5")]),s._v(".2-0.7.git269f928.el7   extras   \nkubernetes-client.x86_64                    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.5")]),s._v(".2-0.7.git269f928.el7   extras   \nkubernetes-cni.x86_64                       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.7")]),s._v(".5-0                    kubernetes\nkubernetes-master.x86_64                    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.5")]),s._v(".2-0.7.git269f928.el7   extras   \nkubernetes-node.x86_64                      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.5")]),s._v(".2-0.7.git269f928.el7   extras \n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("使用"),a("code",[s._v("yum")]),s._v("安装"),a("code",[s._v("kubeadm")]),s._v(" 、"),a("code",[s._v("kubectl")]),s._v("和"),a("code",[s._v("kubelet")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" kubeadm  kubectl kubelet\n\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("检查相关软件包是否完整")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@centos-1 yum.repos.d"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# rpm -ql kubelet")]),s._v("\n/etc/kubernetes/manifests\n/etc/sysconfig/kubelet\n/usr/bin/kubelet\n/usr/lib/systemd/system/kubelet.service\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("配置"),a("code",[s._v("kubelet")]),s._v(","),a("code",[s._v("swap")]),s._v("处于启用状态时，不要报错(如果上面配置了关闭"),a("code",[s._v("swap")]),s._v("，可省略)")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("     "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/sysconfig/kubelet\n     "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("KUBELET_EXTRA_ARG")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v('"--fail-swap-on'),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("false”\n\n")])])]),a("ol",{attrs:{start:"6"}},[a("li",[s._v("初始化集群("),a("code",[s._v("Master")]),s._v("节点)")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#集群镜像获取")]),s._v("\nhttps://www.jianshu.com/p/8bc61078bded\n    \nkubeadm config print init-defaults --kubeconfig ClusterConfiguration "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" kubeadm.yml\nkubeadm config images pull\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#方式一:命令行(--dry-run：试运行，不会有改动)")]),s._v("\nkubeadm init --kubernetes-version"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("v1.16.0 --pod-network-cidr"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"10.244.0.0/16"')]),s._v("  --dry-run\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#方式二：Yml配置文件，使用—config string")]),s._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#集群初始化完毕后，创建用户（最好用普通账号创建）：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v("/.kube\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#切换至Root用户操作：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" -i /etc/kubernetes/admin.conf "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v("/.kube/config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("主配置文件，至关重要，不能泄露"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("id")]),s._v(" -u"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("id")]),s._v(" -g"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v("/.kube/config\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#集成flannel插件，并观察")]),s._v("\nkubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#Pod情况查看：")]),s._v("\nkubectl get pods -n kube-system\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#集群初始化完毕")]),s._v("\nkubectl get nodes\n")])])]),a("ol",{attrs:{start:"7"}},[a("li",[s._v("Node节点")])]),s._v(" "),a("ul",[a("li",[s._v("从主节点复制"),a("code",[s._v("repo")]),s._v("配置到对应"),a("code",[s._v("node")]),s._v("节点上：")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" k8s.repo node01:/etc/yum.repos.d/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" /etc/sysconfig/kubelet  node01:/etc/sysconfig\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" k8s.repo node02:/etc/yum.repos.d/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" /etc/sysconfig/kubelet  node02:/etc/sysconfig\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v("  /run/flannel/subnet.env node01: /run/flannel/subnet.env\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v("  /run/flannel/subnet.env node02: /run/flannel/subnet.env\n")])])]),a("ol",{attrs:{start:"8"}},[a("li",[s._v("在主节点打包"),a("code",[s._v("node")]),s._v("所需镜像，并"),a("code",[s._v("scp")]),s._v("到各"),a("code",[s._v("node")]),s._v("节点")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("docker save -o k8s-node.tar k8s.gcr.io/coredns quay.io/coreos/flannel k8s.gcr.io/pause\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" k8s-node.tar node01:/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" k8s-node.tar node02:/\n")])])]),a("ol",{attrs:{start:"9"}},[a("li",[a("code",[s._v("Node")]),s._v("节点：")])]),s._v(" "),a("ul",[a("li",[s._v("加载镜像( "),a("code",[s._v("coredns")]),s._v("、 "),a("code",[s._v("flannel")]),s._v("、 "),a("code",[s._v("pause")]),s._v(")："),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" / "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" docker load —input k8s-node.tar\n yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" kubelet kubeadm    \n")])])])]),s._v(" "),a("li",[s._v("添加集群。注意这个token是第六步初始化集群给你的，用于"),a("code",[s._v("node")]),s._v("节点加入节点时候用的。"),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubeadm "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.104:6443 --token z9kmma.p8ak2ffytr7gjnsv "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n--discovery-token-ca-cert-hash sha256:82ee3a673e99fa8f46a8f515fa430819b595d532f3fcb21d9c3114f3394b4b0d \n")])])])])]),s._v(" "),a("ol",{attrs:{start:"10"}},[a("li",[s._v("部署完毕，并检查集群状态（"),a("code",[s._v("Master")]),s._v("），此时一个基础的kubernetes集群已经构建完成了。")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("kubectl get nodes\nNAME              STATUS   ROLES    AGE   VERSION    \ncentos-1.shared   Ready    master   41m   v1.16.3\ncentos-2.shared   Ready    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("   19m   v1.16.3\ncentos-3.shared   Ready    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("none"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("   18m   v1.16.3\n")])])]),a("h2",{attrs:{id:"_6-参考文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-参考文档"}},[s._v("#")]),s._v(" 6.参考文档")]),s._v(" "),a("p",[s._v("官方文档：https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/")])])}),[],!1,null,null,null);t.default=n.exports}}]);