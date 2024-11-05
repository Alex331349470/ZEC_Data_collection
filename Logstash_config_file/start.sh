#!/bin/bash
nohup bin/logstash -f config/rabbitmq-to-es-yl-test.conf &
pid=$!
echo $pid > logstash.pid
nohup jstat -gcutil -t -h20 $pid 60s > logstash.gcutil &