document.querySelector('#associateButton').addEventListener('click', (e) =>
{
  const name = document.querySelector('#name').value;
  const start = document.querySelector('#start').value;
  const startMeal = document.querySelector('#startMeal').value;
  const endMeal = document.querySelector('#endMeal').value;
  const end = document.querySelector('#end').value;

  createAssociate(name, start, startMeal, endMeal, end);

})