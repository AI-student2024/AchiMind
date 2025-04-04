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

        // 如果存在旧的网络实例，销毁它
        if (currentNetwork) {
            currentNetwork.destroy();
            currentNetwork = null;
        }

        // 根据当前选中的项目获取节点数据
        const selectedProject = localStorage.getItem('selectedProject') || '上海金融中心智能化项目';
        const nodes = new vis.DataSet(getProjectNodes(selectedProject));
        const edges = new vis.DataSet(getProjectEdges(selectedProject));

        // 配置选项
        const options = {
            nodes: {
                shape: 'dot',
                size: 20,
                font: {
                    size: 14,
                    color: '#333'
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
                shadow: true
            },
            physics: {
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 100
                },
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

        // 创建网络
        currentNetwork = new vis.Network(graphContainer, { nodes, edges }, options);
        
        // 等待网络稳定
        await new Promise((resolve, reject) => {
            try {
                currentNetwork.once('stabilizationIterationsDone', () => {
                    console.log('Knowledge graph stabilized');
                    resolve();
                });
            } catch (error) {
                console.error('Error waiting for graph stabilization:', error);
                reject(error);
            }
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
            { id: 1, label: 'BA系统', group: 'system' },
            { id: 2, label: 'DDC控制器', group: 'device' },
            { id: 3, label: '操作手册', group: 'document' }
        ],
        '北京中心大厦智能化项目': [
            { id: 1, label: '安防系统', group: 'system' },
            { id: 2, label: '监控设备', group: 'device' },
            { id: 3, label: '技术文档', group: 'document' }
        ],
        '广州城投大厦智能化项目': [
            { id: 1, label: '消防系统', group: 'system' },
            { id: 2, label: '烟感器', group: 'device' },
            { id: 3, label: '规范文件', group: 'document' }
        ],
        '深圳地铁大厦智能化项目': [
            { id: 1, label: '照明系统', group: 'system' },
            { id: 2, label: '智能开关', group: 'device' },
            { id: 3, label: '说明书', group: 'document' }
        ]
    };
    return nodeData[projectName] || nodeData['上海金融中心智能化项目'];
}

// 获取项目边数据
function getProjectEdges(projectName) {
    // 所有项目使用相同的边结构，但可以根据需要自定义
    return [
        { from: 1, to: 2, label: '控制' },
        { from: 2, to: 3, label: '关联' }
    ];
}

// 初始化项目统计
function initProjectStats() {
    console.log('Initializing project stats');
    // Implementation of initProjectStats function
} 