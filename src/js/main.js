const generateUi = document.querySelector("#generate-ui");
const noOfFloors = document.querySelector("#no-of-floors");
const noOfLifts = document.querySelector("#no-of-lifts");
const ui = document.querySelector(".ui");

generateUi.addEventListener("click", () => {
    floorCount = Number(noOfFloors.value)
    liftCount = Number(noOfLifts.value)

    if(floorCount > 1 && liftCount >= 1){
        ui.innerHTML = "";
        createUI(liftCount, floorCount);
    }else{
        alert("Either floors count < 2 or lifts count < 1. Try again😊 ");
    }
})

const createUI = (liftCount,floorCount) => {
    
    const liftGroup = document.createElement('div')
    liftGroup.setAttribute('class', 'lift-group')
    
    //generate-lift
    for(let i = 1;i<=liftCount;i++){
    
    const lift = document.createElement('div')
    lift.setAttribute('class', 'lift')
    lift.setAttribute('data-floor', 1)
    lift.setAttribute('data-lift', i)
    liftGroup.appendChild(lift);   
    }
  //generatle-floor
    let floors = [];
    for(let i = 1;i<=floorCount;i++){
     const floorContainer = document.createElement('div')
     const floor = document.createElement('div');
     const buttonContainer = document.createElement('div')
     floorContainer.setAttribute('class', 'floor-container')
     buttonContainer.setAttribute('class', 'btn-box')
     floor.setAttribute('class','floor')
     floor.setAttribute('data-floor', i)
      
     const call = document.createElement('button')
     const floorNumber = document.createElement('h3')
     floorNumber.textContent = `F${i}`
     call.textContent = "Call"
     call.setAttribute('class','cal-btn')
     call.setAttribute('data-floor', i) 
     buttonContainer.appendChild(call)
     buttonContainer.appendChild(floorNumber)
      
     floorContainer.appendChild(buttonContainer)
     if(i === 1) floorContainer.append(liftGroup) 
     floor.appendChild(floorContainer)
      floors.unshift(floor)
    } 
    for(let i =0;i<floors.length;i++){
      ui.appendChild(floors[i])
    } 
}

let prevCall;
document.addEventListener('click', (e) => {
 const floorCall = Number(e.target.dataset.floor)
 if(prevCall !== floorCall && floorCall){
   prevCall = floorCall;
   initiate(floorCall)
 }
})

const initiate = (floorCall) => {
    const lifts = Array.from(document.querySelectorAll('.lift'));
    const nonBusyLift = lifts.filter(lift => !lift.classList.contains('busy'));
    let closebyLift;
    let distance = null;
  
    if (nonBusyLift.length) {
      for (i = 0; i < nonBusyLift.length; i++) {
        const floorDistance = Math.abs(floorCall - Number(nonBusyLift[i].dataset.floor));
        if (distance === null || floorDistance <= distance) {
          distance = floorDistance;
          closebyLift = nonBusyLift[i];
        }
      }
      liftProgress(floorCall, closebyLift, distance);
    } else {
      setTimeout(() => {
        initiate(floorCall);
      }, 1000);
    }
  };

  
const liftProgress = (floorCall,lift,distance) => {

  const liftOnFloor = Number(lift.dataset.floor);
  const { height } = document.querySelector(`[data-floor='${floorCall}']`).getBoundingClientRect();
  if(liftOnFloor !== floorCall) {
    lift.style.transform = `translateY(-${height * (floorCall - 1)}px)`;
    lift.style.transition = `all ${distance * 2}s ease-out`;
    lift.dataset.floor = floorCall;
    lift.classList.add("busy");
      
  setTimeout(() => {  
  lift.classList.add('door')
  },distance * 2500)

  lift.addEventListener('transitionend', (e) => {
    setTimeout(() => {
      lift.classList.remove("door");
      lift.classList.remove("busy");
  },6000)
  })
    
  }else {
    lift.classList.add("door");
    lift.classList.add("busy");
    setTimeout(() => {
      lift.classList.remove("door");
      lift.classList.remove("busy");
    }, 6000);
  }
}
