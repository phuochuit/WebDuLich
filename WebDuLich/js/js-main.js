function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.style.display = 'none');

    document.getElementById(tabId).style.display = 'block';
}