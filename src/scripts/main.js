// 全局初始化标志
let isInitialized = false;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    const loadingElement = document.getElementById('loading');
    
    try {
        // 如果已经初始化，直接返回
        if (isInitialized) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            return;
        }

        // 显示加载状态
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }

        // 加载组件
        const [headerLoaded, footerLoaded] = await Promise.all([
            loadComponent('header', 'header.html'),
            loadComponent('footer', 'footer.html')
        ]);

        if (!headerLoaded || !footerLoaded) {
            throw new Error('Failed to load components');
        }

        // 初始化导航
        initNavigation();
        
        // 初始化项目选择
        initProjectSelection();
        
        // 加载初始页面
        const currentPage = window.location.hash.slice(1) || 'overview';
        await loadPage(currentPage);

        // 标记为已初始化
        isInitialized = true;

        // 隐藏加载状态
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    } catch (error) {
        console.error('Initialization error:', error);
        // 显示错误信息
        if (loadingElement) {
            loadingElement.innerHTML = `
                <div class="text-center">
                    <div class="text-red-600 mb-4">
                        <i class="fas fa-exclamation-circle text-4xl"></i>
                    </div>
                    <p class="text-gray-600">加载失败，请刷新页面重试</p>
                    <p class="text-sm text-gray-500 mt-2">${error.message}</p>
                </div>
            `;
        }
    }
});

// 加载组件
async function loadComponent(id, path) {
    try {
        const basePath = window.location.pathname.endsWith('/') 
            ? window.location.pathname 
            : window.location.pathname + '/';
        const response = await fetch(`${basePath}src/components/${path}`);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${path}`);
        }
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error loading component ${path}:`, error);
        return false;
    }
}

// 加载页面
async function loadPage(pageName) {
    console.log('Loading page:', pageName);
    try {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('page-hidden');
        });

        // 加载新页面
        const basePath = window.location.pathname.endsWith('/') 
            ? window.location.pathname 
            : window.location.pathname + '/';
        const response = await fetch(`${basePath}src/pages/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load page: ${pageName}`);
        }
        const html = await response.text();
        const contentDiv = document.getElementById('content');
        
        // 清空内容区域
        if (contentDiv) {
            contentDiv.innerHTML = html;
            contentDiv.classList.remove('page-hidden');
            contentDiv.classList.add('page-transition');
        }

        // 获取当前选中的项目
        const selectedProject = localStorage.getItem('selectedProject') || '上海金融中心智能化项目';
        const projectData = projects[selectedProject];

        // 如果是概览页面，立即更新项目内容
        if (pageName === 'overview' && projectData) {
            // 更新项目标题
            const projectTitle = document.querySelector('.project-title');
            if (projectTitle) {
                projectTitle.textContent = selectedProject;
            }

            // 更新项目信息
            const projectInfo = document.querySelector('.project-info');
            if (projectInfo) {
                projectInfo.innerHTML = `项目编号: ${projectData.id} | 竣工日期: ${projectData.completionDate}`;
            }

            // 更新统计数据
            const stats = document.querySelectorAll('.stat-card');
            if (stats.length >= 4) {
                stats[0].querySelector('.stat-value').textContent = projectData.documents.toLocaleString();
                stats[1].querySelector('.stat-value').textContent = projectData.nodes.toLocaleString();
                stats[2].querySelector('.stat-value').textContent = projectData.videos.toLocaleString();
                stats[3].querySelector('.stat-value').textContent = projectData.standards.toLocaleString();
            }
        }

        // 同步更新项目选择器显示
        const projectButton = document.querySelector('.project-selector button span');
        if (projectButton) {
            projectButton.textContent = selectedProject;
        }

        // 加载页面特定的JavaScript
        try {
            const scriptPath = `${basePath}src/scripts/pages/${pageName}.js`;
            console.log('Loading script from:', scriptPath);
            const module = await import(scriptPath);
            console.log('Script loaded successfully');
            if (module.init) {
                if (pageName === 'overview') {
                    await module.init(false, projectData);
                } else {
                    await module.init();
                }
            }
        } catch (error) {
            console.warn(`No specific script found for ${pageName}:`, error);
            // 如果是overview页面，尝试直接初始化知识图谱
            if (pageName === 'overview') {
                await initKnowledgeGraphPreview();
            }
        }
    } catch (error) {
        console.error(`Error loading page ${pageName}:`, error);
        throw error;
    }
}

// 初始化导航
function initNavigation() {
    document.addEventListener('click', (e) => {
        const navLink = e.target.closest('.nav-link');
        if (navLink) {
            e.preventDefault();
            const pageName = navLink.getAttribute('data-page');
            switchPage(pageName);
        }
    });
}

// 切换页面
function switchPage(pageName) {
    console.log('Switching to page:', pageName);
    
    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // 更新URL
    window.location.hash = pageName;
    
    // 加载新页面
    loadPage(pageName);
}

// 项目数据
const projects = {
    '上海金融中心智能化项目': {
        id: 'SHFC-2023-001',
        completionDate: '2023-09-15',
        documents: 1248,
        nodes: 3756,
        videos: 42,
        standards: 87
    },
    '北京中心大厦智能化项目': {
        id: 'BJC-2023-002',
        completionDate: '2023-10-20',
        documents: 1560,
        nodes: 4200,
        videos: 38,
        standards: 92
    },
    '广州城投大厦智能化项目': {
        id: 'GZCT-2023-003',
        completionDate: '2023-11-15',
        documents: 980,
        nodes: 2800,
        videos: 35,
        standards: 75
    },
    '深圳地铁大厦智能化项目': {
        id: 'SZDT-2023-004',
        completionDate: '2023-12-10',
        documents: 1350,
        nodes: 3200,
        videos: 45,
        standards: 85
    }
};

// 初始化项目选择
function initProjectSelection() {
    const projectButton = document.querySelector('.project-selector button');
    const projectDropdown = document.querySelector('.project-selector .dropdown-menu');
    const projectNameSpan = projectButton.querySelector('span');

    if (projectButton && projectDropdown) {
        // 设置初始项目
        const initialProject = localStorage.getItem('selectedProject') || '上海金融中心智能化项目';
        projectNameSpan.textContent = initialProject;
        updateProjectContent(initialProject);

        projectButton.addEventListener('click', () => {
            projectDropdown.classList.toggle('hidden');
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!projectButton.contains(e.target) && !projectDropdown.contains(e.target)) {
                projectDropdown.classList.add('hidden');
            }
        });

        // 选择项目
        const projectLinks = projectDropdown.querySelectorAll('a');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectName = link.textContent.trim();
                projectNameSpan.textContent = projectName;
                projectDropdown.classList.add('hidden');
                updateProjectContent(projectName);
            });
        });
    }
}

// 更新项目内容
function updateProjectContent(projectName) {
    console.log('Updating project content for:', projectName);
    
    // 更新本地存储
    localStorage.setItem('selectedProject', projectName);
    
    // 获取项目数据
    const projectData = projects[projectName];
    if (!projectData) return;

    // 更新概览页面内容
    const currentPage = document.querySelector('.nav-link.active')?.getAttribute('data-page');
    if (currentPage === 'overview') {
        updateOverviewContent(projectData);
    }
}

// 更新概览页面内容
function updateOverviewContent(projectData) {
    const selectedProject = localStorage.getItem('selectedProject');
    
    // 更新项目标题
    const projectTitle = document.querySelector('.project-title');
    if (projectTitle) {
        projectTitle.textContent = selectedProject;
    }

    // 更新项目信息
    const projectInfo = document.querySelector('.project-info');
    if (projectInfo) {
        projectInfo.innerHTML = `项目编号: ${projectData.id} | 竣工日期: ${projectData.completionDate}`;
    }

    // 更新统计数据
    const stats = document.querySelectorAll('.stat-card');
    if (stats.length >= 4) {
        stats[0].querySelector('.stat-value').textContent = projectData.documents.toLocaleString();
        stats[1].querySelector('.stat-value').textContent = projectData.nodes.toLocaleString();
        stats[2].querySelector('.stat-value').textContent = projectData.videos.toLocaleString();
        stats[3].querySelector('.stat-value').textContent = projectData.standards.toLocaleString();
    }

    // 重新初始化知识图谱
    initKnowledgeGraphPreview(projectData);
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
        if (window.currentNetwork) {
            window.currentNetwork.destroy();
            window.currentNetwork = null;
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
        window.currentNetwork = new vis.Network(graphContainer, { nodes, edges }, options);
        
        // 等待网络稳定
        window.currentNetwork.once('stabilizationIterationsDone', () => {
            console.log('Knowledge graph stabilized');
            window.currentNetwork.fit(); // 自动调整视图以显示所有节点
        });

        // 添加事件监听器
        window.currentNetwork.on('click', function(params) {
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

// 导出函数供其他模块使用
export { loadPage, switchPage, updateProjectContent }; 