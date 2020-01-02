# Pod控制器-DaemonSet
本章节给你带来第二个控制器：`DaemonSet`的讲解。
你将了解到：什么是`DaemonSet`，以及他的配置实战，最后我还引出了污点和容忍度的专有名词，如果你已经有了一定的基础，可以选择性地直接去阅读该章节（看个人）。
- What is DaemonSet
- 命令补充
- 实战配置
- 知识点补充
## 1.What is DaemonSet
`DaemonSet`是一个确保每个符合规则的`node`节点有且仅有一个`Pod`的控制器。你要注意以下两点：
- 1.新节点加入集群，也会新增一个`Pod`
- 2.当节点下线后，相应Pod也会被回收

## 2.命令补充
```bash
#可以使用kubectl get ds查看DaemonSet
[root@centos-1 mainfasts]#        kubectl get ds -A
NAMESPACE     NAME                      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
kube-system   kube-flannel-ds-amd64     3         3         3       3            3           <none>                        4d1h
kube-system   kube-flannel-ds-arm       0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-arm64     0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-ppc64le   0         0         0       0            0           <none>                        4d1h
kube-system   kube-flannel-ds-s390x     0         0         0       0            0           <none>                        4d1h
kube-system   kube-proxy                3         3         3       3            3           beta.kubernetes.io/os=linux   4d1h

```

## 3.实战配置
1) 编辑`filebeat-daemonset.yaml`,这里我们创建了一个`filebeat`的`daemonset`，他们会和日常需求一样，在每个客户端node节点部署一个filebeat的pod`容器。你要注意：
>  我们这里使用了一个节点的选择器：logcollecting: "on"，节点上默认是没有这个标签的！
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: filebeat-ds
  labels:
    app: filebeat
spec:
  selector:
    matchLabels:
      app: filebeat
  template:
    metadata:
      labels:
        app: filebeat
    spec:
      containers:
      - name: filebeat
        image:  prima/filebeat:6.4.2
        env:
        - name: REDIS_HOST
          value: db.ikubernetes.is:6379
        - name: LOG_LEVEL
          value: info
      nodeSelector:                       #节点选择器
        logcollecting: "on"               #自定义标签          
```

2) 使用`apply -f`载入`yaml`，并观察。可以发现，由于自定义标签的定义，没有符合的`node`节点，所以`pod`一个都没有生成！
```bash
[root@centos-1 mainfasts]# kubectl apply -f filebeat-daemonset.yaml  
daemonset.apps/filebeat-ds created
    
[root@centos-1 mainfasts]# kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
ngx-new-cb79d555-gqwf8   1/1     Running   0          29h
ngx-new-cb79d555-hcdr9   1/1     Running   0          30h
    
[root@centos-1 mainfasts]# kubectl get ds
NAME          DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR      AGE
filebeat-ds   0         0         0       0            0           logcollecting=on   8s

```
3) 接下来，我们尝试给`node01`节点打上对应标签，发现`pod`已经开始调度至对应节点了
```bash
[root@centos-1 mainfasts]# kubectl label node centos-2.shared logcollecting="on" --overwrite
node/centos-2.shared labeled
    
[root@centos-1 mainfasts]# kubectl get pod
NAME                     READY   STATUS             RESTARTS   AGE
filebeat-ds-dlxwn        0/1     CrashLoopBackOff   1          5s
ngx-new-cb79d555-gqwf8   1/1     Running            0          29h
ngx-new-cb79d555-hcdr9   1/1     Running            0          30h
    
[root@centos-1 mainfasts]# kubectl get node --show-labels
NAME              STATUS   ROLES    AGE   VERSION   LABELS
centos-1.shared   Ready    master   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-1.shared,kubernetes.io/os=linux,node-role.kubernetes.io/master=
centos-2.shared   Ready    <none>   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-2.shared,kubernetes.io/os=linux,logcollceting=true,logcollecting=on
centos-3.shared   Ready    <none>   4d    v1.16.3   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=centos-3.shared,kubernetes.io/os=linux

```

4) 去除标签，你可以使用以下命令
```bash
 kubectl label node centos-2.shared logcollceting-
``` 

## 4.知识点补充
节点有污点，会影响调度策略，我在[污点和容忍度](https://aaron1989.github.io/CloudNativeNotes/Kubernetes/23.%E6%B1%A1%E7%82%B9%E5%92%8C%E5%AE%B9%E5%BF%8D%E5%BA%A6/)章节会详细讲解。
```bash
[root@centos-1 mainfasts]# kubectl describe node centos-1.shared
Name:               centos-1.shared
Roles:              master
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=centos-1.shared
                    kubernetes.io/os=linux
                    node-role.kubernetes.io/master=
Annotations:        flannel.alpha.coreos.com/backend-data: {"VtepMAC":"6a:82:c9:37:15:dd"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 192.168.0.104
                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    node.alpha.kubernetes.io/ttl: 0
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Mon, 25 Nov 2019 17:00:45 +0800
Taints:             node-role.kubernetes.io/master:NoSchedule.          #污点，pod调度的高级功能，容忍度：不允许调度至master节点
```
