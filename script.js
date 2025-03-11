// 更新当前时间
function updateCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  // 补零
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// 设置支付时间（假设支付时间为3分钟前）
function setPaymentTime() {
  const now = new Date();
  const paymentTime = new Date(now.getTime() - 3 * 60 * 1000);
  let hours = paymentTime.getHours();
  let minutes = paymentTime.getMinutes();
  
  // 补零
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  document.getElementById('payment-time').textContent = `今天 ${hours}:${minutes}`;
}

// 初始化页面
function initPage() {
  updateCurrentTime();
  setPaymentTime();
  
  // 每分钟更新一次时间
  setInterval(updateCurrentTime, 60000);
  
  // 为按钮添加点击事件
  document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      alert('操作: ' + this.textContent);
    });
  });
  
  // 添加返回按钮点击事件
  document.querySelector('.back-button').addEventListener('click', function(e) {
    e.preventDefault();
    alert('返回上一页');
  });
  
  // 添加菜单按钮点击事件
  document.querySelector('.menu-button').addEventListener('click', function(e) {
    e.preventDefault();
    alert('打开菜单');
  });
}

// 当DOM加载完成后初始化页面
document.addEventListener('DOMContentLoaded', initPage);