# Service资源管理

- 为什么需要Service资源?
- Service资源如何管理Pod
- Endpoints

## 1.为什么需要Service资源?

我们之前提到过一个控制器：`deployment`,他会根据`rs`中定义的用户期望数量，去平衡现有状态和用户状态，也有自己的选择器，关联新增的`pod`资源。这两点听上去，貌似也解决了`pod`动态变更的问题，那我们为什么还需要引入`service`呢？
<details>
 <summary>点击收起/打开答案</summary>
 <br/>
其实，`service`的引入最重要的一点，就是给访问者提供一个固定访问入口的抽象层。客户端应该直接向`service`发起请求，而不是`pod`。
</details>

![service](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/service.png)


## 2.Service资源如何管理Pod

* `service`通过标签选择器关联至拥有相关标签的`Pod`对象
* 客户端向`Service`进行请求，而非直接请求`Pod`对象

1) `service`配置字段的查看命令
```bash
kubectl explain svc
```

2) `Service`默认类型为`ClusterIP`，还有`ExternalName`,  `NodePort`，`LoadBalancer`和`Headless`，共5种类型
### 1.ClusterIP

![ClusterIP](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/clusterip.png)
  
客户端`Pod`对象访问服务端`Pod`对象时不会进行源地址转换:
- 二者在同一主机时，源地址为客户端`pod`地址；
- 二者不在同一主机时，源地址为客户端`pod`所在节点的`flannel`或`cni`地址。
> 只能在集群内部被访问 。
### 2.NodePort

![NodePort](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/NodePort.png)

可以被集群外部访问到，节点的请求会`DNAT`到`Serviceip`，然后再调度至`PodIP`
    
### 3.LoadBalancer
    
![LoadBalancer](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/externalclients.png)

需要结合公有云的`LBAAS`（需要付费），支持动态接入功能。

 
### 4.ExternalName

![ExternalName](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/externalname.png)


将集群外部`Service`引入集群内部供各客户端使用，需要设置标签选择器，并手动定义一个endpoint资源，指向外部的资源地址。
 
### 5.Headless
这是一个比较特殊的`service`类型，有时候，你没必要或者不需要负载均衡和一个对外提供服务的`ip`地址。在这种情况下，你可以在`.spec.clusterIp`中定义`None`字段，来申明一个`Headless Service`。他可以通过`coredns`组件内部的解析功能，以完成相关地址解析的支持作用。
    
## 3.Endpoints

`endpoints`为`service`中的网络端点，用于接收`service`发来的请求，并将其转发至相关的上游服务（`deployment`）。
1) 查看命令
```bash
kubectl explain endpoints
    
kubectl get endpoints -A
```
2) 注意：自定义`endpoints`时，需要与`service`同名
```bash
[root@centos-1 chapter5]#  kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   4d23h
ngx-new      ClusterIP   10.96.232.218   <none>        80/TCP    2d5h
    
[root@centos-1 chapter5]# kubectl get endpoints
NAME         ENDPOINTS                     AGE
kubernetes   192.168.0.104:6443            4d23h
ngx-new      10.244.2.8:80,10.244.2.9:80   2d5h
```
    
