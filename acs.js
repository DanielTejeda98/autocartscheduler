//Auto Cart Scheduler

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
//Create Schedule Object
let schedule = [];
//Create Associate Array
let assocaites = [];

//Function called to create an associate for the scheduler
function createAssociate(name, start, startMeal, endMeal, end)
{
  //Check that associate times and name is correct.
  if(name == "")
  {
    alert("No associate name!");
    return;
  }
  //Does an associate already exist?
  for(let nameindex = 0; nameindex < assocaites.length; nameindex++)
    {
      if(assocaites[nameindex].name == name)
      {
        alert("Assocaite with same name already exists! Please use a different name!");
        return;
      }
    }
  if(end <= start)
  {
    alert("Invalid start/end schedule! Please enter a valid schedule!");
    return;
  }
  if(endMeal <= startMeal)
  {
    alert("Invalid start break/end break schedule! Please enter a valid schedule!");
    return;
  }
  if(start >= startMeal)
  {
    alert("Invalid start shift/start break schedule! Please enter a valid schedule!");
    return;
  }
  if(end <= endMeal)
  {
    alert("Invalid end shift/end break schedule! Please enter a valid schedule!");
    return;
  }


  assocaites.push(new Associate(name, start, startMeal, endMeal, end));
  alert("Associate Created!");
}

//Pick asssociate for time frame, then add to schedule
function pickAssociate(currentBlock, prevBlock, assocaitesList)
{
  let availableAssociates = 0;
  let averageOutCount = 0;
  for(let j = 0; j < assocaitesList.length; j++)
  {
    if(currentBlock >= assocaitesList[j].start && currentBlock < assocaitesList[j].end && (currentBlock != assocaitesList[j].startMeal || currentBlock >= assocaitesList[j].endMeal))
    {
      availableAssociates++;
      //Sum all avaiable counts
      averageOutCount += assocaitesList[j].outCount;
      console.log(availableAssociates + ' avaialble associates found!');
    }
  }

  //Check to avoid infinity loops due to no associates
  if(availableAssociates == 0)
  {
    schedule.push('NA');
    return;
  }

  //To complete the average count, divide by size of available associates
  averageOutCount = averageOutCount / availableAssociates;

  //Check if there is more than 1 associate available
    //Pick an assoicate at random from the associates array
    let i = Math.floor(Math.random() * assocaitesList.length);
    let isFound = false;
    //Check if associate is available
    //Attempt to find someone counter, if it exeeds just pick someone
    let attempts = 0;
    while(!isFound)
    {
      if(currentBlock >= assocaitesList[i].start && currentBlock < assocaitesList[i].end)
      {
        console.log(assocaitesList[i].name + ' is on property.')
        //Is the associate on break?
        if(currentBlock != assocaitesList[i].startMeal || currentBlock >= assocaitesList[i].endMeal)
        {
          if(availableAssociates > 1)
          {
            //Was the associate the last on out?
            if(prevBlock == 0 || !(schedule[prevBlock] == assocaitesList[i].name))
            {
              //Are they above the average count?
              if((assocaitesList[i].outCount <= averageOutCount + 1) || availableAssociates < 3 || attempts > 10)
              {
                console.log('Average Out Count: ' + averageOutCount);
                console.log(assocaitesList[i].name + ' out times: ' + assocaitesList[i].outCount);
                assocaitesList[i].outCount++;
                schedule.push(assocaitesList[i].name);
                isFound = true;
              }
              //Associate out too much, lets get someone else
              else
              {
                console.log(assocaitesList[i].name + ' has been out above average!');
                i = Math.floor(Math.random() * assocaitesList.length);
                attempts++;
                isFound = false;
              }
            }
            else
            {
              console.log(assocaitesList[i].name + ' was just out!');
              i = Math.floor(Math.random() * assocaitesList.length);
              isFound = false;
            }
          }
          //No other associates available
          else 
          {
            assocaitesList[i].outCount++;
            console.log(assocaitesList[i].name + ' out times: ' + assocaitesList[i].outCount);
            schedule.push(assocaitesList[i].name);
            isFound = true;
          }
        }
        else
        {
          console.log(assocaitesList[i].name + ' is on break!.')
          i = Math.floor(Math.random() * assocaitesList.length);
          isFound = false;
        }
      }
      else
        {
          i = Math.floor(Math.random() * assocaitesList.length);
          isFound = false;
        }
    }
}
//Render schedule
function generateSchedule()
{
  schedule = [];

  for(let block = 0; block < 33; block++)
  {
    if(block == 0) pickAssociate(block, 0, assocaites);
    else  pickAssociate(block, block - 1, assocaites);
  
    console.log(block + ' : ' + schedule[block]);
  }
}