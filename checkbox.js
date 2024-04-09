const checkbox = document.getElementById('myCheckbox');
const div = document.getElementById('myDiv');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
        }
        });