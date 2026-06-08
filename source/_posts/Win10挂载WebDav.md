---
title: Win10挂载WebDav
date: 2025-10-24 11:41:46
categories:
  - 网络
---

正常在windows中操作挂载webdav时，无论是网络驱动器映射，还是添加网络位置，都会出现无法访问，文件无效等报错，这是因为windows默认WebClient服务仅支持https协议，当前所使用的http协议是不支持的。

如果你坚持使用http协议的webdav，可以通过修改注册表重启WebClient服务方式，但是windows默认的挂载webdav并不是很好用，或多或少会有些兼容性等问题，所以推荐使用RaiDrive（这也是synology推荐的方式，参见[官方文档](https://kb.synology.com/en-global/DSM/tutorial/How_to_access_files_on_Synology_NAS_with_WebDAV)）。

兼容http协议方法如下：

win+r输入regedit打开注册表编辑器

计算机 `\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`

将BasicAuthLevel数值改为 `2`。

![注册表修改](http://doc.lz-0315.com/wp-content/uploads/2025/10/image.png)

重启WebClient服务

打开services.msc，找到WebClient，右键"重新启动"。

![重启服务](http://doc.lz-0315.com/wp-content/uploads/2025/10/image-1.png)

重启完成后，就可以实现http方式进行挂载了

网络驱动器映射挂载

注：网络驱动器映射挂载后，磁盘空间信息显示的是和当前c盘一样的。

![网络驱动器映射](http://doc.lz-0315.com/wp-content/uploads/2025/10/image-2-1024x608.png)

最终挂载磁效果：

![挂载效果](http://doc.lz-0315.com/wp-content/uploads/2025/10/image-4-1024x609.png)

网络位置挂载：

![网络位置挂载](http://doc.lz-0315.com/wp-content/uploads/2025/10/image-3-1024x612.png)

本人辛巳资源站的WebDav地址为：`http://download.clouddisk.lz-0315.com:12440/dav`，账号和密码皆为 `guest`。

其中，辛巳资源镜像站地址为：[http://download.clouddisk.lz-0315.com:12440](http://download.clouddisk.lz-0315.com:12440)。
