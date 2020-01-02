# Volume基础应用
- Volume定义
- Volume分类
- PV的生命周期
- pv的回收策略
- PV的申明类型
- 额外补充
- 查询命令
- 官方文档

## 1.Volume定义
在容器的生命周期里，位于磁盘上的文件，它的生命周期是很短暂的，`docker`里面如此，`kubernetes`里亦然。
数据很可能因为各种不可抗因素丢失，比如`pod`被迫下线时，它会根据`rs`控制器的数量定义，重新生成一个干净状态的新`pod`。
`Volume`的引入不但解决里数据稳定性的问题，也解决了同一个`pod`内，多个`containers`数据共享的需求；和`docker`里不同的是，`kubernetes`中内置封装了很多存储类型，`pod`也可以选择性的使用一个或多个。

## 2.Volume分类
`kubernetes`内置封装了很多存储类型，大致可分为以下七大部分：
> 我已经整理好了官方配置文档，大家可以直接按需阅读，如何使用和配置。

存储类型 | 存储组件 | 官网文档
---- | ----- | ----- 
云存储 | awsElasticBlockStore | [awsElasticBlockStore](https://kubernetes.io/docs/concepts/storage/volumes/#awselasticblockstore)
云存储 | azureDisk | [azureDisk](https://kubernetes.io/docs/concepts/storage/volumes/#azuredisk)
云存储 | azureFile | [azureFile](https://kubernetes.io/docs/concepts/storage/volumes/#azurefile)
云存储 | gcePersistentDisk | [gcePersistentDisk](https://kubernetes.io/docs/concepts/storage/volumes/#gcepersistentdisk)
云存储 | vsphereVolume | [vsphereVolume](https://kubernetes.io/docs/concepts/storage/volumes/#vspherevolume)
分布式存储 | cephfs | [cephfs](https://kubernetes.io/docs/concepts/storage/volumes/#cephfs)
分布式存储 | glusterfs | [glusterfs](https://kubernetes.io/docs/concepts/storage/volumes/#glusterfs)
分布式存储 | rbd | [rbd](https://kubernetes.io/docs/concepts/storage/volumes/#rbd)
网络存储 | nfs | [nfs](https://kubernetes.io/docs/concepts/storage/volumes/#nfs)
网络存储 | fc | [fc](https://kubernetes.io/docs/concepts/storage/volumes/#fc)
网络存储 | iscsi | [iscsi](https://kubernetes.io/docs/concepts/storage/volumes/#iscsi)
临时存储 | emptyDir | [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir)
本地存储 | hostPath | [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)
特殊存储 | configMap | [configMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap)
特殊存储 | downwardAPI | [downwardAPI](https://kubernetes.io/docs/concepts/storage/volumes/#downwardapi)
特殊存储 | secret | [secret](https://kubernetes.io/docs/concepts/storage/volumes/#secret)
自定义存储 | csi | [csi](https://kubernetes.io/docs/concepts/storage/volumes/#csi)
持久卷申请 | persistentVolumeClaim | [persistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/volumes/#persistentvolumeclaim)

## 3.PV的生命周期

```text
   Provisioning：            申明
   Binding：                 绑定
   using：                   使用     
   Reclaiming：              回收
```
## 4.PV的回收策略
```text
    Delete：     数据和pv都会删除
    Recyle：     （已废弃）
    Retain：     数据和pv都不动
```


## 5.PV的申明类型

`PV`的申明是建立在`SC`（`StorageClasses`：存储类）上的，可分为以下两种：
    
Static：
> 静态，管理员分配

Dynamic：
> 动态，API server需要增加一个参数配置。--enable-admission-plugins，具体类型参考:
        [storage-classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)

## 6.额外补充
```text
    1.Pv没有namespace,Pvc有namespace
    2.SC（存储类）的API字段配置说明：kubectl explain sc
```

## 7.查询命令

```bash
#API字段配置说明
[root@centos-1 mainfasts]# kubectl explain pods.spec.volumes
KIND:     Pod
VERSION:  v1
RESOURCE: volumes <[]Object>

#API字段配置说明      
[root@centos-1 dingqishi]# kubectl explain pods.spec.volumes.persistentVolumeClaim
KIND:     Pod
VERSION:  v1
RESOURCE: persistentVolumeClaim <Object>

#集群pv情况查看
[root@centos-1 dingqishi]#kubectl get pv -A
```

## 8.官方文档

https://kubernetes.io/docs/concepts/storage/volumes/

https://kubernetes.io/docs/concepts/storage/persistent-volumes/






