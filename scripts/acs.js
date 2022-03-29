//Auto Cart Scheduler

//Create Schedule Object
let schedule = [];

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
    }
  }
  console.log(availableAssociates + ' avaialble associates found!');

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
    // let i = Math.floor(Math.random() * assocaitesList.length);
    let i = 0;
    let isFound = false;
    //Check if associate is available
    //Attempt to find someone counter, if it exeeds just pick someone
    let attempts = 0;
    while(!isFound)
    {
      //Prevent out of scoping
      if(i >= assocaitesList.length)
      {
        i = 0;
      }
      if(currentBlock >= assocaitesList[i].start && currentBlock < assocaitesList[i].end)
      {
        console.log(assocaitesList[i].name + ' is on property.')
        //Is the associate on break?
        if(currentBlock != assocaitesList[i].startMeal || currentBlock >= assocaitesList[i].endMeal)
        {
          if(availableAssociates > 1)
          {
            //Was the associate the last on out?
            if(prevBlock === -1 || !(prevBlock === assocaitesList[i].lastOutBlock))
            {
              //Are they above the average count?
              //Evaluate Lookback value
              const lookback = (currentBlock - availableAssociates) < 0 ? 0 : currentBlock - availableAssociates + 1;
              console.log("Associate Last Out: ", assocaitesList[i].lastOutBlock, "Associate List Size: ", assocaitesList.length, "Lookback Value: ", lookback, "Current Block: ", currentBlock)
              if(assocaitesList[i].lastOutBlock < lookback || availableAssociates < 3 || attempts > 10)
              {
                console.log('Average Out Count: ' + averageOutCount);
                console.log(assocaitesList[i].name + ' out times: ' + assocaitesList[i].outCount);
                assocaitesList[i].outCount++;
                assocaitesList[i].lastOutBlock = currentBlock;
                schedule.push(assocaitesList[i].name);
                isFound = true;
              }
              //Associate out too much, lets get someone else
              else
              {
                console.log(assocaitesList[i].name + ' has been out above average!');
                // i = Math.floor(Math.random() * assocaitesList.length);
                i++;
                attempts++;
                isFound = false;
              }
            }
            else
            {
              console.log(assocaitesList[i].name + ' was just out!');
              // i = Math.floor(Math.random() * assocaitesList.length);
              i++;
              isFound = false;
            }
          }
          //No other associates available
          else 
          {
            assocaitesList[i].outCount++;
            assocaitesList[i].lastOutBlock = currentBlock;
            console.log(assocaitesList[i].name + ' out times: ' + assocaitesList[i].outCount);
            schedule.push(assocaitesList[i].name);
            isFound = true;
          }
        }
        else
        {
          console.log(assocaitesList[i].name + ' is on break!.')
          // i = Math.floor(Math.random() * assocaitesList.length);
          i++;
          isFound = false;
        }
      }
      else
        {
          // i = Math.floor(Math.random() * assocaitesList.length);
          i++;
          isFound = false;
        }
    }
}
//Render schedule
function generateSchedule()
{
  schedule = [];
  //Reset out counts
  for(let associateIndex = 0; associateIndex < assocaites.length; associateIndex++)
  {
    assocaites[associateIndex].outCount = 0;
    assocaites[associateIndex].lastOutBlock = -1;
  }

  for(let block = 0; block < 33; block++)
  {
    pickAssociate(block, block - 1, assocaites);
  
    console.log(block + ' : ' + schedule[block]);
  }
}