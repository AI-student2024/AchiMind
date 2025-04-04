# ArchiMind - 智能建筑知识图谱可视化平台

## 项目简介
ArchiMind 是一个专注于智能建筑领域的知识图谱可视化平台，旨在帮助用户更好地理解和管理智能建筑相关的知识体系。

## 访问方式

### 方式一：本地开发环境访问
1. 环境要求
   - Node.js 版本：>= 14.0.0
   - npm 版本：>= 6.0.0

2. 安装和启动
   ```bash
   # 安装依赖
   npm install

   # 启动开发服务器
   npm run dev  # 开发环境：支持热更新，方便开发调试
   ```

3. 开发环境特点
   - 访问地址：http://localhost:8080/AchiMind/
   - 支持热更新：代码修改后自动刷新
   - 不压缩代码：方便调试
   - 提供开发工具：如源码映射
   - 适合本地开发和调试

### 方式二：线上环境访问（GitHub Pages + CDN）
1. GitHub Pages 访问
   - 官方地址：https://ai-student2024.github.io/AchiMind/
   - 部署命令：
     ```bash
     npm run deploy  # 生产环境：构建优化后部署到GitHub Pages
     ```
   - 部署过程：
     1. `npm run build`：构建生产版本
        - 代码压缩和优化
        - 资源打包和处理
        - 输出到 dist 目录
     2. `gh-pages -d dist`：部署到 GitHub Pages
        - 将 dist 目录推送到 gh-pages 分支
        - GitHub Pages 自动更新

2. CDN 加速访问（推荐国内用户）
   - 通过自定义域名 + CDN 访问
   - 提供更快的访问速度
   - 更稳定的连接质量
   - 具体域名以实际配置为准

#### 访问方式对比
| 特性 | 本地访问 | GitHub Pages | CDN加速 |
|------|----------|--------------|---------|
| 访问速度 | 最快 | 一般 | 快 |
| 适用场景 | 开发调试 | 演示展示 | 生产环境 |
| 配置难度 | 简单 | 中等 | 较复杂 |
| 费用 | 免费 | 免费 | 付费 |
| 适用用户 | 开发者 | 海外用户 | 国内用户 |

## 部署说明

本项目支持两种部署方式：

### 1. GitHub Pages部署
- 访问地址：https://ai-student2024.github.io/AchiMind/
- 自动部署：当代码推送到main分支时，会自动触发GitHub Actions进行部署

### 2. ECS服务器部署
- 访问地址：http://8.141.95.87/AchiMind/
- 服务器信息：阿里云ECS（等待域名备案）
- 手动部署方式：
  ```bash
  # 连接到ECS
  ssh -i "D:/AgentsDEV/aliyun-ecskey/archimind-beian.pem" root@8.141.95.87

  # 进入项目目录
  cd /var/www/archimind

  # 拉取最新代码
  git pull origin main

  # 安装依赖
  npm install

  # 构建项目
  npm run build
  ```

### 3. 自动化部署脚本
为了简化部署过程，提供了自动化部署脚本：

1. 使用方法：
   ```bash
   # 给脚本添加执行权限（首次使用时）
   chmod +x deploy-all.sh

   # 执行部署（带上更新说明）
   ./deploy-all.sh "您的更新说明"
   ```

2. 脚本功能：
   - 自动提交代码到GitHub
   - 自动推送到远程仓库
   - 自动部署到ECS服务器
   - GitHub Pages会自动触发部署

3. 部署完成后检查：
   - GitHub Pages: https://ai-student2024.github.io/AchiMind/
   - ECS服务器: http://8.141.95.87/AchiMind/

## 本地开发

### 环境要求
- Node.js 版本：>= 14.0.0
- npm 版本：>= 6.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 部署到 GitHub Pages
```bash
npm run deploy
```

## 主要功能
- 智能建筑知识图谱可视化
- 项目信息管理
- 文档管理系统
- 知识检索与查询

## 技术栈
- Vite
- Tailwind CSS
- Vis.js（知识图谱可视化）
- Font Awesome（图标库）

## 项目结构
```
ArchiMind/
├── src/                    # 源代码目录
│   ├── components/        # 可复用组件
│   ├── pages/            # 页面组件
│   ├── scripts/          # JavaScript 脚本
│   └── styles/           # 样式文件
├── public/               # 公共资源目录
├── dist/                # 构建输出目录
├── docs/                # 项目文档
├── node_modules/        # 依赖包目录
├── .vscode/            # VS Code 配置
├── vite.config.js      # Vite 配置文件
├── package.json        # 项目配置文件
├── package-lock.json   # 依赖版本锁定文件
├── index.html          # HTML 入口文件
├── build.js           # 构建脚本
├── deploy.sh          # 部署脚本
├── deploy-all.sh      # 完整部署脚本
├── README.md          # 项目说明文档
├── LICENSE           # 许可证文件
└── .gitignore        # Git 忽略文件
```

### 目录说明

1. `src/` - 源代码目录
   - `components/`: 可复用的页面组件
   - `pages/`: 各个页面的具体实现
   - `scripts/`: JavaScript 脚本文件
   - `styles/`: CSS 样式文件

2. `public/` - 公共资源目录
   - 存放不需要打包的静态资源

3. `dist/` - 构建输出目录
   - 包含构建后的生产环境文件
   - 用于部署到服务器

4. `docs/` - 项目文档目录
   - 存放项目相关文档

5. `.vscode/` - VS Code 配置目录
   - 包含编辑器相关配置

### 核心文件说明

1. 配置文件
   - `vite.config.js`: Vite 构建工具配置
   - `package.json`: 项目依赖和脚本配置
   - `package-lock.json`: 依赖版本锁定文件

2. 入口文件
   - `index.html`: 页面入口

3. 脚本文件说明
   - `build.js`: 构建脚本
     - 功能：执行项目构建流程，将源代码转换为生产环境可用的文件
     - 主要工作：
       1. 合并和压缩 CSS 文件
       2. 合并和压缩 JavaScript 文件
       3. 压缩 HTML 文件
       4. 复制静态资源（图片、字体等）
     - 输出：生成 dist 目录下的生产环境文件
     - 特点：
       - 自动处理文件依赖关系
       - 优化和压缩所有资源
       - 保持代码的可维护性
       - 确保生产环境的性能最优
     - 使用：`node build.js` 或 `npm run build`
   
   - `deploy.sh`: 基础部署脚本
     - 功能：基础部署流程
     - 包含：构建项目、部署到 GitHub Pages
     - 使用：`./deploy.sh`
   
   - `deploy-all.sh`: 完整部署脚本
     - 功能：完整的部署流程
     - 包含：提交代码、推送到 GitHub、部署到 ECS、触发 GitHub Pages 部署
     - 使用：`./deploy-all.sh "更新说明"`
     - 示例：`./deploy-all.sh "修复部署问题"`

4. 部署相关命令
   ```bash
   # 构建项目
   npm run build    # 使用 build.js 构建项目
   
   # 部署到 GitHub Pages
   npm run deploy   # 使用 deploy.sh 部署
   
   # 完整部署流程
   ./deploy-all.sh "更新说明"  # 使用 deploy-all.sh 执行完整部署
   ```

## 更新部署流程

### 本地修改提交
1. 确认修改
   ```bash
   # 查看修改的文件
   git status
   
   # 查看具体修改内容
   git diff
   ```

2. 提交修改
   ```bash
   # 添加修改的文件到暂存区
   git add .
   
   # 提交修改（写明修改说明）
   git commit -m "update: 更新的具体内容"
   
   # 推送到 GitHub
   git push origin main
   ```

### 部署到 GitHub Pages
1. 构建项目
   ```bash
   # 构建生产版本
   npm run build
   ```

2. 部署更新
   ```bash
   # 部署到 GitHub Pages
   npm run deploy
   ```

### 快速更新命令（推荐）
将提交和部署合并为一个命令，提高效率：

1. Windows 系统
   ```bash
   # 方式一：使用 && 连接命令
   git add . && git commit -m "update: 更新说明" && git push origin main && npm run deploy

   # 方式二：创建批处理文件 deploy.bat
   echo git add . && git commit -m "update: %%1" && git push origin main && npm run deploy > deploy.bat
   # 使用方式：deploy.bat "更新说明"
   ```

2. Linux/Mac 系统
   ```bash
   # 方式一：使用 && 连接命令
   git add . && git commit -m "update: 更新说明" && git push origin main && npm run deploy

   # 方式二：创建别名
   echo 'alias deploy="git add . && git commit -m \"update: $1\" && git push origin main && npm run deploy"' >> ~/.bashrc
   source ~/.bashrc
   # 使用方式：deploy "更新说明"
   ```

3. 使用建议
   - 合并命令虽然方便，但建议在重要更新时还是分步执行
   - 确保每次提交都有明确的更新说明
   - 部署前最好先在本地测试确认功能正常

### 验证更新
1. 等待几分钟让 GitHub Pages 部署生效
2. 访问 https://[您的用户名].github.io/AchiMind
3. 检查新功能是否正常工作
4. 查看控制台是否有错误信息

### 常见问题处理
1. 提交失败
   ```bash
   # 拉取远程最新代码
   git pull origin main
   
   # 解决冲突后重新提交
   git add .
   git commit -m "fix: 解决冲突"
   git push origin main
   ```

2. 部署失败
   ```bash
   # 清理构建缓存
   npm run clean
   
   # 重新安装依赖
   npm install
   
   # 重新构建和部署
   npm run build
   npm run deploy
   ```

3. 更新未生效
   - 清除浏览器缓存
   - 等待 CDN 缓存刷新（约5-30分钟）
   - 检查 GitHub Pages 部署状态

## 贡献指南
欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证
[MIT License](LICENSE)