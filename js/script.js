document.getElementById("submit").onclick = function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const variant = document.getElementById('variant');
    const group = document.getElementById('group');
    const faculty = document.getElementById('faculty');
    const dob = document.getElementById('dob');

    clearErrors();

    let isValid = true;

    if (!name.checkValidity()) {
        name.classList.add('error');
        isValid = false;
    }

    if (!variant.checkValidity()) {
        variant.classList.add('error');
        isValid = false;
    }

    if (!group.checkValidity()) {
        group.classList.add('error');
        isValid = false;
    }

    if (!faculty.checkValidity()) {
        faculty.classList.add('error');
        isValid = false;
    }

    if (!dob.checkValidity()) {
        dob.classList.add('error');
        isValid = false;
    }

    const resultDiv = document.getElementById('result');
    if (isValid) {
        resultDiv.innerText = `Введені дані:
            \nПІБ: ${name.value}
            \nВаріант: ${variant.value}
            \nГрупа: ${group.value}
            \nФакультет: ${faculty.value}
            \nДата народження: ${dob.value}`;
    } else {
        resultDiv.innerText = "Будь ласка, виправте помилки у формі.";
    }
};

function clearErrors() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

const table = document.getElementById("table");
const colorPicker = document.getElementById("colorPicker");
const rows = 6;
const cols = 6;
const variant = 9; // Номер варіанта

// Створення таблиці
let count = 1;
for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.textContent = count;

        // Випадковий колір при наведенні на клітинку з номером варіанта
        if (count === variant) {
            cell.addEventListener("mouseenter", () => {
                cell.style.backgroundColor = getRandomColor();
            });

            // Зміна кольору при кліку
            cell.addEventListener("click", () => {
                cell.style.backgroundColor = colorPicker.value;
            });
        }

        // Зміна кольору клітинок у стовпці через одну при подвійному кліку
        cell.addEventListener("dblclick", () => {
            const columnIndex = cell.cellIndex; // Індекс стовпця
            const rowIndex = cell.parentElement.rowIndex; // Індекс рядка
            for (let k = rowIndex; k < rows; k += 2) {
                table.rows[k].cells[columnIndex].style.backgroundColor = colorPicker.value;
            }
        });

        row.appendChild(cell);
        count++;
    }
    table.appendChild(row);
}

// Функція для генерації випадкового кольору
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}