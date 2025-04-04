const fs = require('fs');
const path = require('path');
const htmlMinifier = require('html-minifier');
const terser = require('terser');
const CleanCSS = require('clean-css');

// 配置
const config = {
    src: 'src',
    dist: 'dist',
    minify: {
        html: {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        },
        css: {
            level: 2
        },
        js: {
            compress: true,
            mangle: true
        }
    }
};

// 确保构建目录存在
if (!fs.existsSync(config.dist)) {
    fs.mkdirSync(config.dist);
}

// 构建函数
async function build() {
    try {
        // 读取主HTML文件
        const mainHtml = fs.readFileSync(path.join(config.src, 'index.html'), 'utf8');

        // 合并CSS文件
        const cssFiles = [
            path.join(config.src, 'styles', 'main.css')
        ];
        let cssContent = '';
        for (const file of cssFiles) {
            cssContent += fs.readFileSync(file, 'utf8') + '\n';
        }

        // 合并JavaScript文件
        const jsFiles = [
            path.join(config.src, 'scripts', 'main.js')
        ];
        let jsContent = '';
        for (const file of jsFiles) {
            jsContent += fs.readFileSync(file, 'utf8') + '\n';
        }

        // 压缩HTML
        const minifiedHtml = htmlMinifier.minify(mainHtml, config.minify.html);

        // 压缩CSS
        const minifiedCss = new CleanCSS(config.minify.css).minify(cssContent).styles;

        // 压缩JavaScript
        const minifiedJs = (await terser.minify(jsContent, config.minify.js)).code;

        // 替换占位符
        const finalHtml = minifiedHtml
            .replace('<!-- STYLES -->', `<style>${minifiedCss}</style>`)
            .replace('<!-- SCRIPTS -->', `<script>${minifiedJs}</script>`);

        // 写入构建文件
        fs.writeFileSync(path.join(config.dist, 'index.html'), finalHtml);

        // 复制静态资源
        copyStaticResources();

        console.log('构建完成！输出目录：', config.dist);
    } catch (error) {
        console.error('构建过程中出错：', error);
    }
}

// 复制静态资源
function copyStaticResources() {
    const staticDirs = ['images', 'fonts'];
    
    for (const dir of staticDirs) {
        const srcDir = path.join(config.src, dir);
        const destDir = path.join(config.dist, dir);
        
        if (fs.existsSync(srcDir)) {
            // 确保目标目录存在
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            
            // 复制文件
            const files = fs.readdirSync(srcDir);
            for (const file of files) {
                const srcPath = path.join(srcDir, file);
                const destPath = path.join(destDir, file);
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

// 执行构建
build(); 