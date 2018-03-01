#!/bin/bash
echo "脚本开始运行,启动服务..."

pm2 kill
sleep 2s
pm2 start ./bin/www
# 缓冲时间
sleep 2s

#测试一下脚本
echo "您的服务器内核为"`uname -a | awk '{print $3}'`

while [[ True ]]; do

  # 根据PID使用PS查找当前进程的CPU占用[弃]
  # 获取PID
  # 这种方法 可能会找到多个 即使增加过滤条件 也不能一定保证取到唯一
  # ----------------------------------------------------
  #pid=` ps -e |grep 'node' |awk '{print $1}' `
  #改用通过 端口号 假设 程序端口为8000 找 PID 的方法
  # 非root用户会提示 可能无法查看全部 ,所以这里使用sudo ,获取-> 数据样式 20008/mywebs -> cut 取/之前的pid
  pid=` sudo netstat -tlnpa |grep '8000'|awk 'END {print $7}' |cut -d '/' -f 1 `
  # 存在NODE进程↓↓↓
  if [[ $pid ]]; then
    # 获取当前进程CPU占用情况[此步骤取到的结果样式为( %CPU 0 )]
    pscpu=` ps -o pcpu -p "$pid" |awk '{print $1}' |cut -d . -f 1 `
    # 去掉没用的部分,剩下的部分是具体占用率的数字
    pscpu=${pscpu:5}
    # 占用率大于95%重启服务
    if [[ "$pscpu" -gt "95" ]]; then
      echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] 服务器  状态:繁忙 WEB服务进程[PID:"$pid"]占用CPU:"$pscpu"% 即将重启PM2..."
      pm2 restart ./bin/www
      sleep 2s
      echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] WEB服务重启完成"
    else
      echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] 服务器  状态:正常 WEB服务进程[PID:"$pid"]占用CPU:"$pscpu"%"
    fi
  else
    echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] 服务器  状态:未知 没有找到WEB服务 尝试再次启动"
    pm2 kill
    sleep 2s
    pm2 start ./bin/www
    # 缓冲时间
    sleep 2s
    pid2=` sudo netstat -tlnpa |grep '8000'|awk 'END {print $7}' |cut -d '/' -f 1 `
    if [[ ! $pid2 ]]; then
      # 恢复失败 直接退出
      echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] 服务器  状态:服务恢复失败,程序退出"
      break
    else
      echo "[$(date "+%Y-%m-%d %H:%M:%S.%N")] 服务器  状态:服务恢复成功"
    fi
  fi
  sleep 3s
done
