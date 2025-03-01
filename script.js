document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const textarea = document.querySelector('textarea');
    const wordCount = document.querySelector('.word-count');
    const submitBtn = document.querySelector('.submit-btn');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.querySelector('.close-btn');
    let rating = 0;

    // 评分交互
    const updateStars = (hoveredValue = null) => {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            star.classList.toggle('active', value <= (hoveredValue || rating));
        });
    };

    stars.forEach(star => {
        star.addEventListener('click', () => {
            rating = parseInt(star.getAttribute('data-value'));
            updateStars();
        });
        star.addEventListener('mouseover', () => updateStars(parseInt(star.getAttribute('data-value'))));
        star.addEventListener('mouseout', () => updateStars());
    });

    // 字数统计
    textarea.addEventListener('input', () => {
        const count = textarea.value.length;
        wordCount.textContent = `${count}/200`;
        wordCount.style.color = count > 180 ? '#e74c3c' : '#7f8c8d';
    });

    // 提交逻辑
    submitBtn.addEventListener('click', () => {
        if (rating === 0) {
            alert('请先选择评分！');
            return;
        }
        if (!textarea.value.trim()) {
            alert('请输入您的评论！');
            return;
        }
        modal.style.display = 'flex';
        submitBtn.disabled = true; // 防止重复提交
        submitBtn.textContent = '提交中...';
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = '提交评价';
        }, 1000);
    });

    // 关闭弹窗并重置
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stars.forEach(star => star.classList.remove('active'));
        textarea.value = '';
        wordCount.textContent = '0/200';
        rating = 0;
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBtn.click();
    });
});