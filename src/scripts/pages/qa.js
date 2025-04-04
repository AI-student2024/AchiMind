// 初始化智能问答页面
export function init() {
    // 初始化历史记录按钮
    const historyButton = document.querySelector('.view-history');
    if (historyButton) {
        historyButton.addEventListener('click', () => {
            // TODO: 实现查看历史记录功能
            console.log('查看历史记录');
        });
    }

    // 初始化更新知识库按钮
    const updateButton = document.querySelector('.update-knowledge');
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            // TODO: 实现更新知识库功能
            console.log('更新知识库');
        });
    }

    // 初始化常见问题
    initFrequentlyAskedQuestions();

    // 初始化聊天功能
    initChat();

    // 初始化统计图表
    initStatistics();
}

// 初始化常见问题
function initFrequentlyAskedQuestions() {
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.textContent;
            sendQuestion(question);
        });
    });
}

// 初始化聊天功能
function initChat() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatHistory = document.querySelector('.chat-history');

    if (chatInput && sendButton && chatHistory) {
        // 发送按钮点击事件
        sendButton.addEventListener('click', () => {
            const question = chatInput.value.trim();
            if (question) {
                sendQuestion(question);
                chatInput.value = '';
            }
        });

        // 输入框回车事件
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const question = chatInput.value.trim();
                if (question) {
                    sendQuestion(question);
                    chatInput.value = '';
                }
            }
        });
    }
}

// 发送问题
function sendQuestion(question) {
    const chatHistory = document.querySelector('.chat-history');
    if (!chatHistory) return;

    // 添加用户问题
    addMessageToChat('user', question);

    // 模拟系统回答
    setTimeout(() => {
        const answer = generateAnswer(question);
        addMessageToChat('system', answer);
    }, 1000);
}

// 添加消息到聊天记录
function addMessageToChat(sender, message) {
    const chatHistory = document.querySelector('.chat-history');
    if (!chatHistory) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`;

    const messageContent = document.createElement('div');
    messageContent.className = `max-w-[70%] rounded-lg p-4 ${
        sender === 'user' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-800'
    }`;

    messageContent.textContent = message;
    messageDiv.appendChild(messageContent);
    chatHistory.appendChild(messageDiv);

    // 滚动到底部
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 生成回答
function generateAnswer(question) {
    // TODO: 实现实际的问答逻辑
    // 这里只是模拟回答
    const answers = {
        'BA系统如何设置温度控制？': '设置温度控制的步骤如下：\n1. 登录BA系统管理界面\n2. 进入温度控制模块\n3. 选择需要设置的区域\n4. 设置目标温度值\n5. 保存设置',
        '安防系统报警如何处理？': '处理安防系统报警的步骤：\n1. 确认报警类型和位置\n2. 查看监控画面\n3. 联系相关人员\n4. 记录处理过程\n5. 解除报警状态',
        '综合布线系统如何测试？': '综合布线系统测试步骤：\n1. 使用测试仪检查线路\n2. 测试信号传输质量\n3. 检查连接器状态\n4. 记录测试结果\n5. 修复发现的问题',
        '音视频系统如何调试？': '音视频系统调试步骤：\n1. 检查设备连接\n2. 测试音频输出\n3. 测试视频显示\n4. 调整音视频参数\n5. 保存调试设置'
    };

    return answers[question] || '抱歉，我暂时无法回答这个问题。';
}

// 初始化统计图表
function initStatistics() {
    // TODO: 实现统计图表初始化
    // 这里可以集成图表库，如Chart.js
    console.log('初始化统计图表');
} 