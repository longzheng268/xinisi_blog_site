---
title: KeymouseGo for UOS 20 (ARM64/Kirin 9000C/X11)
date: 2026-01-28
description: 基于 KeymouseGo v5.2.1 的 ARM64 适配版本，专为华为麒麟 9000C 处理器与 UOS 20 国产操作系统编译，支持 X11 环境下的键盘鼠标自动化操作。
cover: /images/keymousego/run-ui.png
categories:
  - 技术
tags:
  - 国产化
  - UOS
  - 自动化
  - ARM
  - KeymouseGo
---

## 项目概述

[KeymouseGo](https://github.com/taojy123/KeymouseGo) 是一款开源的键盘鼠标录制与回放工具，基于 Python 开发，采用 GPL-2.0 协议。原项目在 GitHub 上拥有 10.3k Star，支持 Windows、macOS 和 GNU/Linux 平台。

本版本为 **ARM64 架构的 UOS 20 适配编译版**，由 [longzheng268](https://github.com/longzheng268/KeymouseGo/releases/tag/v5.2.1-ARM64-UOS20) 基于 v5.2.1 源码编译发布，解决了国产化终端环境下 KeymouseGo 的兼容性问题。

## 适配环境

| 项目     | 详情                          |
| -------- | ----------------------------- |
| 操作系统 | UOS 20 (UnionTech OS)         |
| 架构     | ARM64 (AArch64)               |
| 处理器   | HUAWEI Kirin 9000C @ 2.188GHz |
| 显示协议 | X11                           |
| 基于版本 | KeymouseGo v5.2.1             |
| 发布日期 | 2026-01-24                    |

## 核心功能

### 录制模式

1. 点击 `录制` 按钮，开始录制
2. 在计算机上进行操作（鼠标点击、键盘输入），这些动作会被录制下来
3. 点击 `结束` 按钮，停止录制
4. 点击 `启动` 按钮，即可重复执行步骤 2 中录制的操作

录制结束后，脚本文件自动保存至 `scripts` 目录。

### 回放模式

直接指定脚本运行：

```bash
./KeymouseGo scripts/0314_1452.txt
```

指定重复次数（如 3 次）：

```bash
./KeymouseGo scripts/0314_1452.txt -rt 3
./KeymouseGo scripts/0314_1452.txt --runtimes 3
```

### 快捷键

| 快捷键 | 功能                         |
| ------ | ---------------------------- |
| `F6`   | 启动脚本（等同 `启动` 按钮） |
| `F9`   | 终止运行中的脚本             |

## 脚本语法

脚本采用 JSON5 格式，每个事件为一个 JSON 对象。屏幕分辨率基于 `1920 x 1080`：

```json
{
  "scripts": [
    // 延迟 3000ms，在屏幕坐标 (0.05208, 0.1852) 即 (100,200) 处 按下鼠标右键
    {
      "type": "event",
      "event_type": "EM",
      "delay": 3000,
      "action_type": "mouse right down",
      "action": ["0.05208%", "0.1852%"]
    },
    // 等待 50ms，在同位置 抬起鼠标右键
    // 当坐标为 [-1, -1] 时，表示在鼠标当前位置执行操作
    {
      "type": "event",
      "event_type": "EM",
      "delay": 50,
      "action_type": "mouse right up",
      "action": [-1, -1]
    },
    // 等待 1000ms，按下 f 键
    {
      "type": "event",
      "event_type": "EK",
      "delay": 1000,
      "action_type": "key down",
      "action": [70, "F", 0]
    },
    // 等待 50ms，抬起 f 键
    {
      "type": "event",
      "event_type": "EK",
      "delay": 50,
      "action_type": "key up",
      "action": [70, "F", 0]
    },
    // 等待 100ms，在屏幕坐标 (0.2604, 0.4630) 即 (500, 500) 处 按下鼠标左键
    {
      "type": "event",
      "event_type": "EM",
      "delay": 100,
      "action_type": "mouse left down",
      "action": ["0.2604%", "0.4630%"]
    },
    // 等待 100ms，将鼠标移动到坐标 (0.2604, 0.5556) 即 (500, 600) 位置
    {
      "type": "event",
      "event_type": "EM",
      "delay": 100,
      "action_type": "mouse move",
      "action": ["0.2604%", "0.5556%"]
    },
    // 等待 100ms，在屏幕坐标 (0.3125, 0.5556) 即 (600, 600) 处 抬起鼠标左键
    {
      "type": "event",
      "event_type": "EM",
      "delay": 100,
      "action_type": "mouse left up",
      "action": ["0.3125%", "0.5556%"]
    },
    // 等待 100ms，在当前位置输入 "hello world" 文字
    {
      "type": "event",
      "event_type": "EX",
      "delay": 100,
      "action_type": "input",
      "action": "hello world"
    }
  ]
}
```

**事件类型说明：**

| event_type | 含义                  | action 字段                       |
| ---------- | --------------------- | --------------------------------- |
| `EM`       | 鼠标事件 (Mouse)      | `[x, y]` 坐标，支持百分比或像素值 |
| `EK`       | 键盘事件 (Keyboard)   | `[键码, 键名, 修饰符]`            |
| `EX`       | 文本输入事件 (eXtend) | 输入的字符串内容                  |

**使用提示：**

- 重复执行次数设为 `0` 表示无限循环
- 录制时只录制键盘和鼠标操作，不会录制鼠标移动轨迹
- 坐标支持百分比模式（如 `"0.05208%"`），适配不同分辨率

## 下载地址

- **原项目地址**: [taojy123/KeymouseGo](https://github.com/taojy123/KeymouseGo)
- **ARM64 适配版**: [longzheng268 发布页](https://github.com/longzheng268/KeymouseGo/releases/tag/v5.2.1-ARM64-UOS20)
- **115网盘下载**: [传送门](https://115cdn.com/s/swfb23m368x?password=k0f5#) | 访问码: `k0f5`

## 环境截图

![软件运行界面](/images/keymousego/run-ui.png)

![设备信息](/images/keymousego/device-info.png)

![环境详情](/images/keymousego/env-detail.png)

## 常见问题

**Q: 为什么需要 ARM64 适配版？**
A: 原版 KeymouseGo 仅提供 x86_64 预编译包，在华为麒麟等 ARM 架构处理器上无法直接运行，需要从源码重新编译。

**Q: 支持 Wayland 吗？**
A: 目前仅支持 X11 显示协议。UOS 20 默认使用 X11，可正常使用。

**Q: 脚本可以手动编辑吗？**
A: 可以。脚本为 JSON5 文本格式，可参照上方语法说明手动修改坐标、延迟等参数。

---

**原作者**: taojy123 | [GitHub](https://github.com/taojy123/KeymouseGo)
**适配编译**: longzheng268 | [GitHub](https://github.com/longzheng268/KeymouseGo)
**开源协议**: GPL-2.0
