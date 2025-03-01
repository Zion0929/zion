document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const textarea = document.querySelector('textarea');
    const wordCount = document.querySelector('.word-count');
    const submitBtn = document.querySelector('.submit-btn');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.querySelector('.close-btn');
    let rating = 0;

    // 评分功能
    stars.forEach(star => {
        star.addEventListener('click', () => {
            rating = star.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('active');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= star.getAttribute('data-value')) {
                    s.style.color = '#ffd700';
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => {
                s.style.color = s.classList.contains('active') ? '#ffd700' : '#ccc';
            });
        });
    });

    // 字数统计
    textarea.addEventListener('input', () => {
        const count = textarea.value.length;
        wordCount.textContent = `${count}/200`;
    });

    // 提交按钮
    submitBtn.addEventListener('click', () => {
        if (rating > 0 && textarea.value.trim() !== '') {
            modal.style.display = 'flex';
        } else {
            alert('请完成评分和评论！');
        }
    });

    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stars.forEach(s => s.classList.remove('active'));
        textarea.value = '';
        wordCount.textContent = '0/200';
        rating = 0;
    });
});