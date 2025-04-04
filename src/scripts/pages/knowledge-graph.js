// 初始化知识图谱页面
export function init() {
    // 初始化导出图谱按钮
    const exportButton = document.querySelector('.export-graph');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            // TODO: 实现导出图谱功能
            console.log('导出图谱');
        });
    }

    // 初始化更新数据按钮
    const updateButton = document.querySelector('.update-data');
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            // TODO: 实现更新数据功能
            console.log('更新数据');
        });
    }

    // 初始化知识图谱
    initKnowledgeGraph();

    // 初始化筛选器
    initFilters();
}

// 初始化知识图谱
function initKnowledgeGraph() {
    console.log('开始初始化知识图谱...');
    
    // 检查容器是否存在
    const container = document.getElementById('knowledgeGraph');
    if (!container) {
        console.error('找不到知识图谱容器元素');
        return;
    }
    console.log('找到知识图谱容器');

    // 创建节点和边的数据
    const nodes = new vis.DataSet([
        { id: 1, label: '楼宇自动化系统', group: 'system', title: '楼宇自动化系统' },
        { id: 2, label: 'DDC控制器', group: 'device', title: 'DDC控制器' },
        { id: 3, label: '温度传感器', group: 'device', title: '温度传感器' },
        { id: 4, label: '湿度传感器', group: 'device', title: '湿度传感器' },
        { id: 5, label: '中央空调', group: 'device', title: '中央空调' },
        { id: 6, label: '安防监控系统', group: 'system', title: '安防监控系统' },
        { id: 7, label: '视频监控', group: 'device', title: '视频监控' },
        { id: 8, label: '门禁系统', group: 'device', title: '门禁系统' },
        { id: 9, label: '报警系统', group: 'device', title: '报警系统' }
    ]);

    const edges = new vis.DataSet([
        { from: 1, to: 2, label: '控制' },
        { from: 1, to: 3, label: '采集' },
        { from: 1, to: 4, label: '采集' },
        { from: 1, to: 5, label: '控制' },
        { from: 2, to: 3, label: '连接' },
        { from: 2, to: 4, label: '连接' },
        { from: 2, to: 5, label: '控制' },
        { from: 6, to: 7, label: '管理' },
        { from: 6, to: 8, label: '管理' },
        { from: 6, to: 9, label: '管理' }
    ]);

    console.log('节点和边数据创建完成');

    // 创建图谱配置
    const options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 12,
                color: '#000000'
            },
            borderWidth: 2
        },
        edges: {
            width: 2,
            font: {
                size: 10,
                align: 'middle'
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
            }
        },
        groups: {
            system: {
                color: { background: '#4F46E5', border: '#4338CA' },
                font: { color: '#FFFFFF' }
            },
            device: {
                color: { background: '#10B981', border: '#059669' },
                font: { color: '#FFFFFF' }
            }
        },
        physics: {
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200
        }
    };

    console.log('配置创建完成');

    // 创建图谱
    try {
        const data = {
            nodes: nodes,
            edges: edges
        };
        const network = new vis.Network(container, data, options);
        console.log('知识图谱创建成功');

        // 添加节点点击事件
        network.on('click', function(params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const node = nodes.get(nodeId);
                updateNodeDetails(node);
            }
        });
    } catch (error) {
        console.error('创建知识图谱时出错:', error);
    }
}

// 更新节点详情
function updateNodeDetails(node) {
    console.log('更新节点详情:', node);
    const detailsPanel = document.querySelector('.node-details');
    if (!detailsPanel) {
        console.error('找不到节点详情面板');
        return;
    }

    // 更新节点信息
    detailsPanel.innerHTML = `
        <div class="border-b pb-4">
            <div class="flex items-center mb-3">
                <div class="bg-blue-100 p-2 rounded-full mr-3">
                    <i class="fas fa-microchip text-blue-600"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">${node.label}</h4>
                    <p class="text-sm text-gray-500">${node.group === 'system' ? '系统节点' : '设备节点'}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <span class="text-gray-500">ID:</span>
                    <span class="text-gray-800">${node.id}</span>
                </div>
                <div>
                    <span class="text-gray-500">类型:</span>
                    <span class="text-gray-800">${node.group}</span>
                </div>
            </div>
        </div>
    `;
}

// 初始化筛选器
function initFilters() {
    console.log('初始化筛选功能');
    const checkboxes = document.querySelectorAll('.form-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('筛选条件改变:', this.checked);
        });
    });
}

// 页面加载完成后初始化
console.log('页面加载完成，开始初始化...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    initKnowledgeGraph();
    initFilters();
}); 