document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const duration = parseInt(document.getElementById('duration').value, 10);

  const beginningDateTime = new Date(`${date}T${time}`);
  const endingDateTime = new Date(beginningDateTime.getTime() + duration * 60 * 60 * 1000);

  document.getElementById('beginningTime').value = beginningDateTime.toISOString();
  document.getElementById('endingTime').value = endingDateTime.toISOString();

  this.submit();
});