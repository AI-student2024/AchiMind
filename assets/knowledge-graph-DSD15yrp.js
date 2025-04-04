function u(){const e=document.querySelector(".export-graph");e&&e.addEventListener("click",()=>{console.log("导出图谱")});const o=document.querySelector(".update-data");o&&o.addEventListener("click",()=>{console.log("更新数据")}),n(),s()}function n(){console.log("开始初始化知识图谱...");const e=document.getElementById("knowledgeGraph");if(!e){console.error("找不到知识图谱容器元素");return}console.log("找到知识图谱容器");const o=new vis.DataSet([{id:1,label:"楼宇自动化系统",group:"system",title:"楼宇自动化系统"},{id:2,label:"DDC控制器",group:"device",title:"DDC控制器"},{id:3,label:"温度传感器",group:"device",title:"温度传感器"},{id:4,label:"湿度传感器",group:"device",title:"湿度传感器"},{id:5,label:"中央空调",group:"device",title:"中央空调"},{id:6,label:"安防监控系统",group:"system",title:"安防监控系统"},{id:7,label:"视频监控",group:"device",title:"视频监控"},{id:8,label:"门禁系统",group:"device",title:"门禁系统"},{id:9,label:"报警系统",group:"device",title:"报警系统"}]),i=new vis.DataSet([{from:1,to:2,label:"控制"},{from:1,to:3,label:"采集"},{from:1,to:4,label:"采集"},{from:1,to:5,label:"控制"},{from:2,to:3,label:"连接"},{from:2,to:4,label:"连接"},{from:2,to:5,label:"控制"},{from:6,to:7,label:"管理"},{from:6,to:8,label:"管理"},{from:6,to:9,label:"管理"}]);console.log("节点和边数据创建完成");const r={nodes:{shape:"dot",size:20,font:{size:12,color:"#000000"},borderWidth:2},edges:{width:2,font:{size:10,align:"middle"},arrows:{to:{enabled:!0,scaleFactor:.5}}},groups:{system:{color:{background:"#4F46E5",border:"#4338CA"},font:{color:"#FFFFFF"}},device:{color:{background:"#10B981",border:"#059669"},font:{color:"#FFFFFF"}}},physics:{stabilization:!1,barnesHut:{gravitationalConstant:-8e4,springConstant:.001,springLength:200}},interaction:{hover:!0,tooltipDelay:200}};console.log("配置创建完成");try{const t={nodes:o,edges:i},c=new vis.Network(e,t,r);console.log("知识图谱创建成功"),c.on("click",function(l){if(l.nodes.length>0){const a=l.nodes[0],d=o.get(a);g(d)}})}catch(t){console.error("创建知识图谱时出错:",t)}}function g(e){console.log("更新节点详情:",e);const o=document.querySelector(".node-details");if(!o){console.error("找不到节点详情面板");return}o.innerHTML=`
        <div class="border-b pb-4">
            <div class="flex items-center mb-3">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                    <i class="fas fa-microchip text-blue-600"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">${e.label}</h4>
                    <p class="text-sm text-gray-500">${e.group==="system"?"系统节点":"设备节点"}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <span class="text-gray-500">ID:</span>
                    <span class="text-gray-800">${e.id}</span>
                </div>
                <div>
                    <span class="text-gray-500">类型:</span>
                    <span class="text-gray-800">${e.group}</span>
                </div>
            </div>
        </div>
    `}function s(){console.log("初始化筛选功能"),document.querySelectorAll(".form-checkbox").forEach(o=>{o.addEventListener("change",function(){console.log("筛选条件改变:",this.checked)})})}console.log("页面加载完成，开始初始化...");document.addEventListener("DOMContentLoaded",function(){console.log("DOM加载完成"),n(),s()});export{u as init};
