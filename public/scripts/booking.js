document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const duration = parseInt(document.getElementById('duration').value, 10);

  const beginningDateTime = new Date(`${date}T${time}`);
  const endingDateTime = new Date(beginningDateTime.getTime() + duration * 60 * 60 * 1000);

  const data = {
    beginningTime: beginningDateTime.toISOString(),
    endingTime: endingDateTime.toISOString()
  };

  fetch(this.action, {
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
        }).then(() => {
          window.location.href = '/booktable';
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
      }).then(() => {
        window.location.href = '/booktable';
      });
    });
});