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
  }

}

//Create Associate Array
let assocaites = [];

//getAssociates List renders out the associates to the DOM

function getAssociates() {
  associatesDataDiv = document.querySelector('#associatesData')
  associatesDataDiv.innerHTML = ''
  assocaites.forEach(associate => {
    filteredAssociate = filterProps(associate)

    console.log(filteredAssociate)
    
    docDiv = document.createElement('div')
    docDiv.classList.add('row')
    
    for(const property in filteredAssociate)
      {
        console.log(filteredAssociate[property])
        docSpan = document.createElement('span')
        docSpan.classList.add('col-2')
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
    
    associatesDataDiv.append(docDiv)
    associatesDataDiv.append(document.createElement('hr'))
  })
}

function filterProps(associate)
{
  const {outCount, ...filteredAssociate} = associate
  return filteredAssociate
}