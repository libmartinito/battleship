const populateHeader = (parent, orientation) => {

  for(let i = 0; i < 10; i += 1) {
    const box = document.createElement("div");
    
    if (orientation === "col") {
      box.classList.add("col-box");
      box.textContent = String.fromCharCode(97 + i).toUpperCase();
    } else if (orientation === "row") {
      box.classList.add("row-box");
      box.textContent = i + 1;
    }
    parent.appendChild(box);
  }
}

const populateGrid = (parent) => {
  for(let i = 0; i < 10; i += 1) {
    for(let j = 0; j < 10; j += 1) {
      const box = document.createElement("div");
      box.classList.add("box");
      const xCoor = String.fromCharCode(97 + j).toUpperCase();
      const yCoor = (i + 1).toString();
      box.dataset.coordinate = xCoor + yCoor;
      parent.appendChild(box);
    }
  }
}

export{ populateHeader, populateGrid }

