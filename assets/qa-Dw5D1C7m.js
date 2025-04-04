function d(){const t=document.querySelector(".view-history");t&&t.addEventListener("click",()=>{console.log("查看历史记录")});const e=document.querySelector(".update-knowledge");e&&e.addEventListener("click",()=>{console.log("更新知识库")}),r(),u(),l()}function r(){document.querySelectorAll(".faq-button").forEach(e=>{e.addEventListener("click",()=>{const n=e.textContent;c(n)})})}function u(){const t=document.querySelector(".chat-input"),e=document.querySelector(".send-button"),n=document.querySelector(".chat-history");t&&e&&n&&(e.addEventListener("click",()=>{const o=t.value.trim();o&&(c(o),t.value="")}),t.addEventListener("keypress",o=>{if(o.key==="Enter"){const s=t.value.trim();s&&(c(s),t.value="")}}))}function c(t){document.querySelector(".chat-history")&&(i("user",t),setTimeout(()=>{const n=a(t);i("system",n)},1e3))}function i(t,e){const n=document.querySelector(".chat-history");if(!n)return;const o=document.createElement("div");o.className=`flex ${t==="user"?"justify-end":"justify-start"} mb-4`;const s=document.createElement("div");s.className=`max-w-[70%] rounded-lg p-4 ${t==="user"?"bg-blue-500 text-white":"bg-gray-100 text-gray-800"}`,s.textContent=e,o.appendChild(s),n.appendChild(o),n.scrollTop=n.scrollHeight}function a(t){return{"BA系统如何设置温度控制？":`设置温度控制的步骤如下：
1. 登录BA系统管理界面
2. 进入温度控制模块
3. 选择需要设置的区域
4. 设置目标温度值
5. 保存设置`,"安防系统报警如何处理？":`处理安防系统报警的步骤：
1. 确认报警类型和位置
2. 查看监控画面
3. 联系相关人员
4. 记录处理过程
5. 解除报警状态`,"综合布线系统如何测试？":`综合布线系统测试步骤：
1. 使用测试仪检查线路
2. 测试信号传输质量
3. 检查连接器状态
4. 记录测试结果
5. 修复发现的问题`,"音视频系统如何调试？":`音视频系统调试步骤：
1. 检查设备连接
2. 测试音频输出
3. 测试视频显示
4. 调整音视频参数
5. 保存调试设置`}[t]||"抱歉，我暂时无法回答这个问题。"}function l(){console.log("初始化统计图表")}export{d as init};
