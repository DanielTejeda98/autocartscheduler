document.querySelector('#associateButton').addEventListener('click', (e) =>
{
  const name = document.querySelector('#name').value;
  if(name == "")
  {
    alert("Please fill out associate name!");
    return;
  }
  const start = parseInt(document.querySelector('#start').value);
  const startMeal = parseInt(document.querySelector('#startMeal').value);
  const endMeal = parseInt(document.querySelector('#endMeal').value);
  const end = parseInt(document.querySelector('#end').value);

  console.log(endMeal);
  console.log(end);

  createAssociate(name, start, startMeal, endMeal, end);

})