//  Imported strings of Sudoku from Internet (You can make one for yourself)
const easy = [
  "---7--9-3----8------7-6---8--85----1----396-----4-75--7-46-------23-5----9-----42",
  "821754963659283174347961258978526431415839627263417589734692815182345796596178342",
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "-7-6--4-------4-2--2------7-----3--9---4851----82-1-7-1--84-9--2-6-------3-----58",
  "8736124959153374826624958317541763289792485163368291574157846932286539741439127658",
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];


// (Declared Global Variables)
var currentId; // (using for current Id)
var g;
var RowSums = 0;
var ColumnSums = 0;
var GridSums = 0;


// (Function triggering on window loading) 

window.onload = function () {
  alert("Welcome to Abhimanyu's Sudoku");
  id("thats-easy").addEventListener("click", starteasy);    // Difficulty : Easy
  id("thats-okay").addEventListener("click", startokay);    // Difficulty : Medium
  id("oops-hard").addEventListener("click", starthard);     // Difficulty : Hard
}


//  onclick function contains event that will occur the moment you click on any cell
const onClick = function () {
  let y = this.id;
  currentId = y;
  console.log(y) // (consoling id of particular cell Selected {no use} )

  clearSelection(); //(Clearing Css property of any other selected cell)

  id(y).classList.add("active"); //(Adding class active to active selected cell which is being clicked)

  // (logic of selecting rows and columns of the celected cell)
  for (let q = 0; q < 81;) {
    let r = y % 9;
    if (r == 0) { r = 9; }
    let e = q + r;
    id(e).classList.add("highlight", "deaf-blue");
    q = q + 9;
    for (let x = 1; x <= 81; x++) {
      for (i = 0; i < 9; i++) {
        let j = i + 1;
        if (y / 9 > i && y / 9 <= j && x / 9 > i && x / 9 <= j) {
          id(x).classList.add("highlight", "deaf-blue");
        }
      }
    }
  }

  // (function for selecting 3x3 grid)
  threebythree(y);

  //  (adding class to already filled functions)
  for (let b = 1; b <= 81; b++) {
    let v = id(b).classList.contains("deaf");
    if (v == true) {
      id(b).classList.remove("highlight", "active");
    }
  }
}


// (loop for bypassing individual cell id which is being clicked on)
for (let l = 1; l <= 81; l++) {
  id(l).onclick = onClick;
}


/********************/
// (Difficulty Level)
/********************/

// (calling easy Sudoku)
function starteasy() {
  clearprev();
  let board = easy[0];
  start(board);
}

// (calling Medium sudoku)
function startokay() {
  clearprev();
  let board = medium[0];
  start(board);
}

//  (Calling Hard Sudoku)
function starthard() {
  clearprev();
  let board = hard[0];
  start(board);
}


// (Filling Sudoku Grid with hard coded prefilled numbers)
function start(board) {
  clearWrong();
  for (let i = 0; i < 81; i++) {
    var z = board.charAt(i);
    if (z != "-") {
      let y = i + 1;
      id(y).value = z;
      id(y).classList.add("deaf");
      id(y).setAttribute("readonly", "true");
      clearSelection();
    }
    else {
      let y = i + 1;
      id(y).setAttribute("onkeyup", "checkDouble()")
    }
  }
}


//  (Checking for double Filled no)
function checkDouble() {
  clearallNo();
  clearWrong();
  checkRow();
  checkColumn();
  checkthreeBythree();
  checkforSame();
}


// (Limiting keyboard input from 1 to 9)
function isNumber(e) {
  var key = e.which || e.KeyCode;
  if (key > 48 && key <= 57) {
    return true;
  }
  else return false;
}


// (Validate Function)
/*
Validation is done by:-
    1. using Sum of Rows. == 45
    2. using Sum of Columns. == 45
    3. using Sum of 3x3 Grid. == 45
*/
id("validate").addEventListener("click", validation);
function validation() {
  SumOfColumns();
  SumOfRows();
  SumOfGrid();
  if (ColumnSums == 9 && RowSums == 9 && GridSums == 9) {
    console.log("Sudoku Completed")
    alert("You Have Completed!! :-) ")
  }
  else {
    alert("Something Went Wrong! Keep Trying :-( ")
  }
}


// (Helper Functions or Shortcut Functions)
function id(id) {
  return document.getElementById(id);
}
function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return document.querySelectorAll(selector);
}


// (changing CSS property of selected element's 3x3 Grid )
function threebythree(y) {
  for (let i = 1; i <= 81; i++) {
    let d = y % 9;
    let s = i % 9;
    if (d == 1 || d == 2 || d == 3) {
      if (s == 1 || s == 2 || s == 3) {
        if (y <= 21 && i <= 21) {
          id(i).classList.add("highlight");
        }
        else if (y > 21 && y <= 48 && i > 21 && i <= 48) {
          id(i).classList.add("highlight");
        }
        else if (y > 48 && y <= 75 && i > 48 && i <= 75) {
          id(i).classList.add("highlight");
        }
      }
    }
    if (d == 4 || d == 5 || d == 6) {
      if (s == 4 || s == 5 || s == 6) {
        if (y <= 24 && i <= 24) {
          id(i).classList.add("highlight");
        }
        else if (y > 24 && y <= 51 && i > 24 && i <= 51) {
          id(i).classList.add("highlight");
        }
        else if (y > 51 && y <= 78 && i > 51 && i <= 78) {
          id(i).classList.add("highlight");
        }
      }
    }
    if (d == 7 || d == 8 || d == 0) {
      if (s == 7 || s == 8 || s == 0) {
        if (y <= 27 && i <= 27) {
          id(i).classList.add("highlight");
        }
        else if (y > 27 && y <= 54 && i > 27 && i <= 54) {
          id(i).classList.add("highlight");
        }
        else if (y > 54 && y <= 81 && i > 54 && i <= 81) {
          id(i).classList.add("highlight");
        }
      }
    }
  }
}

// ( Function for checking if there are any double in any row)
function checkColumn() {
  for (let x = 1; x <= 81; x++) {
    for (let z = 1; z <= 81; z++) {
      if ((x % 9 == z % 9) && x != z) {
        if (id(x).value == id(z).value) {
          id(x).classList.add("wrong");
          id(z).classList.add("wrong");
        }
      }
    }
  }
}

// (Function for checking if there are any double in any Column)
function checkRow() {
  for (let x = 1; x <= 81; x++) {
    for (let z = 1; z <= 81; z++) {
      for (let i = 0; i < 9; i++) {
        let j = i + 1;
        if (x / 9 <= j && z / 9 <= j && x / 9 > i && z / 9 > i && x != z) {
          if (id(x).value == id(z).value) {
            id(x).classList.add("wrong");
            id(z).classList.add("wrong");
          }
        }
      }
    }
  }
}

// (Function for checking if there are any double in any 3x3 Grid)
function checkthreeBythree() {
  for (let x = 1; x <= 81; x++) {
    let y = x % 9;
    let z = x / 9;
    let i = currentId % 9;
    let j = currentId / 9;
    if ((id(x).value == id(currentId).value) && x != currentId) {
      if ((y == 1 || y == 2 || y == 3) && (i == 1 || i == 2 || i == 3)) {
        if (z > 0 && z <= 3 && j > 0 && j <= 3) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 3 && z <= 6 && j > 3 && j <= 6) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 6 && z <= 9 && j > 6 && j <= 9) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
      }

      if ((y == 4 || y == 5 || y == 6) && (i == 4 || i == 5 || i == 6)) {
        if (z > 0 && z <= 3 && j > 0 && j <= 3) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 3 && z <= 6 && j > 3 && j <= 6) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 6 && z <= 9 && j > 6 && j <= 9) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
      }

      if ((y == 7 || y == 8 || y == 0) && (i == 7 || i == 8 || i == 0)) {
        if (z > 0 && z <= 3 && j > 0 && j <= 3) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 3 && z <= 6 && j > 3 && j <= 6) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
        if (z > 6 && z <= 9 && j > 6 && j <= 9) {
          id(x).classList.add("wrong");
          id(currentId).classList.add("wrong");

        }
      }
    }
  }
}

//  (Function for Highlighting cells with same value throughout sudoku)
function checkforSame() {
  for (let x = 1; x <= 81; x++) {
    if (x != currentId && (id(x).value == id(currentId).value) && (id(currentId).value != "")) {
      id(x).classList.add("allNo");
      id(currentId).classList.add("allNo");
    }
  }
}

/************************************/
// (Clearing CSS Property Functions) 
/***********************************/

// (Clearing css of id with same value) 
function clearallNo() {
  for (x = 1; x <= 81; x++) {
    id(x).classList.remove("allNo");
  }
}

// (clearing previous board)
function clearprev() {
  for (let j = 1; j <= 81; j++) {
    id(j).removeAttribute("readonly");
    id(j).classList.remove("deaf", "highlight", "wrong", "allNo");
    id(j).value = "";
  }
}

// (logic for clearing css property of selected cell)
function clearSelection() {
  for (let j = 1; j <= 81; j++) {
    id(j).classList.remove("highlight", "active", "deaf-blue", "allNo");
  }
}

// (removing wrong class) 
function clearWrong() {
  for (let j = 1; j <= 81; j++) {
    id(j).classList.remove("wrong");
  }
}

// Column Sums Function (Sum of each Column Must be 45)
let c = 0;
function SumOfColumns() {
  ColumnSums = 0;
  for (j = 0; j < 9; j++) {
    c = 0;
    for (i = 1; i <= 81; i++) {
      if (i % 9 == j) {
        let k = id(i).value * 1;
        c = c + k;
        if (c == 45) {
          ColumnSums++;
        }
      }
    }
  }
}

// Rows Sums Function  (Sum of each Row Must be 45)
function SumOfRows() {
  RowSums = 0;
  for (j = 0; j < 9; j++) {
    c = 0;
    let l = j + 1;
    for (i = 1; i <= 81; i++) {
      if (i / 9 > j && i / 9 <= l) {
        let k = id(i).value * 1;
        c = c + k;
        if (c == 45) {
          RowSums++;
        }
      }
    }
  }
}

// Grid Sums Function  (Sum of each 3x3 Grid Must be 45)
function SumOfGrid() {
  GridSums = 0;
  for (let z = 0, p = 1; z < 3; z++) {
    let l = p
    for (let y = 0; y < 3; y++) {
      let count = 0;
      let i = l;
      for (let x = 0; x < 3; x++) {
        let j = i + 1
        let k = i + 2;
        let m = id(i).value * 1
        let n = id(j).value * 1
        let o = id(k).value * 1
        count = count + m + n + o;
        if (count == 45) {
          GridSums++;
        }
        i = i + 9;
      }
      l = l + 3;
    }
    p = p + 27;
  }
}