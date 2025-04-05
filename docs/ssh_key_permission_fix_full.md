# 🧠 Windows SSH私钥权限错误解决手册

> 适用于：VSCode / Cursor Remote-SSH 插件连接 Linux 服务器，私钥报错 "UNPROTECTED PRIVATE KEY FILE"

---

## 📌 场景说明

- **本地系统**：Windows 11
- **连接方式**：Remote-SSH（例如 VSCode / Cursor）
- **问题表现**：连接失败，提示如下：

```bash
WARNING: UNPROTECTED PRIVATE KEY FILE!
Permissions for 'xxx.pem' are too open.
This private key will be ignored.
Permission denied (publickey,...)
```

---

## ✅ 解决方案（建议收藏）

### 🛠 步骤一：进入私钥目录

```powershell
cd "D:\路径\到\你的私钥目录"
```

### 🛠 步骤二：移除继承权限

```powershell
icacls "你的私钥文件.pem" /inheritance:r
```

### 🛠 步骤三：移除组用户权限

```powershell
icacls "你的私钥文件.pem" /remove:g "Authenticated Users" "Users" "Everyone"
```

### 🛠 步骤四：仅赋予当前用户读取权限

```powershell
icacls "你的私钥文件.pem" /grant:r "${env:USERNAME}:(R)"
```

### 🛠 步骤五：移除 SYSTEM 和管理员权限（重点）

```powershell
icacls "你的私钥文件.pem" /remove "BUILTIN\Administrators"
icacls "你的私钥文件.pem" /remove "NT AUTHORITY\SYSTEM"
```

### ✅ 权限最终检查

```powershell
icacls "你的私钥文件.pem"
```

应只显示：

```plaintext
你的私钥文件.pem  <当前用户名>:(R)
```

---

## ✅ 测试连接

```bash
ssh -i D:\路径\archimind-beian.pem root@<远程IP>
```

或在 Cursor / VSCode 中点击对应配置项连接。

---

## 📁 配置示例（~/.ssh/config）

```ssh
Host archimind-ecs
  HostName 8.141.95.87
  User root
  IdentityFile D:\AgentsDEV\aliyun-ecskey\archimind-beian.pem
```

---

## 🧯 遇到“过程试图写入的管道不存在”？

这是连接中断的衍生报错，不是主因。只要私钥权限正确，自动消失。

---

## ✅ 附加建议

- 不要用 `.ppk` 格式，尽量使用原始 `.pem` 文件
- 若你使用了 Windows 的 WSL 或 Git Bash，请使用 Linux 风格路径，例如：`/mnt/d/AgentsDEV/...`
- 确保远程服务器的 22 端口开放

---

## 🧠 总结口诀：

> SSH不连先查pem，  
> 权限过宽它就怼；  
> 用户只读才安全，  
> SYSTEM管理员统统滚 ✊

---

文档整理：全球知名远程连接专家 @ChatGPT

更新时间：2025 年 4 月
