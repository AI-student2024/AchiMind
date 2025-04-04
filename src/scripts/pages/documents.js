// 初始化智能文档页面
export function init() {
    // 初始化上传按钮
    const uploadButton = document.querySelector('.upload-document');
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            // TODO: 实现文档上传功能
            console.log('上传文档');
        });
    }

    // 初始化同步按钮
    const syncButton = document.querySelector('.sync-documents');
    if (syncButton) {
        syncButton.addEventListener('click', () => {
            // TODO: 实现文档同步功能
            console.log('同步文档');
        });
    }

    // 初始化文档分类
    initDocumentCategories();

    // 初始化文档搜索
    initDocumentSearch();

    // 初始化文档列表
    initDocumentList();
}

// 初始化文档分类
function initDocumentCategories() {
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 更新文档列表
            const category = button.getAttribute('data-category');
            filterDocumentsByCategory(category);
        });
    });
}

// 初始化文档搜索
function initDocumentSearch() {
    const searchInput = document.querySelector('.document-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterDocumentsBySearch(searchTerm);
        });
    }
}

// 初始化文档列表
function initDocumentList() {
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        // 初始化查看按钮
        const viewButton = item.querySelector('.view-document');
        if (viewButton) {
            viewButton.addEventListener('click', () => {
                const documentId = item.getAttribute('data-id');
                viewDocument(documentId);
            });
        }

        // 初始化下载按钮
        const downloadButton = item.querySelector('.download-document');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                const documentId = item.getAttribute('data-id');
                downloadDocument(documentId);
            });
        }

        // 初始化分享按钮
        const shareButton = item.querySelector('.share-document');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                const documentId = item.getAttribute('data-id');
                shareDocument(documentId);
            });
        }
    });
}

// 按分类筛选文档
function filterDocumentsByCategory(category) {
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 按搜索词筛选文档
function filterDocumentsBySearch(searchTerm) {
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        const documentName = item.querySelector('.document-name').textContent.toLowerCase();
        if (documentName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 查看文档
function viewDocument(documentId) {
    // TODO: 实现文档查看功能
    console.log(`查看文档: ${documentId}`);
}

// 下载文档
function downloadDocument(documentId) {
    // TODO: 实现文档下载功能
    console.log(`下载文档: ${documentId}`);
}

// 分享文档
function shareDocument(documentId) {
    // TODO: 实现文档分享功能
    console.log(`分享文档: ${documentId}`);
} 