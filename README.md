# ArchiMind - 智能建筑知识图谱可视化平台

## 项目简介
ArchiMind 是一个专注于智能建筑领域的知识图谱可视化平台，旨在帮助用户更好地理解和管理智能建筑相关的知识体系。

## 版本管理

### 分支策略
- `main`: 生产环境分支，用于部署到生产环境
- `develop`: 开发环境分支，用于日常开发
- `feature/*`: 功能分支，用于开发新功能
- `hotfix/*`: 紧急修复分支，用于修复生产环境的问题

### 标签管理
- 使用语义化版本号（Semantic Versioning）
- 格式：v主版本号.次版本号.修订号
- 示例：v1.0.0

### 版本发布流程
1. 从 `develop` 分支创建 `release` 分支
2. 在 `release` 分支上进行测试和修复
3. 测试通过后，合并到 `main` 分支
4. 在 `main` 分支上打标签
5. 将 `release` 分支的更改合并回 `develop` 分支

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
  git fetch origin
  git checkout <branch_name>
  git pull origin <branch_name>

  # 安装依赖
  npm install

  # 构建项目
  npm run build
  ```

### ECS服务器部署注意事项
1. SSH 密钥文件权限设置
   - 密钥文件（.pem）必须设置正确的权限
   - 执行命令：`chmod 600 "密钥文件路径"`
   - 权限说明：
     - 600：只有所有者可读写
     - 不能有其他用户或组的访问权限
   - 这是 SSH 安全要求，否则连接会失败

### 3. 自动化部署脚本
为了简化部署过程，提供了自动化部署脚本：

1. 使用方法：
   ```bash
   # 给脚本添加执行权限（首次使用时）
   chmod +x deploy-all.sh

   # 执行部署（基本用法）
   ./deploy-all.sh "您的更新说明"

   # 指定分支和环境部署
   ./deploy-all.sh "您的更新说明" develop staging
   ```

2. 脚本参数说明：
   - 第一个参数：更新说明（必填）
   - 第二个参数：分支名称（可选，默认：main）
   - 第三个参数：环境名称（可选，默认：production）

3. 环境说明：
   - production: 生产环境
   - staging: 测试环境

4. 部署完成后检查：
   - GitHub Pages: https://ai-student2024.github.io/AchiMind/
   - ECS服务器: http://8.141.95.87/AchiMind/

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

## 更新部署流程

### 开发流程
1. 创建功能分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 开发完成后提交
   ```bash
   git add .
   git commit -m "feat: 功能说明"
   git push origin feature/your-feature-name
   ```

3. 合并到开发分支
   ```bash
   git checkout develop
   git merge feature/your-feature-name
   ```

### 发布流程
1. 创建发布分支
   ```bash
   git checkout -b release/v1.x.x
   ```

2. 测试和修复
   ```bash
   # 在release分支上进行测试和修复
   ```

3. 发布到生产环境
   ```bash
   git checkout main
   git merge release/v1.x.x
   git tag -a v1.x.x -m "Release v1.x.x"
   git push origin main --tags
   ```

4. 更新开发分支
   ```bash
   git checkout develop
   git merge release/v1.x.x
   ```

### 紧急修复流程
1. 创建修复分支
   ```bash
   git checkout -b hotfix/issue-description
   ```

2. 修复并提交
   ```bash
   git add .
   git commit -m "fix: 修复说明"
   git push origin hotfix/issue-description
   ```

3. 合并到生产环境
   ```bash
   git checkout main
   git merge hotfix/issue-description
   git tag -a v1.x.y -m "Hotfix v1.x.y"
   git push origin main --tags
   ```

4. 更新开发分支
   ```bash
   git checkout develop
   git merge hotfix/issue-description
   ```

## 贡献指南
欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证
[MIT License](LICENSE)