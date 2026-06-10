---
title: 脑成像科研党福利：Debian 12 ARM64 手动编译 AFNI/SUMA 笔记 (适配 macOS Tahoe)
date: 2026-03-15
description: Debian 12 ARM64 手动编译 AFNI/SUMA 笔记，适配 macOS Tahoe，从源码编译到环境配置全流程。
cover: /images/afni/test-run.png
categories:
  - 技术
---

# 脑成像科研党福利：Debian 12 ARM64 手动编译 AFNI/SUMA 笔记 (适配 macOS Tahoe)

### 0x00 前言

最近 macOS 26 (Tahoe) 发布后，AFNI 官方针对 Liquid Glass 带来的 XQuartz 兼容性问题做了大量修复。虽然官方提供了 `@update.afni.binaries` 的建议，但对于追求极致稳定，或需要在 ARM 虚拟机（Parallels/UTM）中跑 Debian 环境的同学来说，官方预编译包的缺失依然是个硬伤。

另外，很多同学尝试在 Apple Silicon 上通过 Rosetta 跑 x86_64 版的 Ubuntu 环境，但实测会遇到严重的隔离问题。例如在 Rosetta 下：

```bash
# 必须使用极简环境才能启动，但会导致无法访问共享文件夹
env -i DISPLAY=:0 PATH=$HOME/abin:/usr/bin:/bin LIBGL_ALWAYS_SOFTWARE=1 ~/abin/suma

```

这种方式虽然能点亮 SUMA，但**没法读取 /media/psf/ 等共享文件夹**，对于动辄几百 GB 的科研数据来说非常痛苦。为此，我折腾了两天在 **Debian 12 ARM64** 原生环境下完成了从源码编译 AFNI & SUMA，特此分享

### 0x01 运行实测与系统环境

- **运行实测**

![运行实测](/images/afni/test-run.png)

- **宿主机**: macOS 26 (Tahoe) - Apple Silicon

![宿主机环境](/images/afni/host-env.png)

- **虚拟机**: Debian GNU/Linux 12 (bookworm) ARM64

![虚拟机环境](/images/afni/vm-env.png)

目前测试 DTI 追踪和基础 GUI 功能均正常，联动非常顺滑：

### 0x02 为什么要折腾这个？

1. **规避宿主机 Bug**：
   虽然官方在 Tahoe 上努力修复了 GUI 问题，但目前调整窗口大小时偶发的黑屏 Bug 依然存在。在虚拟机里跑一个原生编译、针对 ARM 指令集优化的二进制版本，不仅能规避宿主机的系统层级显示干扰，还能利用虚拟机隔离环境进行大规模数据批处理，对科研生产力是极大的释放。

2. **Rosetta 仿真的局限**：
   在 Apple Silicon 虚拟机中通过 Rosetta 跑 x86_64 版本的 AFNI 时，为了能正常启动 SUMA，往往需要极度精简的环境变量（如 `env -i`）。

- **痛点**：虽然能启动，但由于环境被隔离，**无法读取宿主机的共享文件夹**（如 `/media/psf/`），这对需要处理大量外部硬盘数据的科研工作来说几乎是致命的。
- **原生优势**：原生 ARM64 编译版无需复杂的 `env` 隔离，完美支持挂载共享文件夹，实现数据流的无缝处理

### 0x03 核心踩坑与心得

- **GLIB 路径地狱**：在 aarch64 下，`glibconfig.h` 的位置和传统的 x86 差异很大。编译时必须显式导出 `CPATH`，否则 `SUMA_gts` 会报错死在第一步。
- **依赖补全**：除了常规的 Motif，`libxi-dev` 和 `libxdevice-dev` 是在虚拟机里搞定 X11 转发的关键，少一个都会导致二进制文件无法生成。
- **R 环境陷阱**：别用 AFNI 自带的脚本去跑 R 包源码编译，ARM 下直接 `apt install r-cran-tidyverse` 等二进制包才是正解，能省去数小时的编译报错。
- **去油脂模式**：针对虚拟机环境，建议在 `.sumarc` 里强行开启 `SUMA_NoFancyStuff=YES`。实测在 X11 转发下，这样能极大减少由于 GPU 驱动兼容性导致的图形卡死。

### 0x04 成果分享

我已经将针对 Debian 12 ARM64 优化的 Release 同步到了 GitHub，包含了一键编译脚本和预编译的二进制包，希望能给同样在 Apple Silicon 上做脑成像分析的同学省点时间。

- **项目地址**: [longzheng268/afni-gnu-linux-arm64](https://github.com/longzheng268/afni-gnu-linux-arm64/tree/gnu-linux-arm64)
- **分支**: `gnu-linux-arm64`

### 0x05 交流

向所有在 macOS 26 环境下克服 Xquartz 破碎问题的探险家致敬。如果你有更好的 ARM 架构优化参数，欢迎一起讨论。
