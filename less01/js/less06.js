"use strict";
console.log("0xFF << 16 十六进制转二进制向左位移16位", (0xFF << 16).toString(2));
console.log("0xFF << 16 与 0x55 << 8 合并对比", (0xFF << 16).toString(2), (0x55 << 8).toString(2), (0xFF << 16 | 0x55 << 8).toString(2));
console.log("十六进制颜色转二进制", (0xFF55F3).toString(2));
console.log("0xFF55F3 >> 16 十六进制转二进制向右位移16位 得到红色", (0xFF55F3 >> 16 & 0xFF).toString(2));
console.log("0xFF55F3 >> 8 十六进制转二进制向右位移8位 得到绿色", (0xFF55F3 >> 8 & 0xFF).toString(2));
console.log("0xFF55F3  十六进制转二进制 得到蓝色", (0xFF55F3 & 0xFF).toString(2));