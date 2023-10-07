# ZEC大数据项目

## 项目实施

该项目为数据抽取项目以及ETL和BI展示为主，具体为三个阶段：

1.数据抽取(logstash)
- PLC的数据抽取（**由购买的PLC抽取库实施**）
- 电能数据的抽取（**抽取电能厂家的MySQL库至死信队列**）
- 设备数据抽取（**从Rabbitmq中将设备数据抽取至死信队列**）
- MES数据抽取（**从MES数据库中将逻辑数据抽取至死信队列**）
- 设备系统数据抽取（**从设备管理系统中将逻辑数据抽取至死信队列**）

2.数据清洗和存储（hdfs和elasticsearch）
- logstash数据清洗（__第一次清洗，基本清洗__）
- DPI数据分片（__暂无__）
- presto实时聚合（__使用机器性能做内存性聚合，性能问题__）
- elasticsearch实时数据API
- HDFS实时数据存储（__读取性能问题__）

3.数据可视化（FineReport和FineBI）
- FineBI提供简单数据自动化
- FineReport提供复杂报表自动化

## 项目架构
1.data collection
- __logstash__ 
- __presto__
- __rabbitmq__

2.data caculate
- __presto__
- __FineReport__

3.data storage
- __hdfs__
- __elasticsearch__

4.data orgernization
- __hadoop__
- __zookeeper__
- __kafka(TBD)__

5.data visualization
- __FineBI__
