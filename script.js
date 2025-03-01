// 弹窗内容数据
const popupContent = [
    {
        message: "你吃泻药了吗？",
        image: "https://picsum.photos/400/300?random=1"
    },
    {
        message: "我警告你不要惹我！",
        image: "https://picsum.photos/400/300?random=2"
    },
    {
        message: "你确定要继续吗？",
        image: "https://picsum.photos/400/300?random=3"
    },
    {
        message: "游戏才刚刚开始！",
        image: "https://picsum.photos/400/300?random=4"
    },
    {
        message: "别想关闭我！",
        image: "https://picsum.photos/400/300?random=5"
    }
];

let popupInterval;

function startPopup() {
    popupInterval = setInterval(createPopup, 1000);
}

function createPopup() {
    const randomIndex = Math.floor(Math.random() * popupContent.length);
    const content = popupContent[randomIndex];

    const popupWindow = window.open("", "_blank", "width=400,height=300");
    popupWindow.document.write(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f5e1a8;
                    padding: 20px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <h2>${content.message}</h2>
            <img src="${content.image}" alt="搞怪图片">
        </body>
        </html>
    `);
    popupWindow.document.close();
}