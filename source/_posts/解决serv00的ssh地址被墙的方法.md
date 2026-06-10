---
title: 解决 Serv00 的 SSH 地址被墙的方法
date: 2025-10-25
description: Serv00 的 SSH 地址在国内被墙？使用 CNAME 大法轻松解决，无需代理即可正常连接。
cover: /images/serv00/serv00_logo.png
categories:
  - 技术
---

## 问题描述

Serv00 是一个免费的 FreeBSD 主机服务，但其 SSH 地址在国内经常被墙，导致无法直接连接。

## 解决方案：CNAME 大法

使用 CNAME 记录将被墙的域名指向可用的缓存节点，即可绕过封锁。

### 操作步骤

1. 登录你的域名 DNS 管理面板
2. 添加一条 CNAME 记录：
   - **主机记录**：你想要的子域名（如 `ssh`）
   - **记录类型**：CNAME
   - **记录值**：`cache{N}.serv00.com`（N 对应面板编号）

### 对应关系

| 面板地址              | CNAME 目标            |
| --------------------- | --------------------- |
| `panel7.serv00.com`   | `cache7.serv00.com`   |
| `panel8.serv00.com`   | `cache8.serv00.com`   |
| `panel{N}.serv00.com` | `cache{N}.serv00.com` |

面板编号是几，cache 后面就填几。

### 配置示例

![CNAME 示例](/images/serv00/CNAME_example.png)

如图所示配置即可。

## 验证

配置完成后，使用新设置的域名连接 SSH：

```bash
ssh user@your-subdomain.your-domain.com
```

如果能正常连接，说明 CNAME 生效了。
