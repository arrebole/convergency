## 数据迁移器

> 允许用户将 `maxwell` 中的记录写到 `elasticsearch` 中

`maxwell` 监听 mysql 数据变化，将变化记录发送到 `kafka`, 该程序接收 `kafka` 中的信息，将内容写到 `elasticsearch`；


## 需要的依赖
+ node16+
+ mysql5.5+
+ maxwell
+ kafka
+ elasticsearch


## `mysql` 正确启动 `binlog` 功能

```
# /etc/my.cnf
[mysqld]
binlog_format=row
server_id=1 
log-bin=master
```


## 运行 `maxwell` 监听数据库连接 `kafka`

```bash
maxwell \
    --user='root' \
    --password='password' \
    --host='127.0.0.1' \
    --port=3306 \
    --producer=kafka \
    --kafka.bootstrap.servers=127.0.0.1:9092 \
    --kafka_topic=maxwell
```

## 配置
```yaml
--- config/default.yaml

kafka:
  clientId: myapp

  --- maxwell 写入的 topic
  topic: maxwell
  groupId: main

  --- kafka 地址 
  brokers:
  - 10.0.6.88:9092

adapters:
  - host: 10.0.6.88:3307
    --- 监听的数据库
    database: upyun
    --- 监听的表
    table: users
    
    --- 需要被写入的数据库
    endpoint:
      driver: es6
      --- 数据库中的主键
      key: id
      
      --- es 中的索引
      index: maxwell-upyun-users

      --- es 中的类型
      type: maxwell-upyun-users

      --- es 的主机
      host: 10.0.2.30:9200

```


### `elasticsearch` 中正确创建索引和类型

...


## 运行该程序

```bash
npm install && npm run build
node dist/main.js
```
