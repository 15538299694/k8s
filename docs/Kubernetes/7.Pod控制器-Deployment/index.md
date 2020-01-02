## 1.控制器对象的分类

### 1.守护进程型

1.无状态应用:非系统级应用（Nginx等）

推荐使用：Deployment，ReplicaSet
    
2.无状态应用:系统级应用

应用场景：日志和监控收集客户端：场景就是每个node节点需要且只需要运行1个pod

推荐使用：DaemonSet
    
3.有状态应用

应用场景：mysql、redis集群等

推荐使用：statefulSet
    
### 2.非守护进程型

Job：一次性任务

Cronjob：定时任务

## 2. what is Deployment?

`Deploymen`是一个提供申明`Pod`更新和`Reolica Sets`状态的控制器。换句话说：
> 你在deployment对象中描述了一个期望状态，接着deployment控制器会让当前状态和用户期望状态保持一致。比如我期望运行2个nginx Pod，当一个Pod因为不可抗因素下线的时候deployment控制器就会根据用户期望的状态再启动一个nginx pod。

![deployment拓扑-1](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/deployment.png)

第二章节的`kubernetes`集群架构里，我说过`tomcat`和`redis`是通过相关`service`进行"连接"的，这其实只是为了大家能更简单的理解。其实`serice`会去找到对应的`deployment`，然后`deployment`根据申明的`Replica Sets`的配置，控制对应`Pod`容器的数量和状态。
    
## 3.Deployment的更新机制

![deployment更新机制](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/deployment.png)
你可以发现`Deployment`的更新机制是基于滚动更新的，具体顺序如下：
- 首先，创建一个新的`RS`控制器，版本为`v2`；
- 接着将旧控制器的pod陆续下线，同时新的RS控制器同步上线对应Pod；
- Pod更新完成后，弃用旧的RS控制器，滚动发布就此完成。

> 你可以使用kubectl get pod -o wide -w观察pod滚动更新情况，可以使用kubectl get rs -o wide观察RS控制器的名字、状态等信息。

> 你也可以使用pause命令实现基于deployment的金丝雀发布策略。

这里我补充了一个`RS`控制器状态，你可以观察发现，各控制器的命名、期望状态、当前状态和就绪状态。
```text
   
#使用命令查看rs控制器的历史版本    
[root@centos-1 mainfasts]# kubectl get rs -o wide
NAME               DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES       SELECTOR
myapp-67f698f887   0         0         0       53m     myapp        nginx:1.16   app=myapp,pod-template-hash=67f698f887,rel=stable
myapp-7c488c6f44   5         5         5       48m     myapp        nginx:1.17   app=myapp,pod-template-hash=7c488c6f44,rel=stable
myapp-98f644994    0         0         0       46m     myapp        nginx:1.15   app=myapp,pod-template-hash=98f644994,rel=stable
ngx-new-cb79d555   2         2         2       2d22h   nginx        nginx        app=ngx-new,pod-template-hash=cb79d555

```   

### 1.滚动发布和回滚实战

1) 我们首先编辑`deployment-nginx.yaml`，并`apply -f`，发布`nginx1.10`版本。
其中我们给定了滚动策略：最多新增1个(`maxSurge`)最少下线1个(`maxUnavailable`)

   第一次发布的时候是新增1个，下线2个
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deploy-nginx
spec:
  replicas: 3
  minReadySeconds: 10
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.10-alpine
        ports:
        - containerPort: 80
          name: http
        readinessProbe:
          periodSeconds: 1
          httpGet:
            path: /
            port: http
```
2) 接着，我们通过修改`deployment-nginx.yaml`的`image: nginx:1.10-alpine`版本为`1.13`，发布并观察。可以发现`deployment`对应的`rs`控制器逐步应用至`deploy-nginx-567c45c74`（`nginx:1.13-alpine`）
```bash
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   2         2         0       51s     nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   2         2         2       7m2s    nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       5m51s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6
        
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   3         3         2       2m40s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   0         0         0       8m51s   nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       7m40s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6

```
3) 同时，我们可以查看历史版本，第4条是我们最新的版本。由于前几次发布没有新增--record=true字段，所以显示为`none`
```bash
[root@centos-1 chapter5]# kubectl rollout history deployment/deploy-nginx
deployment.apps/deploy-nginx 
REVISION  CHANGE-CAUSE
2         <none>
3         <none>
4         kubectl apply --filename=deploy-nginx.yaml --record=true

```

4) 接下来，我将演示如何回滚至上个版本。
我们使用rollout undo命令进行回滚，默认--to-revision=0（上一个版本）。观察`rs`变化,发现已经全部切换至`1.10`的`nginx`,至此滚动发布的策略和回滚已经演示完毕
```bash
[root@centos-1 chapter5]# kubectl rollout undo deployment/deploy-nginx --to-revision=0
deployment.apps/deploy-nginx rolled back
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   2         2         2       4m58s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   2         2         2       11m     nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       9m58s   nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6
    
[root@centos-1 chapter5]# kubectl get rs -o wide
NAME                      DESIRED   CURRENT   READY   AGE    CONTAINERS   IMAGES              SELECTOR
deploy-nginx-567c45c748   0         0         0       5m6s   nginx        nginx:1.13-alpine   app=nginx,pod-template-hash=567c45c748
deploy-nginx-5745bb45d7   3         3         3       11m    nginx        nginx:1.10-alpine   app=nginx,pod-template-hash=5745bb45d7
deploy-nginx-67f876bcb6   0         0         0       10m    nginx        nginx:1.11-alpine   app=nginx,pod-template-hash=67f876bcb6

```

### 2.金丝雀发布实战

1) 这里，我们基于上文的`1.10`的`nginx`，发布金丝雀版本：`1.14`
```bash
[root@centos-1 chapter5]# kubectl set image deployment deploy-nginx nginx=nginx:1.14-alpine && kubectl rollout pause deployment deploy-nginx
deployment.apps/deploy-nginx image updated
deployment.apps/deploy-nginx paused
```

2) 此时发现`pod`新老版本共存，2个新版本2个老版本。你可以通过控制器名称后面的`HASH`数列，清晰观察到不通版本的控制器。
```bash
^C[root@centos-1 dingqishi]# kubectl get pod  -w
NAME                            READY   STATUS    RESTARTS   AGE
deploy-nginx-5745bb45d7-5wfml   1/1     Running   0          18m
deploy-nginx-5745bb45d7-84s4c   1/1     Running   0          18m
deploy-nginx-5745bb45d7-dqt8q   1/1     Running   0          18m
    
    
deploy-nginx-754874567-l6q7h    0/1     Pending   0          0s
deploy-nginx-754874567-l6q7h    0/1     Pending   0          0s
deploy-nginx-5745bb45d7-5wfml   1/1     Terminating   0          18m
deploy-nginx-754874567-l6q7h    0/1     ContainerCreating   0          0s
deploy-nginx-754874567-q4bsh    0/1     Pending             0          0s
deploy-nginx-754874567-q4bsh    0/1     Pending             0          0s
deploy-nginx-754874567-q4bsh    0/1     ContainerCreating   0          1s
deploy-nginx-5745bb45d7-5wfml   0/1     Terminating         0          18m
deploy-nginx-5745bb45d7-5wfml   0/1     Terminating         0          18m
deploy-nginx-5745bb45d7-5wfml   0/1     Terminating         0          18m
deploy-nginx-754874567-l6q7h    0/1     Running             0          24s
deploy-nginx-754874567-l6q7h    1/1     Running             0          25s
deploy-nginx-754874567-q4bsh    0/1     Running             0          27s
deploy-nginx-754874567-q4bsh    1/1     Running             0          27s
    
        
[root@centos-1 dingqishi]# kubectl get pod  
NAME                            READY   STATUS    RESTARTS   AGE
deploy-nginx-5745bb45d7-84s4c   1/1     Running   0          19m
deploy-nginx-5745bb45d7-dqt8q   1/1     Running   0          19m
deploy-nginx-754874567-l6q7h    1/1     Running   0          61s
deploy-nginx-754874567-q4bsh    1/1     Running   0          61s
```

3) 如果新版本的用户满意度不高，需要回滚的话，此时我们也可以用上文提到的`rollout`命令。
> 再次提示：--to-revision=0为默认参数，意思是上一个版本，如果要回到指定版本，按需指定就行了。
```bash
kubectl rollout undo deployment/deploy-nginx --to-revision=0
```
4) 如果新版本用户满意度不错，需要完成剩余`Pod`更新的话，需要使用`resume`命令
```bash
[root@centos-1 chapter5]# kubectl rollout resume deployment deploy-nginx
deployment.apps/deploy-nginx resumed
    
        
[root@centos-1 dingqishi]# kubectl get pod  -w
NAME                            READY   STATUS    RESTARTS   AGE
deploy-nginx-5745bb45d7-84s4c   1/1     Running   0          27m
deploy-nginx-5745bb45d7-dqt8q   1/1     Running   0          27m
deploy-nginx-754874567-l6q7h    1/1     Running   0          8m35s
deploy-nginx-754874567-q4bsh    1/1     Running   0          8m35s
    
    
deploy-nginx-5745bb45d7-84s4c   1/1     Terminating   0          30m
deploy-nginx-5745bb45d7-dqt8q   1/1     Terminating   0          30m
deploy-nginx-754874567-l6zz8    0/1     Pending       0          0s
deploy-nginx-754874567-l6zz8    0/1     Pending       0          0s
deploy-nginx-754874567-l6zz8    0/1     ContainerCreating   0          0s
deploy-nginx-5745bb45d7-84s4c   0/1     Terminating         0          30m
deploy-nginx-5745bb45d7-dqt8q   0/1     Terminating         0          30m
deploy-nginx-754874567-l6zz8    0/1     Running             0          3s
deploy-nginx-754874567-l6zz8    1/1     Running             0          3s
deploy-nginx-5745bb45d7-84s4c   0/1     Terminating         0          30m
deploy-nginx-5745bb45d7-84s4c   0/1     Terminating         0          30m
deploy-nginx-5745bb45d7-dqt8q   0/1     Terminating         0          30m
deploy-nginx-5745bb45d7-dqt8q   0/1     Terminating         0          30m
    
        
[root@centos-1 dingqishi]# kubectl get pod  
NAME                           READY   STATUS    RESTARTS   AGE
deploy-nginx-754874567-l6q7h   1/1     Running   0          14m
deploy-nginx-754874567-l6zz8   1/1     Running   0          3m33s
deploy-nginx-754874567-q4bsh   1/1     Running   0          14m

```

## 4.ReplicaSet
ReplicaSet组件的作用，想必现在你已经有些许的了解了：
- 在给定的任何时间，保证一个明确的pod运行数量
- 管理底层Pod
- 不应该人为介入进行调整、管理


## 5.命令补充
```bash
#实时观察Pod：
kubectl get pod -w
```

## 6.deployment-demo
[deployment-demo](https://github.com/Aaron1989/CloudNativeNotes/tree/master/docs/Kubernetes/6.Pod%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)