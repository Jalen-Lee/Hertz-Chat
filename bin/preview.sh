#!/bin/bash

folder_exists(){
  if test -d "${root_dir}$1"
  then
      # echo "$1目录存在"
      return 0
  else
      # echo "$1目录不存在"
      return 1
  fi
}

command_exists(){
  type "$1" >/dev/null 2>&1
}

# 当前文件执行目录
#readonly cur_dir="$(pwd)"
# 项目根目录
#readonly root_dir="$(dirname "${cur_dir}")"

# 项目根目录
readonly root_dir="$(pwd)"
# client build目录
readonly build_dir="/client/build"

# echo "当前文件执行目录: ${cur_dir}"
# echo "项目根目录: ${root_dir}"


if ! folder_exists $build_dir
then
  echo "client项目还没构建，请执行 yarn build 或 yarn build:client"
  exit 1
elif ! command_exists serve;
then
  echo "serve命令不存在，请看https://www.npmjs.com/package/serve"
  exit 1
fi

serve -s "${root_dir}${build_dir}"




