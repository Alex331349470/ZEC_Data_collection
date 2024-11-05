if [ -f logstash.pid ]; then
  pid=$(cat logstash.pid)
  
  if [ -n "$pid" ]; then
    kill -15 $pid
    echo "" > logstash.pid
    echo "Process $pid has been terminated."
    
    # 循环检查进程是否已终止
    while true; do
      if kill -0 $pid 2>/dev/null; then
        echo "执行中..."
        sleep 1  # 每秒检查一次
      else
        echo "Process $pid has terminated."
        break
      fi
    done
    # if kill -0 $pid 2>/dev/null; then
    #   echo "Failed to terminate process $pid."
    # else
    #   echo "Process $pid terminated successfully."
    # fi
  fi
fi
