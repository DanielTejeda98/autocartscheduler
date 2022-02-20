document.querySelector('#associateButton').addEventListener('click', (e) =>
{
  const name = document.querySelector('#name').value;
  if(name == "")
  {
    errorHandler(document.querySelector('#name'), "Please fill out associate name!")
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


//Data validation CSS handler

/*
Call this funciton to handle creating error elements in the form.
@param {HTML Element} element is the HTML element that the error originates from
@param {message} message is the message that will be displayed in the error
*/
const errorHandler = (element, message) =>
{
  if(!(element instanceof Element))
  {
    throw `Expected HTML Element as a parameter, found ${typeof element}`
  }
  if(!(typeof message === 'string'))
  {
    throw `Expected String as a parameter, found ${typeof message}`
  }
  element.parentElement.setAttribute('data-error', message)
  //Remove error attribute from fields 
  element.addEventListener('input', () => element.parentElement.removeAttribute('data-error'))
}