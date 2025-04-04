# ArchiMind 智能建筑知识管理系统

ArchiMind是一个基于Web的智能建筑知识管理系统，旨在帮助建筑管理人员更好地管理和利用建筑智能化系统的知识资源。

## 功能特点

- 项目概览：展示项目基本信息、系统状态和关键指标
- 知识图谱：可视化展示建筑智能化系统的知识结构
- 智能文档：集中管理各类技术文档、图纸和培训资料
- 智能问答：基于知识库的智能问答系统

## 技术栈

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Node.js (构建工具)

## 开发环境要求

- Node.js 14.0.0 或更高版本
- npm 6.0.0 或更高版本

## 安装步骤

1. 克隆项目到本地：
```bash
git clone https://github.com/your-username/archimind.git
cd archimind
```

2. 安装依赖：
```bash
npm install
```

## 使用方法

### 开发模式
```bash
npm run dev
```
这将启动开发服务器，自动打开浏览器并监听文件变化。

### 构建项目
```bash
npm run build
```
这将生成优化后的生产版本到`build`目录。

### 运行生产版本
```bash
npm start
```
这将启动服务器并运行构建后的版本。

## 项目结构

```
ArchiMind/
├── src/                # 源代码目录
│   ├── components/     # 组件文件
│   ├── pages/         # 页面文件
│   ├── scripts/       # JavaScript文件
│   ├── styles/        # 样式文件
│   └── index.html     # 主HTML文件
├── build/             # 构建输出目录
├── build.js           # 构建脚本
├── package.json       # 项目配置
└── README.md          # 项目说明
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件 