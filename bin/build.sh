cd client || exit
yarn prebuild
yarn build
echo "client 构建完成"
# shellcheck disable=SC2103
cd ..
cd server || exit
yarn prebuild
yarn build
echo "server 构建完成"
