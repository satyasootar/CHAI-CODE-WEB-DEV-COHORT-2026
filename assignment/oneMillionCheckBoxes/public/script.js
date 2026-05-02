const checkboxContainer = document.getElementById('checkbox-container');
const socket = io();


window.addEventListener('load', async () => {
    try {
        const response = await fetch('/checkbox-state');
        const data = await response.json();
        const checkboxes = data.state;

        checkboxes.forEach((checked, index) => {
            const checkbox = checkboxContainer.children[index];
            checkbox.checked = checked;
        });
    } catch (error) {
        console.error('Error fetching checkbox state:', error);
    }
});

socket.on('server:error', (error) => {
    if (typeof error === 'string') {
        showToast(error);
    } else {
        console.log('Received error object:', error);
        showToast(error.message || JSON.stringify(error));
        if (error.data) {
            const { index, checked } = error.data;
            const checkbox = checkboxContainer.children[index];
            if (checkbox) {
                checkbox.checked = !checked;
            }
        }
    }
});

function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

socket.on('checkbox-update', ( data ) => {

    const { index, checked } = data;
    const checkbox = checkboxContainer.children[index];   
    checkbox.checked = checked;
});

new Array(100).fill(null).forEach((_, index) => {
    const listItem = document.createElement("input");
    listItem.type = 'checkbox';
    listItem.addEventListener('change', (event) => {
        const checked = event.target.checked;
        socket.emit('checkbox-change', { index, checked });
    });
    checkboxContainer.appendChild(listItem);
});