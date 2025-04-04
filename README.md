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

### GitHub Pages 部署
项目目前部署在 GitHub Pages：https://ai-student2024.github.io/AchiMind/

#### 适用场景
1. 开发和测试环境
   - 适合项目开发阶段的演示和测试
   - 方便团队成员快速访问和验证功能
   - 无需额外服务器成本

2. 小规模应用
   - 适合静态网站和单页应用（SPA）
   - 适合用户量较小的项目
   - 每月流量限制在 100GB 以内

3. 演示网站
   - 适合项目展示和演示
   - 适合技术文档托管
   - 适合开源项目主页

4. 使用限制
   - 不适合大规模商业应用
   - 不适合需要后端服务的动态网站
   - 不适合对访问速度要求较高的应用（国内访问）
   - 单个仓库大小限制在 1GB 以内

5. 替代方案
   - 国内访问建议使用 CDN 加速
   - 大规模应用建议使用专业云服务
   - 需要后端服务时建议使用完整的云托管方案

#### 部署步骤
1. 仓库配置
   - 创建 GitHub 仓库：https://github.com/new
   - 仓库名称：AchiMind
   - 设置为公开仓库（Public）

2. 本地代码配置
   ```bash
   # 初始化 Git 仓库
   git init
   
   # 添加远程仓库
   git remote add origin https://github.com/[您的用户名]/AchiMind.git
   
   # 添加所有文件
   git add .
   
   # 提交更改
   git commit -m "Initial commit"
   
   # 推送到主分支
   git push -u origin main
   ```

3. GitHub Pages 设置
   - 进入仓库设置（Settings）
   - 找到 Pages 选项（Settings -> Pages）
   - Source 选择：Deploy from a branch
   - Branch 选择：gh-pages 分支
   - 点击 Save 保存设置

4. 部署配置
   - 在 `package.json` 中确保有以下脚本：
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
   - 在 `vite.config.js` 中设置正确的 base：
   ```javascript
   export default defineConfig({
     base: '/AchiMind/',
     // 其他配置...
   })
   ```

5. 执行部署
   ```bash
   # 安装 gh-pages 包（如果未安装）
   npm install -D gh-pages
   
   # 运行部署命令
   npm run deploy
   ```

6. 验证部署
   - 访问 https://[您的用户名].github.io/AchiMind
   - 检查控制台是否有资源加载错误
   - 确认所有功能正常运行

### CDN 加速配置（国内访问）

#### CDN 概述
CDN（Content Delivery Network，内容分发网络）是一种通过分布式节点加速网站访问的技术服务：

1. 工作原理
   - 将网站内容分发到全球各地的节点服务器
   - 用户访问时自动连接到最近的节点
   - 减少网络拥堵，提供更快的访问速度

2. 主要优势
   - 提升访问速度：就近访问，减少网络延迟
   - 降低带宽成本：分散源站压力，节省带宽费用
   - 提高可用性：多节点备份，防止单点故障
   - 防御DDoS：分散攻击流量，提供安全防护

3. 适用内容
   - 静态资源：图片、CSS、JavaScript文件
   - 下载文件：安装包、文档、媒体文件
   - 视频流媒体：直播、点播服务
   - 动态内容：API接口、动态页面（部分场景）

4. 使用建议
   - 推荐将静态资源使用 CDN 加速
   - 选择合适的 CDN 服务商（如阿里云、腾讯云等）
   - 根据访问区域选择节点覆盖范围
   - 配置合适的缓存策略

#### CDN 配置步骤
由于 GitHub Pages 在国内访问可能不稳定，建议配置 CDN 加速：

1. 域名准备
   - 购买域名（推荐使用阿里云域名服务）
   - 完成域名备案（中国大陆必须，约5-20个工作日）

2. 阿里云 CDN 配置
   - 登录阿里云控制台，开通 CDN 服务
   - 获取 AccessKey：
     - 控制台右上角头像 -> AccessKey 管理
     - 建议使用子用户 AccessKey（更安全）
     - 保存好 AccessKey ID 和 AccessKey Secret

3. CDN 域名配置
   - 进入 CDN 控制台 -> 域名管理 -> 添加域名
   - 配置信息：
     - 加速域名：您的域名（可以使用二级域名如 cdn.您的域名.com）
     - 业务类型：图片小文件
     - 源站信息：
       - 源站类型：源站域名
       - 源站地址：ai-student2024.github.io
       - 端口：80
     - 加速区域：仅中国内地

4. 域名解析配置
   - 获取 CDN 提供的 CNAME 记录
   - 在域名解析设置中添加 CNAME 记录
   - 等待解析生效（通常几分钟到几小时）

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
│   ├── assets/            # 静态资源文件
│   │   ├── images/       # 图片资源
│   │   └── data/         # 数据文件
│   ├── components/        # 可复用组件
│   │   ├── header.html   # 页面头部组件
│   │   └── footer.html   # 页面底部组件
│   ├── pages/            # 页面组件
│   │   ├── overview.js   # 概览页面
│   │   ├── knowledge-graph.js  # 知识图谱页面
│   │   ├── document.js   # 文档管理页面
│   │   └── settings.js   # 设置页面
│   ├── scripts/          # JavaScript 脚本
│   │   ├── main.js      # 主入口文件
│   │   ├── graph.js     # 知识图谱相关功能
│   │   └── utils.js     # 工具函数
│   └── styles/           # 样式文件
│       └── main.css     # 主样式文件
├── public/               # 公共资源目录
│   └── index.html       # HTML 入口文件
├── dist/                # 构建输出目录
├── node_modules/        # 依赖包目录
├── vite.config.js       # Vite 配置文件
├── package.json         # 项目配置文件
├── README.md            # 项目说明文档
└── LICENSE             # 许可证文件
```

### 目录说明

1. `src/` - 源代码目录
   - `assets/`: 存放项目使用的静态资源
   - `components/`: 可复用的页面组件
   - `pages/`: 各个页面的具体实现
   - `scripts/`: JavaScript 脚本文件
   - `styles/`: CSS 样式文件

2. `public/` - 公共资源目录
   - 存放不需要打包的静态资源
   - 包含项目的 HTML 入口文件

3. `dist/` - 构建输出目录
   - 包含构建后的生产环境文件
   - 用于部署到服务器

### 核心文件说明

1. 配置文件
   - `vite.config.js`: Vite 构建工具配置
   - `package.json`: 项目依赖和脚本配置

2. 入口文件
   - `public/index.html`: 页面入口
   - `src/scripts/main.js`: JavaScript 入口

3. 组件文件
   - `components/header.html`: 导航栏组件
   - `components/footer.html`: 页脚组件

4. 页面文件
   - `pages/overview.js`: 项目概览页面
   - `pages/knowledge-graph.js`: 知识图谱展示
   - `pages/document.js`: 文档管理功能
   - `pages/settings.js`: 系统设置页面

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