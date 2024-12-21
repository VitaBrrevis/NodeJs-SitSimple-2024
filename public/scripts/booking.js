document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const duration = parseInt(document.getElementById('duration').value, 10);
  const roomId = document.getElementById('room').value;
  const tableId = document.getElementById('table').value;

  const beginningDateTime = new Date(`${date}T${time}`);
  const endingDateTime = new Date(beginningDateTime.getTime() + duration * 60 * 60 * 1000);

  const data = {
    beginningTime: beginningDateTime.toISOString(),
    endingTime: endingDateTime.toISOString()
  };

  fetch(`/booktable/reserve/${tableId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${result.error}`,
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Reservation created successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.href = '/booktable';
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error: ${error.message}`,
        confirmButtonText: 'OK'
      });
    });
});

async function updateTables() {
  const roomId = document.getElementById('room').value;
  const tableSelect = document.getElementById('table');
  tableSelect.innerHTML = '<option value="">Loading...</option>';
  const response = await fetch(`/booktable/tables/${roomId}`);
  const tables = await response.json();
  tableSelect.innerHTML = tables.map(table => `<option value="${table.id}">${table.capacity} people</option>`).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  updateTables();

  // Update tables when the room selection changes
  document.getElementById('room').addEventListener('change', updateTables);
});