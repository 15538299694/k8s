# Ingress资源
- What is Ingress?
- What is IngressControllers?
- Ingress Controllers对比
- Ingress代理逻辑
- Ingress-Nginx部署和测试
- tomcat部署实战
- 参考文档
## 1.What is Ingress?
`ingress`是一个管理`kubernetes`集群南北流量（集群外部->集群内部）的`api` 对象，典型的有HTTP。
并且可以提供：`LB`的能力。
注意：
> `ingress`仅是一段配置，你可以理解为SLB的配置信息片段。实例化`SLB`能力的话，你还需要一个`ingresscontrollers`。

## 2.What is IngressControllers?

```text
iptables和ipvs：4层
ingress：7层 
    
Ingress Controller：
    将ingress配置信息转换为自身配置的应用程序
        
Ingress：
    只定义流量转发和调度的通用格式的配置信息

```
`IngressControllers`是一种能读懂`ingress`配置，并将其翻译成自己配置文件的应用程序。比较常见的有`ingress-nginx`，具体的技术栈可参考我下面的配图。

## 3.Ingress Controllers对比

![ingress技术栈](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/ingresscontrollers.png)
这里罗列的是比较全面的横向对比了，如果你只是为了学习，建议直接使用`ingress-nginx`，如果你是有经验的技术人员，按需使用就行。

## 4.Ingress代理逻辑

![ingress架构图](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/ingress-controller-nodeport.png)
这张图我画的是基于`ingress-nginx`的技术栈，并通过`nodeport`类型的`service`，将`ingress`服务暴露到集群外，供客户端的访问。
你需要记住的是：
> 1.ingress controllers是实际的应用程序；

> 2.ingress只是转发的配置信息，通过ingress controllers实例化，并且通过`lua`语言，在`ingress-nginx`的pod中，实例化成一个基础的`nginx`配置文件而已，和传统的nginx并无太大的差异。

## 5.Ingress-Nginx部署和测试

1) 下载`ingress-nginx`的配置清单，修改`images`地址为阿里云（会被墙）：`registry.aliyuncs.com/google_containers/nginx-ingress-controller:0.26.1`
```bash
 wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

2) 使用`apply -f mandatory.yaml`启动配置清单，并查看`Pod`是否运行成功
```bash
[root@centos-1 chapter6]# kubectl get pods -n ingress-nginx
NAME                                       READY   STATUS    RESTARTS   AGE
nginx-ingress-controller-dc55d4998-zxnrd   1/1     Running   0          20m
```

3) 编辑`nginx-ingress-service.yaml`配置文件，如下
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
spec:
  type: NodePort
  ports:
    - port: 80     #Service端口
      name: http
      nodePort: 30080    #本机端口
    - port: 443
      name: https
      nodePort: 30443
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
```

4) `apply`配置文件，并观察。你可以对比我上面的图，此时基于`nodeport`类型的`nginx-ingress-controller`的`service`已经部署成功。
```bash
[root@centos-1 chapter6]# kubectl get svc -n ingress-nginx
NAME                       TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
nginx-ingress-controller   NodePort   10.108.188.111   <none>        80:30080/TCP,443:30443/TCP   12m
```

5) 此时，你可以通过访问任意一台虚拟机的`30080`端口，便能够访问到`Nginx404`页面

6) 接下来，我们编辑`myapp-svc.yaml`和`myapp-ingress.yaml`，并通过`apply -f`创建。
我们期望将`Deployment`暴露到集群外，供客户端进行访问。
>提示：当你使用多个ingress-controllers的时候，可以通过`kubernetes.io/ingress.class: "nginx" `来申明使用哪一个。          
```yaml
#myapp-svc.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myns
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
      rel: beta
  template:
    metadata:
      namespace: myns
      labels:
        app: myapp
        rel: beta
    spec:
      containers:
      - name: myapp
        image: ikubernetes/myapp:v1

---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: myns
spec:
  selector:
    app: myapp
    rel: beta
  ports:
  - name: http
    port: 80
    targetPort: 80
```

```yaml
#myapp-ingress.yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: myapp
  namespace: myns
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"            #当有多种ingress-controller的时候，用这个参数区分使用哪个controller
spec:
  rules:
  - host: foo.bar.com
    http:
      paths:
      - path: /
        backend:
          serviceName: myapp
          servicePort: 80

```

7) 修改`本机`hosts`并访问`foo.bar.com:30080`,可以成功
```text
192.168.0.104 foo.bar.com
```

## 6.tomcat部署实战

1) 编辑`tomcat-svc-ingress.yaml`，并`apply -f`。配置文件中的信息，应该可以一目了然。
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: eshop
  
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tomcat
  namespace: eshop
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tomcat
      rel: beta
  template:
    metadata:
      namespace: eshop
      labels:
        app: tomcat
        rel: beta
    spec:
      containers:
      - name: tomcat
        image: tomcat:alpine
  
---
apiVersion: v1
kind: Service
metadata:
  name: tomcat
  namespace: eshop
spec:
  selector:
    app: tomcat
    rel: beta
  ports:
  - name: http
    port: 8080
    targetPort: 8080     #tomcat(Pod)端口
  - name: ajp
    port: 8009
    targetPort: 8009     #tomcat(Pod)端口
  
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: tomcat
  namespace: eshop
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"            #当有多种ingress-controller的时候，用这个参数区分使用哪个controller
spec:
  rules:
  - host: eshop.foo.com
    http:
      paths:
      - path: /
        backend:
          serviceName: tomcat
          servicePort: 8080

```  

2) 观察集群资源生成情况
```bash
[root@centos-1 chapter6]# kubectl get all -n eshop
NAME                          READY   STATUS    RESTARTS   AGE
pod/tomcat-6b6fb9c8f6-jq9w2   1/1     Running   0          4m33s
pod/tomcat-6b6fb9c8f6-qz8z6   1/1     Running   0          4m33s
    
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
service/tomcat   ClusterIP   10.110.148.61   <none>        8080/TCP,8009/TCP   4m33s
    
NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat   2/2     2            2           4m33s
    
NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat-6b6fb9c8f6   2         2         2       4m33s
    
```

3) 观察`ingress`条目生成情况
```bash
[root@centos-1 chapter6]# kubectl get ingress -n eshop
NAME     HOSTS           ADDRESS   PORTS   AGE
tomcat   eshop.foo.com             80      5m23s
    
[root@centos-1 chapter6]#kubectl describe ingress tomcat -n eshop
Name:             tomcat
Namespace:        eshop
Address:          
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host           Path  Backends
  ----           ----  --------
  eshop.foo.com  
                 /   tomcat:8080 (10.244.1.51:8080,10.244.2.34:8080)
```

4) 进入`ingress-nginx`，查看配置文件生成情况。你会发现`lua`脚本已经将相关配置信息，读取了进来。
```bash
kubectl exec -it pod/nginx-ingress-controller-dc55d4998 -zxnrd -n ingress-nginx -- /bin/sh
    
more /etc/nginx/nginx.conf
	## start server eshop.foo.com
 	server {
 		server_name eshop.foo.com ;
 		
 		listen 80;
	        set $proxy_upstream_name "-";
 		
 		location / {
 			
 			set $namespace      "eshop";
 			set $ingress_name   "tomcat";
 			set $service_name   "tomcat";
 			set $service_port   "8080";
 			set $location_path  "/";
 			
 			rewrite_by_lua_block {
 				
 				balancer.rewrite()
 				
 			}

```

5) 新增Mac本机`Hosts`文件，并测试，至此部署已经完成
```bash
192.168.0.104 eshop.foo.com
    
dingqishideMacBook-Pro:~ dingqishi$ curl -I eshop.foo.com:30080
HTTP/1.1 200 
Server: nginx/1.15.5
Date: Tue, 03 Dec 2019 10:47:23 GMT
Content-Type: text/html;charset=UTF-8
Connection: keep-alive
Vary: Accept-Encoding


```

## 7.参考文档

Ingress-nginx：https://github.com/kubernetes/ingress-nginx

部署文档：https://kubernetes.github.io/ingress-nginx/deploy/

K8S官方例子：https://kubernetes.io/docs/concepts/services-networking/ingress/
