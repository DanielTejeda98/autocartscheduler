//This file will handle all associate information

//Create Associate Class
class Associate {
  constructor(name, start, startMeal, endMeal, end)
  {
    this.name = name;
    this.start = start;
    this.startMeal = startMeal;
    this.endMeal = endMeal;
    this.end = end;
    this.outCount = 0;
    this.lastOutBlock = -1;
  }

}

//Create Associate Array
let assocaites = [];

//Function called to create an associate for the scheduler
function createAssociate(name, start, startMeal, endMeal, end, isEdit=false)
{
  console.log(name +" " + start +" " + startMeal +" " + endMeal +" " + end)
  //Check that associate times and name is correct.
  if(name == "")
  {
    errorHandler(isEdit ? document.querySelector('#edit-name') : document.querySelector('#name'), "Please fill out associate name!")
    return -1;
  }
  //Does an associate already exist? Ignore if editing
  if(!isEdit)
  {
    for(let nameindex = 0; nameindex < assocaites.length; nameindex++)
    {
      if(assocaites[nameindex].name == name)
      {
        errorHandler(isEdit ? document.querySelector('#edit-name') : document.querySelector('#name'), "Assocaite with same name already exists! Please use a different name!")
        return -1;
      }
    }
  }
  if(end <= start)
  {
    errorHandler(isEdit ? document.querySelector('#edit-end') : document.querySelector('#end'), "Invalid end schedule!")
    return -1;
  }
  if(startMeal == -1 && endMeal != -1 || startMeal != -1 && endMeal == -1)
  {
    errorHandler(isEdit ? document.querySelector('#edit-endMeal') : document.querySelector('#endMeal')  , "Invalid end break schedule!")
    return -1;
  }
  if(endMeal != -1 && endMeal <= startMeal)
  {
    errorHandler(isEdit ? document.querySelector('#edit-endMeal') : document.querySelector('#endMeal'), "Invalid end break schedule!")
    return -1;
  }
  if(startMeal != -1 && (start >= startMeal))
  {
    errorHandler(isEdit ? document.querySelector('#edit-startMeal') : document.querySelector('#startMeal'), "Invalid start break schedule!")
    return -1;
  }
  if(end <= endMeal)
  {
    errorHandler(isEdit ? document.querySelector('#edit-end') : document.querySelector('#end'), "Invalid end schedule!")
    return -1;
  }


  assocaites.push(new Associate(name, start, startMeal, endMeal, end));
  if(!isEdit)
  {
    const alert = document.querySelector('#alerts')
    alert.setAttribute('data-success', `${name} successfully added!`)
    alert.classList.add('alert-success')
    alert.innerHTML = `${name} has been successfully added! <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>`
  }

  //Reset form
  document.querySelector('#name').value = ""
  document.querySelector('#start').value = 0
  document.querySelector('#startMeal').value = 0 
  document.querySelector('#endMeal').value = 0
  document.querySelector('#end').value = 0
  return 0
}

//getAssociates List renders out the associates to the DOM

function getAssociates() {
  associatesDataDiv = document.querySelector('#associatesData')
  associatesDataDiv.innerHTML = ''
  assocaites.forEach(associate => {
    filteredAssociate = filterProps(associate)
    
    docDiv = document.createElement('div')
    docDiv.classList.add('row')
    
    for(const property in filteredAssociate)
      {
        docSpan = document.createElement('span')
        docSpan.classList.add('col-2')
        docSpan.setAttribute('id', property + '#' +filteredAssociate['name'])
        if(property !== 'name')
        {
          docSpan.innerHTML = dictionary[filteredAssociate[property]]
        }
        else
        {
          docSpan.innerHTML = filteredAssociate[property]
        }
        docDiv.append(docSpan)
      }
    //Append edit buttons
    docEdit = document.createElement('span')
    docEdit.classList.add('col-2')
    docEdit.innerHTML = (
      `<button class="btn btn-warning me-1 text-white" id="btnEdit" data-bs-target="#editModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="bi bi-pencil-square"></i></button>` +
      `<button class="btn btn-danger" id="btnDelete"><i class="bi bi-trash3"></i></button>`
    )
    docDiv.append(docEdit)
    associatesDataDiv.append(docDiv)
    associatesDataDiv.append(document.createElement('hr'))
    reloadButtons()
  })
}
//Helper function for displaying get associates
function filterProps(associate)
{
  const {outCount, lastOutBlock, ...filteredAssociate} = associate
  return filteredAssociate
}

function deleteAssociate(associateName)
{
  assocaites.splice(assocaites.findIndex(associate => associate.name === associateName), 1)
}

//Reloads the buttons for associate edit/delete when getAssocaites finishes rendering
function reloadButtons() {
  //Button Event Listeners
  //Edit Assoicate
  document.querySelectorAll('#btnEdit').forEach(btn => {
    btn.addEventListener('click', e =>
    {
      console.log(e.target)
      associateName = e.target.parentElement.parentElement.firstChild.innerText
      //Edit associate from associates array by name
      //Get associate
      editAssociate = assocaites[assocaites.findIndex(associate => associate.name === associateName)]
      //Render an edit form
      editDiv = document.querySelector('#edit')
      editDiv.innerHTML = ''
      const editNameHiddenInput = document.createElement('input')
      editNameHiddenInput.setAttribute('type', 'text')
      editNameHiddenInput.setAttribute('id', 'edit-oldName')
      editNameHiddenInput.hidden = true
      editNameHiddenInput.value = editAssociate['name']
      const nameDiv = document.createElement('div')
      // nameDiv.classList.add('col-2')
      nameDiv.classList.add('col-sm')
      nameDiv.classList.add('col-lg')
      nameDiv.classList.add('form-group')
      const nameInput = document.createElement('input')
      nameInput.setAttribute('type', 'text')
      nameInput.setAttribute('name', 'name')
      nameInput.setAttribute('id', 'edit-name')
      nameInput.setAttribute('placeholder', 'David')
      nameInput.classList.add('form-control')
      //Set Name
      nameInput.value = editAssociate['name']
      const nameLabel = document.createElement('label')
      nameLabel.setAttribute('for', 'name')
      nameLabel.innerText = "Associate Name: "
      nameDiv.append(editNameHiddenInput)
      nameDiv.append(nameLabel)
      nameDiv.append(nameInput)

      editDiv.append(nameDiv)
      ids = ['start', 'startMeal', 'endMeal', 'end']
      ids.forEach(property =>
      {
        const selDiv = document.createElement('div')
        selDiv.classList.add('form-group')
        nameDiv.classList.add('col-sm')
        selDiv.classList.add('col-lg-2')
        const selectsLabel = document.createElement('label')
        selectsLabel.setAttribute('for', 'edit-' + property)
        selectsLabel.innerHTML = keywords[property]
        const selects = document.createElement('select')
        selects.setAttribute('id', 'edit-' + property)
        selects.setAttribute('name', 'edit-' + property)
        selects.classList.add('form-control')
        for(i = -1; i < 34; i++)
        {
          const option = document.createElement('option')
          option.setAttribute('value', i)
          option.innerText = dictionary[i]
          selects.append(option)
        }
        selects.value = editAssociate[property]
        selDiv.append(selectsLabel)
        selDiv.append(selects)

        editDiv.append(selDiv)
      })

    })
  });
  //Save Assoicate Edits
  document.querySelector('#saveEdit').addEventListener('click', () =>
  {
    

    name = document.querySelector('#edit-name').value
    start = parseInt(document.querySelector('#edit-start').value)
    startMeal = parseInt(document.querySelector('#edit-startMeal').value)
    endMeal = parseInt(document.querySelector('#edit-endMeal').value)
    end = parseInt(document.querySelector('#edit-end').value)
    associateOrigName = document.querySelector('#edit-oldName').value

    
    //Create new associate with edits
    opstatus = createAssociate(name, start, startMeal, endMeal, end, true)
    console.log(opstatus)
    //Delete old associate
    if(opstatus != -1)
    {
      deleteAssociate(associateOrigName)
      const alert = document.querySelector('#saveAlert')
      alert.setAttribute('data-success', `${name} successfully updated!`)
      alert.classList.add('alert-success')
      alert.innerHTML = `${name} has been successfully added! <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>`
    }
    //Reload associates list for other modal
    getAssociates()

  })
  //Delete Associate
  document.querySelectorAll('#btnDelete').forEach(btn => {
    btn.addEventListener('click', e =>
    {
      associateName = e.target.parentElement.parentElement.firstChild.innerText
      //Remove associate from associates array by name
      deleteAssociate(associateName)
      getAssociates()
    })
  });
}

