# ArchiMind 重构规范文档

## 1. 重构目标
- 提升代码质量和可维护性
- 优化用户体验和界面设计
- 增强系统性能和稳定性
- 完善功能模块和业务逻辑

## 2. 重构原则
- **渐进式重构**：小步快跑，确保每个改动都是可回滚的
- **功能优先**：保持现有功能正常运行
- **测试驱动**：重要功能需有测试用例
- **文档同步**：代码改动需同步更新文档
- **性能监控**：关注关键性能指标

## 3. 沟通规范

### 3.1 会话标记
| 标记类型 | 格式 | 示例 | 说明 | 沟通示例 |
|---------|------|------|------|----------|
| 模块开始 | [重构-模块名] | [重构-导航栏] | 开始新的模块重构 | 用户：`[重构-导航栏] 我想重构导航栏，主要改进响应式布局和交互体验`<br>AI：`好的，让我们先分析当前导航栏的实现...` |
| 子任务 | [任务-模块名-子任务] | [任务-导航栏-响应式] | 模块内的具体任务 | 用户：`[任务-导航栏-响应式] 需要优化移动端的导航菜单`<br>AI：`建议使用媒体查询和汉堡菜单实现...` |
| 继续会话 | [继续-模块名] | [继续-导航栏] | 继续之前的模块重构 | 用户：`[继续-导航栏] 我们继续昨天的导航栏重构`<br>AI：`好的，上次我们完成了响应式布局，今天继续优化交互...` |
| 状态更新 | [状态-模块名-状态] | [状态-导航栏-完成] | 更新模块状态 | 用户：`[状态-导航栏-完成] 导航栏重构已完成，请检查`<br>AI：`已检查，功能正常，建议添加单元测试...` |
| 问题讨论 | [问题-模块名-问题类型] | [问题-导航栏-性能] | 讨论特定问题 | 用户：`[问题-导航栏-性能] 导航栏在低端设备上有卡顿`<br>AI：`建议优化动画效果和减少DOM操作...` |
| 技术决策 | [决策-模块名-决策点] | [决策-导航栏-状态管理] | 记录重要决策 | 用户：`[决策-导航栏-状态管理] 使用Redux还是Context API？`<br>AI：`考虑到导航状态较简单，建议使用Context API...` |

### 3.2 状态标记
| 状态 | 说明 | 使用场景 | 沟通示例 |
|------|------|----------|----------|
| [进行中] | 当前正在进行的任务 | 任务执行中 | 用户：`[状态-导航栏-进行中] 正在实现响应式布局`<br>AI：`好的，需要我协助解决什么问题吗？` |
| [待确认] | 需要确认的设计或实现 | 等待反馈 | 用户：`[状态-导航栏-待确认] 这是新的导航栏设计，请确认`<br>AI：`设计符合规范，但建议调整间距...` |
| [完成] | 任务已完成 | 任务结束 | 用户：`[状态-导航栏-完成] 导航栏重构完成`<br>AI：`已验收，可以开始下一个模块` |
| [暂停] | 任务暂时停止 | 需要等待其他条件 | 用户：`[状态-导航栏-暂停] 等待设计稿确认`<br>AI：`好的，我们可以先处理其他任务` |
| [阻塞] | 任务被阻塞 | 存在依赖问题 | 用户：`[状态-导航栏-阻塞] 依赖的UI组件库有bug`<br>AI：`建议先使用替代方案或等待修复` |
| [取消] | 任务被取消 | 需求变更或技术限制 | 用户：`[状态-导航栏-取消] 需求变更，取消当前方案`<br>AI：`好的，我们重新评估新需求` |

## 4. 模块划分

### 4.1 前端模块
| 模块名 | 子模块 | 说明 | 优先级 | 相关文件 |
|--------|--------|------|--------|----------|
| 导航栏 | 顶部导航 | 包含logo、主导航菜单 | P0 | `src/components/Navigation/` |
| | 用户菜单 | 用户头像、下拉菜单 | P1 | `src/components/UserMenu/` |
| | 搜索框 | 全局搜索入口 | P1 | `src/components/SearchBar/` |
| | 移动端菜单 | 响应式汉堡菜单 | P1 | `src/components/MobileMenu/` |
| 首页 | 头部区域 | 欢迎语、快速入口 | P0 | `src/pages/Home/Header/` |
| | 内容区域 | 主要内容展示 | P0 | `src/pages/Home/Content/` |
| | 侧边栏 | 快捷操作、推荐内容 | P1 | `src/pages/Home/Sidebar/` |
| 知识图谱 | 图谱容器 | 图谱画布、缩放控制 | P0 | `src/components/Graph/Container/` |
| | 节点组件 | 知识节点展示 | P1 | `src/components/Graph/Node/` |
| | 连线组件 | 节点关系连线 | P1 | `src/components/Graph/Edge/` |
| | 工具栏 | 图谱操作工具 | P1 | `src/components/Graph/Toolbar/` |
| 搜索功能 | 搜索框 | 搜索输入框组件 | P0 | `src/components/Search/Input/` |
| | 搜索结果 | 搜索结果列表 | P1 | `src/components/Search/Results/` |
| | 搜索建议 | 搜索建议下拉 | P1 | `src/components/Search/Suggestions/` |
| | 高级搜索 | 高级搜索面板 | P2 | `src/components/Search/Advanced/` |
| 用户中心 | 个人信息 | 用户资料展示 | P1 | `src/pages/User/Profile/` |
| | 收藏管理 | 收藏内容管理 | P1 | `src/pages/User/Favorites/` |
| | 历史记录 | 浏览历史记录 | P2 | `src/pages/User/History/` |
| | 消息中心 | 系统消息通知 | P2 | `src/pages/User/Messages/` |
| 设置页面 | 基本设置 | 基础配置选项 | P2 | `src/pages/Settings/Basic/` |
| | 主题设置 | 界面主题配置 | P2 | `src/pages/Settings/Theme/` |
| | 通知设置 | 消息通知配置 | P2 | `src/pages/Settings/Notifications/` |
| 公共组件 | 按钮组件 | 通用按钮组件 | P0 | `src/components/Common/Button/` |
| | 表单组件 | 通用表单组件 | P0 | `src/components/Common/Form/` |
| | 弹窗组件 | 通用弹窗组件 | P0 | `src/components/Common/Modal/` |
| | 加载组件 | 加载状态组件 | P1 | `src/components/Common/Loading/` |
| | 提示组件 | 消息提示组件 | P1 | `src/components/Common/Toast/` |
| 布局组件 | 页面布局 | 基础页面布局 | P0 | `src/layouts/` |
| | 网格系统 | 响应式网格 | P0 | `src/layouts/Grid/` |
| | 侧边栏 | 通用侧边栏 | P1 | `src/layouts/Sidebar/` |
| | 页脚 | 通用页脚组件 | P1 | `src/layouts/Footer/` |

### 4.2 后端模块
| 模块名 | 说明 | 优先级 |
|--------|------|--------|
| API接口 | 接口规范和实现 | P0 |
| 数据模型 | 数据库设计和ORM | P1 |
| 认证授权 | 用户认证和权限 | P1 |
| 缓存系统 | 数据缓存策略 | P2 |
| 日志系统 | 操作日志记录 | P2 |

## 5. 技术规范

### 5.1 代码规范
- 遵循 ESLint 配置
- 使用 TypeScript 进行类型检查
- 组件化开发，遵循单一职责原则
- 使用函数式组件和 Hooks
- 统一的代码风格和命名规范

### 5.2 文档规范
- 每个模块需有 README.md
- 重要函数需有 JSDoc 注释
- 复杂逻辑需有流程图或说明
- 更新日志需记录重要改动

### 5.3 测试规范
- 单元测试覆盖率 > 80%
- 关键功能需有集成测试
- 使用 Jest 作为测试框架
- 测试用例需包含边界条件

## 6. 版本控制

### 6.1 分支管理
| 分支类型 | 命名规范 | 用途 |
|---------|---------|------|
| 主分支 | main | 生产环境 |
| 开发分支 | develop | 开发环境 |
| 功能分支 | feature/* | 新功能开发 |
| 修复分支 | hotfix/* | 紧急修复 |
| 发布分支 | release/* | 版本发布 |

### 6.2 提交规范
| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat: 添加用户登录功能 |
| fix | 修复bug | fix: 修复导航栏样式问题 |
| docs | 文档更新 | docs: 更新API文档 |
| style | 代码格式 | style: 格式化代码 |
| refactor | 重构代码 | refactor: 重构导航栏组件 |
| test | 测试相关 | test: 添加用户登录测试 |
| chore | 构建过程 | chore: 更新依赖包 |

### 6.3 Git Flow 工作流程

#### 6.3.1 功能开发流程
1. **准备工作**
   ```bash
   # 切换到develop分支并更新
   git checkout develop
   git pull origin develop
   
   # 创建新的功能分支
   git checkout -b feature/功能名称
   ```

2. **开发过程**
   ```bash
   # 查看工作区状态
   git status
   
   # 查看代码改动
   git diff
   
   # 添加改动到暂存区
   git add .
   
   # 提交改动
   git commit -m "feat: 功能描述"
   ```

3. **功能完成后**
   ```bash
   # 切换到develop分支
   git checkout develop
   git pull origin develop
   
   # 合并功能分支
   git merge feature/功能名称
   
   # 推送到远程
   git push origin develop
   ```

4. **清理工作**
   ```bash
   # 删除本地功能分支
   git branch -d feature/功能名称
   
   # 删除远程功能分支
   git push origin --delete feature/功能名称
   ```

#### 6.3.2 部署流程
1. **开发环境部署**
   ```bash
   # 确保develop分支最新
   git checkout develop
   git pull origin develop
   
   # 运行测试
   npm run test
   
   # 本地验证
   npm run dev
   ```

2. **生产环境部署**
   ```bash
   # 合并到main分支
   git checkout main
   git pull origin main
   git merge develop
   
   # 创建版本标签
   git tag -a v版本号 -m "版本描述"
   git push origin v版本号
   
   # 推送到远程
   git push origin main
   
   # 执行部署脚本
   bash deploy-all.sh
   ```

#### 6.3.3 注意事项
- 每个功能分支应该只包含一个功能或修复
- 合并前必须先更新目标分支
- 合并后及时清理已完成的功能分支
- 部署前必须完成充分的测试
- 保持commit信息清晰和规范
- 定期清理过时的分支和标签

#### 6.3.4 常见问题处理
1. **合并冲突**
   ```bash
   # 解决冲突后
   git add .
   git commit -m "fix: 解决合并冲突"
   ```

2. **回滚操作**
   ```bash
   # 回滚到指定提交
   git reset --hard 提交ID
   
   # 回滚最近一次提交
   git reset --soft HEAD^
   ```

3. **暂存修改**
   ```bash
   # 暂存当前修改
   git stash
   
   # 恢复暂存的修改
   git stash pop
   ```

## 7. 进度追踪

### 7.1 任务看板
使用 GitHub Projects 或类似工具追踪任务进度：
- To Do: 待办任务
- In Progress: 进行中
- Review: 代码审查
- Done: 已完成

### 7.2 每日更新
每天结束时更新：
- 完成的任务
- 遇到的问题
- 下一步计划

## 8. 风险管理

### 8.1 风险评估
| 风险类型 | 影响程度 | 应对策略 |
|---------|---------|---------|
| 技术风险 | 高 | 技术预研和原型验证 |
| 进度风险 | 中 | 合理规划和及时调整 |
| 质量风险 | 高 | 代码审查和测试覆盖 |
| 兼容性风险 | 中 | 多环境测试和降级方案 |

### 8.2 应急预案
- 代码回滚机制
- 数据备份策略
- 问题响应流程
- 紧急修复流程 