# 使用华为云镜像源的 Node.js 18 Alpine 版本作为基础镜像
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有源代码
COPY . .

# 暴露端口
EXPOSE 5000 3000

# 创建启动脚本
RUN echo '#!/bin/sh' > start.sh && \
    echo 'npm run server &' >> start.sh && \
    echo 'npm run start' >> start.sh && \
    chmod +x start.sh

# 设置启动命令
CMD ["./start.sh"]
