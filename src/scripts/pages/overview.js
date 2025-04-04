// 初始化概览页面
let pageInitialized = false;
let currentNetwork = null;

export async function init(isProjectChange = false, projectData = null) {
    console.log('Initializing overview page', isProjectChange ? '(project change)' : '');
    
    try {
        // 初始化导出报告按钮
        const exportButton = document.querySelector('.export-report');
        if (exportButton && !isProjectChange) {
            exportButton.addEventListener('click', () => {
                console.log('Export report clicked');
            });
        }

        // 初始化更新知识库按钮
        const updateButton = document.querySelector('.update-knowledge');
        if (updateButton && !isProjectChange) {
            updateButton.addEventListener('click', () => {
                console.log('Update knowledge clicked');
            });
        }

        // 初始化知识图谱预览
        await initKnowledgeGraphPreview(projectData);

        // 初始化项目统计
        if (!isProjectChange) {
            initProjectStats();
        }

        // 标记页面已初始化
        pageInitialized = true;
        console.log('Overview page initialization completed');
    } catch (error) {
        console.error('Error initializing overview page:', error);
        throw error;
    }
}

// 初始化知识图谱预览
async function initKnowledgeGraphPreview(projectData = null) {
    console.log('Initializing knowledge graph preview');
    
    try {
        // 获取图谱容器
        const graphContainer = document.querySelector('.knowledge-graph-preview');
        if (!graphContainer) {
            console.error('Knowledge graph container not found');
            return;
        }
        console.log('Found graph container:', graphContainer);

        // 检查vis.js是否正确加载
        if (typeof vis === 'undefined') {
            console.error('vis.js is not loaded');
            return;
        }
        console.log('vis.js is loaded');

        // 如果存在旧的网络实例，销毁它
        if (currentNetwork) {
            currentNetwork.destroy();
            currentNetwork = null;
        }

        // 设置容器样式
        graphContainer.style.border = '1px solid #ddd';
        graphContainer.style.backgroundColor = '#ffffff';

        // 根据当前选中的项目获取节点数据
        const selectedProject = localStorage.getItem('selectedProject') || '上海金融中心智能化项目';
        console.log('Selected project:', selectedProject);

        const nodeData = getProjectNodes(selectedProject);
        const edgeData = getProjectEdges(selectedProject);
        console.log('Node data:', nodeData);
        console.log('Edge data:', edgeData);

        const nodes = new vis.DataSet(nodeData);
        const edges = new vis.DataSet(edgeData);

        // 配置选项
        const options = {
            nodes: {
                shape: 'dot',
                size: 30,
                font: {
                    size: 16,
                    color: '#333',
                    face: 'Arial'
                },
                borderWidth: 2,
                shadow: true,
                color: {
                    border: '#2B7CE9',
                    background: '#97C2FC'
                }
            },
            edges: {
                width: 2,
                color: {
                    color: '#848484',
                    highlight: '#848484',
                    hover: '#848484'
                },
                arrows: {
                    to: { enabled: true, scaleFactor: 0.5 }
                },
                smooth: {
                    type: 'continuous'
                }
            },
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.3,
                    springLength: 200,
                    springConstant: 0.04,
                    damping: 0.09
                },
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 100
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 200,
                zoomView: true,
                dragView: true
            },
            layout: {
                randomSeed: 2
            }
        };

        console.log('Creating network with options:', options);

        // 创建网络
        currentNetwork = new vis.Network(graphContainer, { nodes, edges }, options);
        
        // 等待网络稳定
        currentNetwork.once('stabilizationIterationsDone', () => {
            console.log('Knowledge graph stabilized');
            currentNetwork.fit(); // 自动调整视图以显示所有节点
        });

        // 添加事件监听器
        currentNetwork.on('click', function(params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const node = nodes.get(nodeId);
                console.log('Clicked node:', node);
            }
        });

        console.log('Knowledge graph preview initialization completed');
    } catch (error) {
        console.error('Error initializing knowledge graph preview:', error);
        throw error;
    }
}

// 获取项目节点数据
function getProjectNodes(projectName) {
    // 根据项目名称返回不同的节点数据
    const nodeData = {
        '上海金融中心智能化项目': [
            { id: 1, label: 'BA系统', group: 'system', color: { background: '#97C2FC', border: '#2B7CE9' } },
            { id: 2, label: 'DDC控制器', group: 'device', color: { background: '#FFB1B1', border: '#E04141' } },
            { id: 3, label: '操作手册', group: 'document', color: { background: '#B1FFB1', border: '#41E041' } },
            { id: 4, label: '温度传感器', group: 'device', color: { background: '#FFB1B1', border: '#E04141' } },
            { id: 5, label: '照明控制', group: 'system', color: { background: '#97C2FC', border: '#2B7CE9' } }
        ],
        '北京中心大厦智能化项目': [
            { id: 1, label: '安防系统', group: 'system', color: { background: '#97C2FC', border: '#2B7CE9' } },
            { id: 2, label: '监控设备', group: 'device', color: { background: '#FFB1B1', border: '#E04141' } },
            { id: 3, label: '技术文档', group: 'document', color: { background: '#B1FFB1', border: '#41E041' } },
            { id: 4, label: '门禁系统', group: 'system', color: { background: '#97C2FC', border: '#2B7CE9' } },
            { id: 5, label: '读卡器', group: 'device', color: { background: '#FFB1B1', border: '#E04141' } }
        ]
    };
    return nodeData[projectName] || nodeData['上海金融中心智能化项目'];
}

// 获取项目边数据
function getProjectEdges(projectName) {
    // 所有项目使用相同的边结构，但可以根据需要自定义
    return [
        { from: 1, to: 2, label: '控制', arrows: 'to' },
        { from: 2, to: 3, label: '关联', arrows: 'to' },
        { from: 1, to: 4, label: '监测', arrows: 'to' },
        { from: 1, to: 5, label: '包含', arrows: 'to' }
    ];
}

// 初始化项目统计
function initProjectStats() {
    console.log('Initializing project stats');
    // Implementation of initProjectStats function
} 